import stepIcon from "../../assets/images/step1_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import { LogoUploader } from "./components/logo-uploader";
import { Links } from "./components/links";
import { InputMetadata } from "../input-metadata";
import { Header, StepInfo, Input } from "../common-styles";
import { $daoInfo, updateDaoInfo } from "../../store";
import { useUnit } from "effector-react";

export const DescribeDao = () => {
  const daoInfo = useUnit($daoInfo);

  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Describe your DAO</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Give it a name and brief description to guide new contributors. This
          info appears on the Explore page and can be updated by vote.
        </h2>
      </StepInfo>
      <Input>
        <InputMetadata
          inputName="Name"
          inputDescription="Maximum of 128 characters"
        />
        <input
          type="text"
          placeholder="Type your DAO's name ..."
          onChange={(e) => updateDaoInfo({ name: e.target.value })}
          value={daoInfo.name}
          maxLength={128}
        />
        <a className="input-description">{daoInfo.name.length}/128</a>
      </Input>
      <LogoUploader />
      <Input>
        <InputMetadata
          inputName="Description"
          inputDescription="Briefly explain the mission of your DAO. This will appear on the
            Explore page to help others discover you."
        />
        <textarea
          placeholder="Type your summary ..."
          onChange={(e) => updateDaoInfo({ summary: e.target.value })}
          value={daoInfo.summary}
        ></textarea>
      </Input>
      <Links
        inputName="Links"
        inputDescription="Links to your DAO's website, social media profiles, or other you consider relevant."
      />
    </>
  );
};
