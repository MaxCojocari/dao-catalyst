import { getAddress, parseUnits } from "viem";
import { DaoSettings, DaoType, Link } from "../types";
import { predictIpfsUriFile, predictIpfsUriJson } from "./predict-ipfs-uri";
import { ZeroAddress } from "ethers";
import { DEFAULT_LOGOS } from "../constants";

export async function getCreateDaoParams(
  daoSettings: DaoSettings | null,
  logo: File | null
) {
  if (!daoSettings) return;

  const {
    type,
    name,
    summary,
    links,
    members,
    minimumDuration,
    token,
    quorum,
    minimumParticipation,
    proposalCreationMinVotingPower,
    salt,
  } = daoSettings;

  let logoUri = await predictIpfsUriFile(logo);
  if (!logoUri) {
    logoUri = DEFAULT_LOGOS[Math.floor(Math.random() * DEFAULT_LOGOS.length)];
  }
  console.log({ logoUri });

  let formattedLinks: Link[] = [];
  if (links.length >= 1 && links[0].url) {
    formattedLinks = links;
  }
  const daoMetadata = { name, summary, links: formattedLinks, logo: logoUri };
  const daoURI = await predictIpfsUriJson(daoMetadata);

  const formattedMembers = members[0]
    ? members.map((member) => getAddress(member?.trim() as `0x{string}`))
    : [];

  const { days, hours, minutes } = minimumDuration;
  const formattedDuration =
    Number(days) * 24 * 3600 + Number(hours) * 3600 + Number(minutes) * 60;

  if (true) {
  }

  const {
    isDeployed,
    tokenAddress,
    name: tokenName,
    symbol: tokenSymbol,
    initialDistribution,
  } = token;
  const recipients =
    isDeployed || type === DaoType.MultisigVote
      ? []
      : initialDistribution.map((recipient) =>
          getAddress(recipient.address?.trim() as `0x{string}`)
        );
  const amounts =
    isDeployed || type === DaoType.MultisigVote
      ? []
      : initialDistribution.map((recipient) =>
          parseUnits(recipient.tokens, 18)
        );
  const formattedDaoTokenParams = {
    isDeployed,
    tokenAddress: tokenAddress || ZeroAddress,
    name: tokenName,
    symbol: tokenSymbol,
    recipients,
    amounts,
  };

  return {
    params: {
      daoType: type,
      daoURI,
      members: formattedMembers,
      minimalDuration: formattedDuration,
      proposalCreationMinVotingPower: parseUnits(
        proposalCreationMinVotingPower.toString(),
        18
      ),
      daoToken: formattedDaoTokenParams,
      quorumFraction: quorum,
      minimumParticipationFraction: minimumParticipation,
      salt,
    },
    daoMetadata,
  };
}
