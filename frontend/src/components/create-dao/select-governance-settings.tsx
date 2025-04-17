import {
  BinarySelector,
  DurationPicker,
  InputMetadata,
  MinimumParticipation,
  MinimumParticipationMultisig,
  ProposalCreationSettings,
  ProposalCreationSettingsMultisig,
  SupportThreshold,
} from "..";
import stepIcon from "../../assets/images/step1_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import { Header, Input, StepInfo } from "../common-styles";
import { useState } from "react";
import { MULTISIG_MEMBERS, TOKEN_HOLDERS } from "../../constants";
import { DaoType } from "../../types";
import { $daoInfo, setEarlyExecution } from "../../store";
import { useUnit } from "effector-react";

const GovernanceSettingsTokenMembership = () => {
  const daoInfo = useUnit($daoInfo);
  const [proposalCreationSettings, setProposalCreationSettings] =
    useState(TOKEN_HOLDERS);

  return (
    <>
      <Input>
        <InputMetadata
          inputName="Support threshold"
          inputDescription={`To pass a proposal, the percentage of "Yes" votes must exceed this value, based on the total number of tokens that participated in the vote.`}
        />
        <SupportThreshold />
      </Input>
      <Input>
        <InputMetadata
          inputName="Minimum participation"
          inputDescription={`For a proposal to be approved, at least this percentage of the total token supply must take part in the vote.`}
        />
        <MinimumParticipation />
      </Input>
      <Input>
        <InputMetadata
          inputName="Minimum duration"
          inputDescription={`The shortest period of time a proposal is open for voting. Proposals can be created with a longer duration, but not shorter. Set this to a duration that is long enough for your members to have sufficient time to vote. It's recommended to set this to at least 1 day.`}
        />
        <DurationPicker />
      </Input>
      <Input>
        <InputMetadata
          inputName="Early execution"
          inputDescription="Enables a proposal to be carried out before the voting period ends, as long as it has already reached the required support and participation levels, and additional votes can no longer alter the result."
        />
        <BinarySelector
          value={daoInfo.earlyExecution}
          onChange={setEarlyExecution}
          headerText={["Yes", "No"]}
        />
      </Input>
      <Input>
        <InputMetadata
          inputName="Proposal creation"
          inputDescription="Specify who is permitted to create proposals and what the minimum requirement is."
        />
        <ProposalCreationSettings
          value={proposalCreationSettings}
          onChange={setProposalCreationSettings}
        />
      </Input>
    </>
  );
};

const GovernanceSettingsMultisigMembership = () => {
  const [proposalCreationSettings, setProposalCreationSettings] =
    useState(MULTISIG_MEMBERS);

  return (
    <>
      <Input>
        <InputMetadata
          inputName="Minimum approval"
          inputDescription={`Minimum approval is the amount of addresses in the authorized list that must approve a proposal for it to pass.`}
        />
        <MinimumParticipationMultisig />
      </Input>
      <Input>
        <InputMetadata
          inputName="Minimum duration"
          inputDescription={`The shortest period of time a proposal is open for voting. Proposals can be created with a longer duration, but not shorter. Set this to a duration that is long enough for your members to have sufficient time to vote. It's recommended to set this to at least 1 day.`}
        />
        <DurationPicker />
      </Input>
      <Input>
        <InputMetadata
          inputName="Proposal creation"
          inputDescription="Specify who is permitted to create proposals and what the minimum requirement is."
        />
        <ProposalCreationSettingsMultisig
          value={proposalCreationSettings}
          onChange={setProposalCreationSettings}
        />
      </Input>
    </>
  );
};

export const SelectGovernanceSettings = () => {
  const daoInfo = useUnit($daoInfo);
  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Select Governance Settings</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Set the parameters that determine how your DAO operates. What's the
          minimum participation required? What level of support is necessary?
          How long should proposals remain open for voting?
        </h2>
      </StepInfo>
      {daoInfo.type === DaoType.SimpleVote && (
        <GovernanceSettingsTokenMembership />
      )}
      {daoInfo.type === DaoType.MultisigVote && (
        <GovernanceSettingsMultisigMembership />
      )}
    </>
  );
};
