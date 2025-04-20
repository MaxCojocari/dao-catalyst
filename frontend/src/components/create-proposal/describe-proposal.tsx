import { useUnit } from "effector-react";
import { Header, Input, StepInfo } from "../common-styles";
import { InputMetadata } from "../input-metadata";
import stepIcon from "../../assets/images/step2_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import { $proposalInfo, updateProposalInfo } from "../../store";
import { Resources } from "..";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const DescribeProposal = () => {
  const proposalInfo = useUnit($proposalInfo);
  const { address } = useAccount();

  useEffect(() => {
    updateProposalInfo({ author: address });
  }, []);

  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Describe Proposal</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>Include the details voters need to make an informed decision.</h2>
      </StepInfo>
      <Input>
        <InputMetadata
          inputName="Title"
          inputDescription="Maximum of 128 characters"
        />
        <input
          type="text"
          placeholder="Give your proposal a title ..."
          onChange={(e) => updateProposalInfo({ title: e.target.value })}
          value={proposalInfo.title}
          maxLength={128}
        />
        <a className="input-description">{proposalInfo.title.length}/128</a>
      </Input>
      <Input>
        <InputMetadata
          inputName="Summary"
          inputDescription="Describe your proposal in a few sentences. This text will be shown in the proposal preview."
        />
        <textarea
          placeholder="Type your summary ..."
          onChange={(e) => updateProposalInfo({ summary: e.target.value })}
          value={proposalInfo.summary}
        ></textarea>
      </Input>
      <Resources
        inputName="Resources"
        inputDescription="Share external resources you consider relevant."
      />
    </>
  );
};
