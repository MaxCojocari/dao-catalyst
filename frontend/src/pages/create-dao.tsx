import { useState } from "react";
import {
  DefineMembership,
  DeployDao,
  DescribeDao,
  ProgressBar,
  SelectGovernanceSettings,
} from "../components";
import styled from "styled-components";
import {
  BackButton,
  Box,
  DisabledButton,
  NextStepButton,
} from "../components/create-dao/common-styles";
import backIcon from "../assets/images/back-icon.svg";
import { ProgressBarPosition } from "../components/progress-bar";

export const CreateDaoPage = () => {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  console.log("step", step);

  return (
    <>
      <Container>
        <ProgressBar
          position={Math.min(step, 3) as ProgressBarPosition}
          finished={step < 4 ? false : true}
          firstStep="Describe DAO"
          secondStep="Define Membership"
          thirdStep="Select Governance Settings"
        />
        <Box>
          {step > 1 && (
            <BackButton
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            >
              <img src={backIcon} alt="back-icon" />
              <a>Back</a>
            </BackButton>
          )}
          {step === 1 && <DescribeDao />}
          {step === 2 && <DefineMembership />}
          {step === 3 && <SelectGovernanceSettings />}
          {step === 4 && (
            <DeployDao
              confirmed={confirmed}
              setConfirmed={setConfirmed}
              setStep={setStep}
            />
          )}
          {step >= 1 && step < 4 && (
            <NextStepButton
              onClick={() => {
                setStep((prev) => Math.min(4, prev + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next Step
            </NextStepButton>
          )}
          {step === 4 && confirmed && (
            <NextStepButton>Deploy DAO</NextStepButton>
          )}
          {step === 4 && !confirmed && (
            <DisabledButton>Deploy DAO</DisabledButton>
          )}
        </Box>
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;
