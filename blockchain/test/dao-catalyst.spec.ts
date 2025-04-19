import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import {
  Dao,
  DaoFactory,
  DaoMultisigVote,
  DaoMultisigVote__factory,
  DaoSimpleVote,
  DaoSimpleVote__factory,
  DaoToken,
  DaoToken__factory,
  ERC20__factory,
  IDao,
  MockFundToken,
  TargetContract,
} from '../typechain-types';
import { formatUnits, Interface, parseUnits, ZeroAddress } from 'ethers';
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS, ONE_MINUTE_SECONDS } from '../utils/timeUnits';
import { expect } from 'chai';
import { getCurrentTimestamp } from '../utils/getCurrentTimestamp';
import { DaoType, ProposalState, VoteType } from '../utils/types';
import { increaseTime } from '../utils/increaseTime';

describe('DaoCatalyst', () => {
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let john: SignerWithAddress;
  let oscar: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let daoFractionalVoteImpl: IDao;
  let daoSimpleVoteImpl: IDao;
  let daoMultisigVoteImpl: IDao;
  let daoToken: DaoToken;
  let daoFactory: DaoFactory;
  let fundToken: MockFundToken;
  let targetContract: TargetContract;

  it('setup contracts', async () => {
    [deployer, alice, bob, john, oscar, ...accounts] = await ethers.getSigners();

    daoFractionalVoteImpl = await ethers.deployContract('DaoFractionalVote');
    daoSimpleVoteImpl = await ethers.deployContract('DaoSimpleVote');
    daoMultisigVoteImpl = await ethers.deployContract('DaoMultisigVote');

    daoFactory = await ethers.deployContract('DaoFactory', [
      daoSimpleVoteImpl,
      daoFractionalVoteImpl,
      daoMultisigVoteImpl,
    ]);

    fundToken = await ethers.deployContract('MockFundToken', [
      'Fund Token',
      'FTKN',
      parseUnits('1000000'),
    ]);
    targetContract = await ethers.deployContract('TargetContract');
  });

  describe('Simple token voting', () => {
    let daoSettings: DaoFactory.DaoSettingsStruct;
    let dao: DaoSimpleVote;
    let proposalSettings: any;

    beforeEach(async () => {
      daoSettings = {
        daoType: DaoType.SimpleVote,
        daoURI: 'https://ipfs.io/ipfs/QmdNz8ZNmUknqrfnBmfvU63NnU9FBSBrZwe5LcpDkwEaTb',
        members: [],
        minimalDuration: ONE_HOUR_SECONDS,
        proposalCreationMinVotingPower: parseUnits('0.1'),
        daoToken: {
          isDeployed: false,
          tokenAddress: ZeroAddress,
          name: 'Dao Token',
          symbol: 'DTKN',
          recipients: [alice, bob, john],
          amounts: [parseUnits('1000'), parseUnits('500'), parseUnits('200')],
        },
        quorumFraction: { numerator: 60, denominator: 100 },
        minimumParticipationFraction: { numerator: 30, denominator: 100 },
        salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
      };

      proposalSettings = {
        actions: [
          {
            target: await fundToken.getAddress(),
            value: 0n,
            calldatas: fundToken.interface.encodeFunctionData('transfer', [
              alice.address,
              parseUnits('3.14'),
            ]),
          },
          {
            target: await targetContract.getAddress(),
            value: 0n,
            calldatas: targetContract.interface.encodeFunctionData('setValue', [133]),
          },
        ],
        descriptionURI:
          'https://ipfs.io/ipfs/Qma1iJmxhgLpL4wLdNXpmbJo3NquH38wb35k4j4ARojkSJ/description.json',
        voteStart: (await getCurrentTimestamp()) + ONE_MINUTE_SECONDS,
        voteDuration: ONE_DAY_SECONDS,
      };
    });

    it('should deploy dao contract with correct params', async () => {
      const tx = await daoFactory.createDao(daoSettings);
      await tx.wait();

      const filter = daoFactory.filters.DaoCreated();
      const events = await daoFactory.queryFilter(filter);
      const eventArgs = events[0].args;

      dao = DaoSimpleVote__factory.connect(eventArgs[0], deployer);

      const [
        minimalDuration_,
        daoURI_,
        initialized_,
        quorumFraction_,
        minimumParticipationFraction_,
      ] = await Promise.all([
        dao.minimalDuration(),
        dao.daoURI(),
        dao.initialized(),
        dao.quorumFraction(),
        dao.minimumParticipationFraction(),
      ]);
      expect(minimalDuration_).to.equal(daoSettings.minimalDuration);
      expect(daoURI_).to.equal(daoSettings.daoURI);
      expect(initialized_).to.equal(true);
      expect(quorumFraction_).to.eql([60n, 100n]);
      expect(minimumParticipationFraction_).to.eql([30n, 100n]);
    });

    it('should deploy dao token', async () => {
      const filter = daoFactory.filters.DaoCreated();
      const events = await daoFactory.queryFilter(filter);
      const eventArgs = events[0].args;

      daoToken = DaoToken__factory.connect(eventArgs[4], deployer);

      expect(await daoToken.name()).to.equal(daoSettings.daoToken.name);
      expect(await daoToken.symbol()).to.equal(daoSettings.daoToken.symbol);
    });

    it('should correctly distribute initial amount of tokens to members', async () => {
      expect(await daoToken.balanceOf(alice)).to.equal(parseUnits('1000'));
      expect(await daoToken.balanceOf(bob)).to.equal(parseUnits('500'));
      expect(await daoToken.balanceOf(john)).to.equal(parseUnits('200'));
    });

    it('should not allow creating proposal to invalid members', async () => {
      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      await expect(dao.connect(oscar).propose(actions, descriptionURI, voteStart, voteDuration))
        .to.be.revertedWithCustomError(dao, 'InvalidProposer')
        .withArgs(oscar.address);
    });

    it('should allow creating proposals', async () => {
      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      const tx = await dao.connect(alice).propose(actions, descriptionURI, voteStart, voteDuration);
      await tx.wait();

      const proposal = await dao.proposals(0);
      expect(proposal.proposer).to.equal(alice);
      expect(proposal.snapshot).to.equal((await tx.getBlock())?.timestamp);
      expect(proposal.voteStart).to.equal(voteStart);
      expect(proposal.voteEnd).to.equal(voteStart + voteDuration);
      expect(await dao.state(0)).to.equal(ProposalState.Pending);
    });

    it('should be allowed voting only when voting period starts', async () => {
      const proposalId = 0n;
      await expect(dao.connect(bob).castVote(proposalId, VoteType.For))
        .to.be.revertedWithCustomError(dao, 'VotingNotActive')
        .withArgs(proposalId);
    });

    it('should allow voting', async () => {
      const proposalId = 0n;

      await increaseTime(ONE_MINUTE_SECONDS);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Active);

      expect(await dao.connect(bob).castVote(proposalId, VoteType.Against)).to.not.be.reverted;
    });

    it('should not allow voting to entities who already voted', async () => {
      const proposalId = 0n;
      await expect(dao.connect(bob).castVote(proposalId, VoteType.For))
        .to.be.revertedWithCustomError(dao, 'AlreadyCastVote')
        .withArgs(await bob.getAddress());
    });

    it('should count voting power only at the timestamp when proposal was created', async () => {
      await daoToken.connect(bob).delegate(bob);
      await daoToken.connect(john).delegate(alice);

      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      await dao.connect(alice).propose(actions, descriptionURI, voteStart, voteDuration);
      expect(await dao.proposalCounter()).to.equal(2);

      const proposalId = 1n;
      const proposalSnapshot = await dao.proposalSnapshot(proposalId);

      // john forgot to delegate his voting power in advance
      await daoToken.connect(john).delegate(john);

      await increaseTime(ONE_MINUTE_SECONDS);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Active);

      // bob casts his vote
      await dao.connect(bob).castVote(proposalId, VoteType.For);

      // alice waits and also casts her vote
      await increaseTime(ONE_DAY_SECONDS / 2n);
      await dao.connect(alice).castVote(proposalId, VoteType.For);

      // john casts his vote as well
      await increaseTime(ONE_MINUTE_SECONDS);
      await dao.connect(john).castVote(proposalId, VoteType.Against);

      const votes = await dao.proposalVotes(proposalId);
      const expectedVotesFor =
        (await daoToken.getPastVotes(alice, proposalSnapshot)) + // because john delegated voting power to alice
        (await daoToken.getPastVotes(bob, proposalSnapshot)); // because bob managed to delegate voting power to himself
      const expectedVotesAgainst = 0n; // because john delegated his voting power after the proposal was created
      const expectedVotesAbstain = 0n; // nobody voted for this option

      expect(votes.forVotes).to.equal(expectedVotesFor);
      expect(votes.againstVotes).to.equal(expectedVotesAgainst);
      expect(votes.abstainVotes).to.equal(expectedVotesAbstain);
    });

    it('should transition the proposal to successful state after meeting approval criteria', async () => {
      const proposalId = 1n;
      await increaseTime(ONE_DAY_SECONDS);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Succeeded);
    });

    it('should allow execution of successful proposal', async () => {
      await fundToken.transfer(dao, parseUnits('3.14'));

      const proposalId = 1n;
      const tx = await dao.execute(proposalId);
      await tx.wait();

      const transferFilter = fundToken.filters.Transfer();
      const transferEvents = await fundToken.queryFilter(transferFilter);
      const transferEventArgs = transferEvents[transferEvents.length - 1].args;

      expect(transferEventArgs[0]).to.equal(dao);
      expect(transferEventArgs[1]).to.equal(alice);
      expect(transferEventArgs[2]).to.equal(parseUnits('3.14'));

      const valueChangedFilter = targetContract.filters.ValueChanged();
      const valueChangedEvents = await targetContract.queryFilter(valueChangedFilter);
      const valueChangedEventArgs = valueChangedEvents[valueChangedEvents.length - 1].args;

      expect(valueChangedEventArgs[0]).to.equal(133);
    });

    it('should transition the proposal to defeated state if it fails to meet approval criteria', async () => {
      await daoToken.connect(john).transfer(oscar, parseUnits('200'));
      await daoToken.connect(oscar).delegate(oscar);
      await daoToken.connect(bob).delegate(bob);
      await daoToken.connect(alice).delegate(john);

      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      await dao.connect(bob).propose(actions, descriptionURI, voteStart, voteDuration);
      expect(await dao.proposalCounter()).to.equal(3);

      await increaseTime(ONE_MINUTE_SECONDS);

      const proposalId = 2n;
      const snapshot = await dao.proposalSnapshot(proposalId);
      expect(await daoToken.getPastVotes(alice, snapshot)).to.equal(0);
      expect(await daoToken.getPastVotes(bob, snapshot)).to.equal(parseUnits('500'));
      expect(await daoToken.getPastVotes(john, snapshot)).to.equal(parseUnits('1000'));
      expect(await daoToken.getPastVotes(oscar, snapshot)).to.equal(parseUnits('200'));

      // oscar casts his vote
      await dao.connect(oscar).castVote(proposalId, VoteType.For);

      await increaseTime(ONE_DAY_SECONDS);

      // minimum participation token percentage not reached
      expect(await dao.state(proposalId)).to.equal(ProposalState.Defeated);
    });

    it('should allow to cancel proposal when active', async () => {
      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      await dao.connect(oscar).propose(actions, descriptionURI, voteStart, voteDuration);
      expect(await dao.proposalCounter()).to.equal(4);

      await increaseTime(ONE_MINUTE_SECONDS / 2n);

      const proposalId = 3n;
      await dao.connect(oscar).cancel(proposalId);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Canceled);
    });
  });

  describe('Multisig voting', () => {
    let daoSettings: DaoFactory.DaoSettingsStruct;
    let dao: DaoMultisigVote;
    let proposalSettings: any;
    const MEMBER_ROLE = '0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636';

    beforeEach(async () => {
      daoSettings = {
        daoType: DaoType.MultisigVote,
        daoURI: 'https://ipfs.io/ipfs/Qme4S56yfN8xjV2hd92pKv3mxSVzBfac9MisAVxoH33MQQ',
        members: [alice, bob, john],
        minimalDuration: ONE_DAY_SECONDS,
        proposalCreationMinVotingPower: parseUnits('0.1'),
        daoToken: {
          isDeployed: false,
          tokenAddress: ZeroAddress,
          name: '',
          symbol: '',
          recipients: [],
          amounts: [],
        },
        quorumFraction: { numerator: 2, denominator: 3 },
        minimumParticipationFraction: { numerator: 2, denominator: 3 },
        salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
      };

      proposalSettings = {
        actions: [
          {
            target: await fundToken.getAddress(),
            value: 0n,
            calldatas: fundToken.interface.encodeFunctionData('transfer', [
              bob.address,
              parseUnits('100'),
            ]),
          },
        ],
        descriptionURI:
          'https://ipfs.io/ipfs/Ama1iJmxhgLpL4wLdNXpmbJo3NquH38wb35k4j4ARojkSJ/description.json',
        voteStart: (await getCurrentTimestamp()) + ONE_MINUTE_SECONDS,
        voteDuration: 3n * ONE_DAY_SECONDS,
      };
    });

    it('should deploy dao contract with correct params', async () => {
      const tx = await daoFactory.createDao(daoSettings);
      await tx.wait();

      const filter = daoFactory.filters.DaoCreated();
      const events = await daoFactory.queryFilter(filter);
      const eventArgs = events[1].args;

      dao = DaoMultisigVote__factory.connect(eventArgs[0], deployer);

      const [
        minimalDuration_,
        daoURI_,
        initialized_,
        quorumFraction_,
        minimumParticipationFraction_,
      ] = await Promise.all([
        dao.minimalDuration(),
        dao.daoURI(),
        dao.initialized(),
        dao.quorumFraction(),
        dao.minimumParticipationFraction(),
      ]);
      expect(minimalDuration_).to.equal(daoSettings.minimalDuration);
      expect(daoURI_).to.equal(daoSettings.daoURI);
      expect(initialized_).to.equal(true);
      expect(quorumFraction_).to.eql([2n, 3n]);
      expect(minimumParticipationFraction_).to.eql([2n, 3n]);

      expect(await dao.hasRole(MEMBER_ROLE, alice)).to.be.true;
      expect(await dao.hasRole(MEMBER_ROLE, bob)).to.be.true;
      expect(await dao.hasRole(MEMBER_ROLE, john)).to.be.true;
    });

    it('should not allow creating proposal to invalid members', async () => {
      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      await expect(dao.connect(oscar).propose(actions, descriptionURI, voteStart, voteDuration))
        .to.be.revertedWithCustomError(dao, 'InvalidProposer')
        .withArgs(oscar.address);
    });

    it('should allow creating proposals', async () => {
      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      const tx = await dao.connect(bob).propose(actions, descriptionURI, voteStart, voteDuration);
      await tx.wait();

      expect(await dao.proposalCounter()).to.equal(1);

      const proposalId = 0n;
      const proposal = await dao.proposals(proposalId);
      expect(proposal.proposer).to.equal(bob);
      expect(proposal.snapshot).to.equal((await tx.getBlock())?.timestamp);
      expect(proposal.voteStart).to.equal(voteStart);
      expect(proposal.voteEnd).to.equal(voteStart + voteDuration);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Pending);
    });

    it('should allow voting', async () => {
      const proposalId = 0n;

      await increaseTime(ONE_MINUTE_SECONDS);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Active);

      expect(await dao.connect(bob).castVoteEqualWeight(proposalId)).to.not.be.reverted;
      expect(await dao.confirmations(proposalId)).to.equal(1);
    });

    it('should not accept non-members to vote', async () => {
      const proposalId = 0n;

      await expect(dao.connect(oscar).castVoteEqualWeight(proposalId))
        .to.be.revertedWithCustomError(dao, 'AccessControlUnauthorizedAccount')
        .withArgs(oscar.address, MEMBER_ROLE);
    });

    it('should not allow voting to entities who already voted', async () => {
      const proposalId = 0n;

      await expect(dao.connect(bob).castVoteEqualWeight(proposalId))
        .to.be.revertedWithCustomError(dao, 'AlreadyCastVote')
        .withArgs(await bob.getAddress());
    });

    it('should transition the proposal to successful state after meeting approval criteria', async () => {
      const proposalId = 0n;

      await dao.connect(alice).castVoteEqualWeight(proposalId);
      expect(await dao.confirmations(proposalId)).to.equal(2);

      await increaseTime(3n * ONE_DAY_SECONDS);
      expect(await dao.state(proposalId)).to.equal(ProposalState.Succeeded);
    });

    it('should transition the proposal to defeated state if it fails to meet approval criteria', async () => {
      const { actions, descriptionURI, voteStart, voteDuration } = proposalSettings;
      await dao.connect(bob).propose(actions, descriptionURI, voteStart, voteDuration);
      expect(await dao.proposalCounter()).to.equal(2);

      await increaseTime(ONE_MINUTE_SECONDS);

      const proposalId = 1n;

      await dao.connect(john).castVoteEqualWeight(proposalId);
      expect(await dao.confirmations(proposalId)).to.equal(1);

      await increaseTime(4n * ONE_DAY_SECONDS);

      // not enough confirmations
      expect(await dao.state(proposalId)).to.equal(ProposalState.Defeated);
    });
  });
});
