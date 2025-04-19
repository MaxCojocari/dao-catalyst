import { Header, Input, StepInfo } from "../common-styles";
import stepIcon from "../../assets/images/step1_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import { InputMetadata } from "../input-metadata";
import { Actions } from "..";

export const SetActions = () => {
  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Set Actions</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Define the actions to be automatically executed once the proposal
          meets the governance criteria and successfully passes a vote. For
          example, this may include transferring funds to a recipient if their
          proposal is approved.
        </h2>
      </StepInfo>
      <Input>
        <InputMetadata inputName='If option "Yes" wins...' />
        <Actions />
      </Input>
    </>
  );
};
