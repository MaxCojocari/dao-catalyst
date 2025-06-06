import {
  DaoTokenInfo,
  InputMetadata,
  MultisigMembers,
  VotingMethodSelector,
} from "..";
import { Header, Input, StepInfo } from "../common-styles";
import stepIcon from "../../assets/images/step2_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import { useState } from "react";
import { $daoInfo } from "../../store";
import { useUnit } from "effector-react";
import { DaoType } from "../../types";

export const DefineMembership = () => {
  const daoInfo = useUnit($daoInfo);
  const [selectedVotingMethod, setSelectedVotingMethod] = useState(
    daoInfo.type === DaoType.SimpleVote ? "token" : "multisig"
  );

  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Define Membership</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Choose how voting works in your DAO, such as by tokens or multisig.
          These governance settings can be updated later through a proposal and
          vote.
        </h2>
      </StepInfo>
      <Input>
        <InputMetadata inputName="Who can participate in governance?" />
        <VotingMethodSelector
          value={selectedVotingMethod}
          onChange={setSelectedVotingMethod}
        />
      </Input>
      {daoInfo.type === DaoType.SimpleVote && <DaoTokenInfo />}
      {daoInfo.type === DaoType.MultisigVote && <MultisigMembers />}
    </>
  );
};
