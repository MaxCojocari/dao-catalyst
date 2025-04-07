import {
  DaoTokenInfo,
  InputMetadata,
  MultisigMembers,
  VotingMethodSelector,
} from ".";
import {
  BackButton,
  Container,
  Header,
  Input,
  NextStepButton,
  StepInfo,
} from "./describe-dao";
import stepIcon from "../assets/images/step2_icon.svg";
import infoIcon from "../assets/images/info-icon.svg";
import backIcon from "../assets/images/back-icon.svg";
import { useState } from "react";

export const DefineMembership = () => {
  const [selectedVotingMethod, setSelectedVotingMethod] = useState("token");

  return (
    <Container>
      <BackButton>
        <img src={backIcon} alt="vector" />
        <a>Back</a>
      </BackButton>
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
      {selectedVotingMethod === "token" && <DaoTokenInfo />}
      {selectedVotingMethod === "multisig" && <MultisigMembers />}
      <NextStepButton>Next Step</NextStepButton>
    </Container>
  );
};
