import {
  BinarySelector,
  DistributionTable,
  InputMetadata,
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

export const DefineMembership = () => {
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
        <VotingMethodSelector />
      </Input>
      <Input>
        <br />
        <InputMetadata inputName="Does your community already have an ERC-20 token to govern your DAO?" />
        <BinarySelector />
      </Input>
      <Input>
        <br />
        <InputMetadata
          inputName="Mint your token"
          inputDescription="Define the token details and distribute tokens to a core team and DAO treasury."
          inputNameStyle={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "130%",
            letterSpacing: "-0.03em",
            color: "#292933",
          }}
        />
      </Input>
      <Input>
        <InputMetadata
          inputName="Name"
          inputDescription="The full name of the token. Example: SHIBA"
        />
        <input type="text" placeholder="Type name..." />
      </Input>
      <Input>
        <InputMetadata
          inputName="Symbol"
          inputDescription="The abbreviation of the token. Example: SHI"
        />
        <input type="text" placeholder="Type symbol..." />
      </Input>
      <Input>
        <InputMetadata
          inputName="Token distribution"
          inputDescription="Enter the wallet addresses where you'd like to send tokens."
        />
        <DistributionTable />
      </Input>
      <NextStepButton>Next Step</NextStepButton>
    </Container>
  );
};
