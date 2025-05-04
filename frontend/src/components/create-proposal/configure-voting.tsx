import { Error, Header, Input, StepInfo } from "../common-styles";
import stepIcon from "../../assets/images/step2_icon.svg";
import infoIcon from "../../assets/images/info-icon.svg";
import failureIcon from "../../assets/images/failure.svg";
import { InputMetadata } from "../input-metadata";
import { useState } from "react";
import {
  BinarySelector,
  DateTimePickerWithTimezone,
  VotingDurationPicker,
  VotingOptionsSelector,
} from "..";
import { useUnit } from "effector-react";
import {
  $proposalInfo,
  setEndDurationOption,
  setVoteStartOption,
} from "../../store";
import { DURATION, SPECIFIC_DATE_TIME } from "../../constants";
import dayjs from "dayjs";
import {
  isMinimumDurationRespected,
  isStartDateInFuture,
  isVoteEndAfterStart,
} from "../../utils";
import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import { Dao__factory } from "../../typechain-types";

function parseDuration(seconds: number) {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, seconds: remainingSeconds };
}

export const ConfigureVoting = () => {
  const proposalInfo = useUnit($proposalInfo);
  const [votingOption, setVotingOption] = useState<"simple" | "fractional">(
    "simple"
  );
  const { daoAddress } = useParams();
  const { data: minimalDuration } = useReadContract({
    abi: Dao__factory.abi,
    functionName: "minimalDuration",
    address: daoAddress as `0x${string}`,
  });
  const { days, hours, minutes } = parseDuration(Number(minimalDuration));

  return (
    <>
      <Header>
        <img src={stepIcon} alt="step-icon" />
        <h1>Configure Voting</h1>
      </Header>
      <StepInfo>
        <img src={infoIcon} style={{ width: "20px" }} />
        <h2>
          Define the options, voting start time, and deadline for your proposal.
        </h2>
      </StepInfo>
      <Input>
        <InputMetadata inputName="Options" />
        <VotingOptionsSelector
          value={votingOption}
          onChange={setVotingOption}
        />
      </Input>
      <Input>
        <br />
        <InputMetadata
          inputName="Start time"
          inputDescription='Choose when the proposal becomes active for voting. Selecting "now" makes it active immediately after publishing.'
        />
        <BinarySelector
          value={proposalInfo.voteStart.optionSelected}
          onChange={setVoteStartOption}
          headerText={["Now", "Specific date & time"]}
        />
        {proposalInfo.voteStart.optionSelected === SPECIFIC_DATE_TIME && (
          <>
            <DateTimePickerWithTimezone
              isStart={true}
              currentDate={dayjs(proposalInfo.voteStart.date)}
              currentTime={dayjs(proposalInfo.voteStart.time)}
              currentTz={proposalInfo.voteStart.timezone}
            />
            {!isStartDateInFuture(proposalInfo) && (
              <Error>
                <img
                  src={failureIcon}
                  width="15px"
                  style={{ marginRight: "5px", marginTop: "2px" }}
                />
                <p>Vote start date must be in future!</p>
              </Error>
            )}
          </>
        )}
      </Input>
      <Input>
        <br />
        <InputMetadata
          inputName="End date"
          inputDescription="Define how long the voting should last in days, or add an exact date and time for it to conclude."
        />
        <BinarySelector
          value={proposalInfo.endDuration.optionSelected}
          onChange={setEndDurationOption}
          headerText={["Duration", "Specific date & time"]}
        />
        {proposalInfo.endDuration.optionSelected === DURATION && (
          <VotingDurationPicker />
        )}
        {proposalInfo.endDuration.optionSelected === SPECIFIC_DATE_TIME && (
          <DateTimePickerWithTimezone
            isStart={false}
            currentDate={dayjs(proposalInfo.endDuration.date)}
            currentTime={dayjs(proposalInfo.endDuration.time)}
            currentTz={proposalInfo.endDuration.timezone}
          />
        )}

        {!isVoteEndAfterStart(proposalInfo) && (
          <Error>
            <img
              src={failureIcon}
              width="15px"
              style={{ marginRight: "5px", marginTop: "2px" }}
            />
            <p>Vote start must be before vote end!</p>
          </Error>
        )}

        {minimalDuration &&
          !isMinimumDurationRespected(
            proposalInfo,
            Number(minimalDuration)
          ) && (
            <Error>
              <img
                src={failureIcon}
                width="15px"
                style={{ marginRight: "5px", marginTop: "2px" }}
              />
              <p>
                The minimum duration of {days} days, {hours} hours, and{" "}
                {minutes} minutes is defined by DAO governance settings
              </p>
            </Error>
          )}

        <br />
      </Input>
    </>
  );
};
