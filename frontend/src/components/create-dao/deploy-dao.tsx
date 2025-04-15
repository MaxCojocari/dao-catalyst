import { Header, StepInfo } from "../common-styles";
import stepIcon from "../../assets/images/step1_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import styled from "styled-components";
import { TEST_DAO_INFO } from "../../constants";
import { DaoType } from "../../types";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import { $daoInfo } from "../../store";
import { useUnit } from "effector-react";

interface DeployDaoProps {
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

export const TokenVoting = ({ setStep }: { setStep: (v: any) => void }) => {
  const dao = useUnit($daoInfo);
  const amount = dao.token.isDeployed
    ? dao.token.totalSupply
    : dao.token.initialDistribution.reduce(
        (acc, recipient) => acc + Number(recipient.tokens),
        0
      );
  return (
    <>
      <InfoBox>
        <InfoBoxHeader>
          <h2>Voters</h2>
          <EditButton step={2} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Eligible voters</h3>
            <p>Token holders</p>
          </ContentRow>
          <ContentRow>
            <h3>Token</h3>
            <p>
              {dao.token.name} ({dao.token.symbol})
            </p>
          </ContentRow>
          <ContentRow>
            <h3>Supply</h3>
            <p>{amount}</p>
          </ContentRow>
          <ContentRow>
            <h3>Distribution</h3>
            <p>{dao.members.length} addresses</p>
          </ContentRow>
          <ContentRow>
            <h3>Proposal creation</h3>
            <p>
              Members with ≥{" "}
              {!dao.proposalCreationMinVotingPower
                ? 0
                : dao.proposalCreationMinVotingPower}{" "}
              {dao.token.symbol} voting power or balance
            </p>
          </ContentRow>
        </Content>
      </InfoBox>
      <InfoBox>
        <InfoBoxHeader>
          <h2>Voting parameters</h2>
          <EditButton step={3} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Support threshold</h3>
            <p>
              {"> "}
              {(dao.quorum.numerator / dao.quorum.denominator) * 100}%
            </p>
          </ContentRow>
          <ContentRow>
            <h3>Minimum participation</h3>
            <p>
              {"≥ "}
              {(dao.minimumParticipation.numerator /
                dao.minimumParticipation.denominator) *
                100}
              % ({"≥ "}
              {(dao.minimumParticipation.numerator /
                dao.minimumParticipation.denominator) *
                amount}{" "}
              {dao.token.symbol})
            </p>
          </ContentRow>
          <ContentRow>
            <h3>Minimum duration</h3>
            <p>
              {dao.minimumDuration.days} days {dao.minimumDuration.hours} hours{" "}
              {dao.minimumDuration.minutes} minutes
            </p>
          </ContentRow>
        </Content>
      </InfoBox>
    </>
  );
};

export const MultisigVoting = ({ setStep }: { setStep: (v: any) => void }) => {
  const dao = useUnit($daoInfo);
  return (
    <>
      <InfoBox>
        <InfoBoxHeader>
          <h2>Voters</h2>
          <EditButton step={2} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Eligible voters</h3>
            <p>Multisig members</p>
          </ContentRow>
          <ContentRow>
            <h3>Distribution</h3>
            <p>{dao.members.length} addresses</p>
          </ContentRow>
          <ContentRow>
            <h3>Proposal creation</h3>
            <p>Multisig members</p>
          </ContentRow>
        </Content>
      </InfoBox>
      <InfoBox>
        <InfoBoxHeader>
          <h2>Voting parameters</h2>
          <EditButton step={3} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Minimum approval</h3>
            <p>
              {dao.minimumParticipation.numerator} of{" "}
              {dao.minimumParticipation.denominator} addresses
            </p>
          </ContentRow>
          <ContentRow>
            <h3>Minimum duration</h3>
            <p>
              {dao.minimumDuration.days} days {dao.minimumDuration.hours} hours{" "}
              {dao.minimumDuration.minutes} minutes
            </p>
          </ContentRow>
        </Content>
      </InfoBox>
    </>
  );
};

export const DeployDao = ({
  confirmed,
  setConfirmed,
  setStep,
}: DeployDaoProps) => {
  const dao = useUnit($daoInfo);
  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Deploy your DAO</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Double-check that everything is correct before deploying your DAO.
          Most of these settings can be changed later with a vote.
        </h2>
      </StepInfo>
      <InfoBox>
        <InfoBoxHeader>
          <h2>DAO</h2>
          <EditButton step={1} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          <ContentRow>
            <h3>Logo</h3>
            <img src={TEST_DAO_INFO.logo} />
          </ContentRow>
          <ContentRow>
            <h3>Name</h3>
            <p>{dao.name}</p>
          </ContentRow>
          <ContentRow>
            <h3>Summary</h3>
            <p>{dao.summary}</p>
          </ContentRow>
          <ContentRow>
            <h3>Links</h3>
            <Links>
              {dao.links.length === 1 &&
              dao.links[0].label === "" &&
              dao.links[0].url === "" ? (
                <p>None</p>
              ) : (
                dao.links.map((link, index) => (
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
      {dao.type === DaoType.SimpleVote && <TokenVoting setStep={setStep} />}
      {dao.type === DaoType.MultisigVote && (
        <MultisigVoting setStep={setStep} />
      )}
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

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #292933;
  }

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #555566;
  }

  h3 {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #292933;
    margin-right: 0 !important;
  }
`;

export const InfoBoxHeader = styled.div`
  display: flex;
  flexdirection: row;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 12px;
`;

export const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;

  h3 {
    margin-right: 240px;
  }

  img {
    margin-top: 12px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Link = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  a {
    color: #6c63ff;
    text-decoration: none;
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.02em;
    cursor: pointer;
    display: inline-block;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 12px 28px;
  gap: 8px;

  width: fit-content;

  background: #ffffff;
  border: 1px solid rgba(102, 102, 255, 0.2);
  border-radius: 6px;

  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.02em;
  color: #6666ff;
`;

export const CheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  p {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #555566;
  }
`;
