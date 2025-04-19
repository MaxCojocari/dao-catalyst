import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import stepIcon from "../../assets/images/step1_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import { CheckBox, Header, StepInfo } from "../common-styles";
import { $proposalInfo } from "../../store";
import {
  Button,
  Content,
  ContentRow,
  InfoBox,
  InfoBoxHeader,
  Link,
  Links,
} from "../preview-styles";
import { useUnit } from "effector-react";

interface DeployProposalProps {
  confirmed: boolean;
  setConfirmed: (v: any) => void;
  setStep: (v: any) => void;
}

interface EditButtonProps {
  step: number;
  setStep: (v: any) => void;
}

export const EditButton = ({ step, setStep }: EditButtonProps) => {
  return <Button onClick={() => setStep(step)}>Edit</Button>;
};

export const DeployProposal = ({
  confirmed,
  setConfirmed,
  setStep,
}: DeployProposalProps) => {
  const proposal = useUnit($proposalInfo);
  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Review Proposal</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Double-check that all details are accurate before submitting for a
          vote. Once published, the proposal cannot be changed.
        </h2>
      </StepInfo>
      <InfoBox>
        <InfoBoxHeader>
          <h2>Proposal</h2>
          <EditButton step={1} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Title</h3>
            <p>{proposal.title}</p>
          </ContentRow>
          <ContentRow>
            <h3>Summary</h3>
            <p>{proposal.summary}</p>
          </ContentRow>
          <ContentRow>
            <h3>Links</h3>
            <Links>
              {proposal.resources.length === 1 &&
              proposal.resources[0].label === "" &&
              proposal.resources[0].url === "" ? (
                <p>None</p>
              ) : (
                proposal.resources.map((link, index) => (
                  <Link key={index}>
                    <p>{link.label}</p>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.url}
                    </a>
                  </Link>
                ))
              )}
            </Links>
          </ContentRow>
        </Content>
      </InfoBox>

      <InfoBox>
        <InfoBoxHeader>
          <h2>Voting parameters</h2>
          <EditButton step={2} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Options</h3>
            <p>Yes, no, or abstain</p>
          </ContentRow>
          <ContentRow>
            <h3>Strategy</h3>
            <p>1 token → 1 vote</p>
          </ContentRow>
          <ContentRow>
            <h3>Minimum support</h3>
            <p>&gt; 66%</p>
          </ContentRow>
          <ContentRow>
            <h3>Minimum participation (Quorum)</h3>
            <p>&ge; 1950 of 13k PIK (15%)</p>
          </ContentRow>
          <ContentRow>
            <h3>Start</h3>
            <p>Now</p>
          </ContentRow>
          <ContentRow>
            <h3>End</h3>
            <p>In 1 day</p>
          </ContentRow>
          <ContentRow>
            <h3></h3>
            <p>~2025/02/06 10:17 PM UTC+2</p>
          </ContentRow>
        </Content>
      </InfoBox>

      <CheckBox>
        {confirmed ? (
          <CheckBoxRoundedIcon
            sx={{ color: "#6c63ff", fontSize: 20, cursor: "pointer" }}
            onClick={() => setConfirmed(!confirmed)}
          />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon
            sx={{ color: "#E6E6FF", fontSize: 20, cursor: "pointer" }}
            onClick={() => setConfirmed(!confirmed)}
          />
        )}
        <p>I confirm these values are correct.</p>
      </CheckBox>
    </>
  );
};
