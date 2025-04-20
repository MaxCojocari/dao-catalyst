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
import { TEST_DAO_INFO as daoInfo, TOKENS } from "../../constants";
import { ActionType, DaoType } from "../../types";
import { DaoToken__factory } from "../../typechain-types";
import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { resolveTimezone } from "../../utils";
import { Fragment } from "react/jsx-runtime";
import { Line } from "./components/actions";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

function formatDateTime(date: dayjs.Dayjs, time: dayjs.Dayjs, tz: string) {
  return dayjs
    .tz(`${date.format("YYYY-MM-DD")}T${time.format("HH:mm")}`, tz)
    .format("YYYY/MM/DD hh:mm A [UTC]Z");
}

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
  if (daoInfo.token.tokenAddress) {
  }
  const abi = DaoToken__factory.abi;
  const { data } = daoInfo.token.tokenAddress
    ? useReadContracts({
        contracts: [
          {
            abi,
            functionName: "totalSupply",
            address: daoInfo.token.tokenAddress as `0x${string}`,
          },
          {
            abi,
            functionName: "symbol",
            address: daoInfo.token.tokenAddress as `0x${string}`,
          },
        ],
      })
    : {};

  const [totalSupply, symbol] = data?.map((d) => d.result) || [];
  const totalSupplyNumber = totalSupply
    ? Number(formatUnits(BigInt(totalSupply), 18))
    : 0;
  const requiredVotes = totalSupplyNumber
    ? Math.floor(
        (daoInfo.minimumParticipation.numerator /
          daoInfo.minimumParticipation.denominator) *
          totalSupplyNumber
      )
    : 0;
  const percent = (
    (daoInfo.minimumParticipation.numerator /
      daoInfo.minimumParticipation.denominator) *
    100
  )
    .toFixed(2)
    .replace(/\.00$/, "");
  const tz = resolveTimezone(proposal.voteStart.timezone);
  const voteStart = !proposal.voteStart.optionSelected
    ? dayjs()
    : dayjs.tz(
        `${proposal.voteStart.date.format(
          "YYYY-MM-DD"
        )}T${proposal.voteStart.time.format("HH:mm")}`,
        tz
      );
  const voteEnd = proposal.endDuration.optionSelected
    ? dayjs.tz(
        `${proposal.endDuration.date.format(
          "YYYY-MM-DD"
        )}T${proposal.endDuration.time.format("HH:mm")}`,
        tz
      )
    : voteStart
        .add(Number(proposal.endDuration.duration.days), "day")
        .add(Number(proposal.endDuration.duration.hours), "hour")
        .add(Number(proposal.endDuration.duration.minutes), "minute");
  const startLabel = !proposal.voteStart.optionSelected
    ? "Now"
    : formatDateTime(proposal.voteStart.date, proposal.voteStart.time, tz);

  const endRelative = voteEnd.from(voteStart, true);
  const endExact = voteEnd.format("YYYY/MM/DD hh:mm A [UTC]Z");

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
            {daoInfo.type === DaoType.SimpleVote && <p>1 token → 1 vote</p>}
            {daoInfo.type === DaoType.MultisigVote && <p>1 wallet → 1 vote</p>}
          </ContentRow>
          <ContentRow>
            <h3>Minimum support</h3>
            <p>
              &gt;{" "}
              {((daoInfo.quorum.numerator / daoInfo.quorum.denominator) * 100)
                .toFixed(2)
                .replace(/\.00$/, "")}
              %
            </p>
          </ContentRow>
          {daoInfo.type === DaoType.SimpleVote && (
            <ContentRow>
              <h3>Minimum participation</h3>
              {data && totalSupply && symbol && (
                <p>
                  &ge; {requiredVotes.toLocaleString()} of{" "}
                  {Number(totalSupplyNumber).toLocaleString()} {symbol} (
                  {percent}%)
                </p>
              )}
            </ContentRow>
          )}
          <ContentRow>
            <h3>Start</h3>
            <p>{startLabel}</p>
          </ContentRow>
          <ContentRow>
            <h3>End</h3>
            <p>In {endRelative}</p>
          </ContentRow>
          <ContentRow>
            <h3></h3>
            <p>{endExact}</p>
          </ContentRow>
        </Content>
      </InfoBox>

      <InfoBox>
        <InfoBoxHeader>
          <h2>Actions</h2>
          <EditButton step={3} setStep={setStep} />
        </InfoBoxHeader>
        <Content>
          {proposal.actions.length === 0 ? (
            <ContentRow>
              <p>No actions specified</p>
            </ContentRow>
          ) : (
            proposal.actions.map((action, index) => {
              const isTransfer = action.type === ActionType.TransferTokens;

              let transferLabel: string | undefined;
              if (isTransfer && action.inputs.length >= 3) {
                const [tokenAddr, recipient, rawAmount] = action.inputs;
                const token = TOKENS.find(
                  (t) => t.address.toLowerCase() === tokenAddr.toLowerCase()
                );
                if (token) {
                  transferLabel = `Transfer ${rawAmount} ${token.symbol} to ${recipient}`;
                }
              }

              return (
                <Fragment key={action.id}>
                  <ContentRow>
                    <h3>Action #{index + 1}</h3>
                    <p>
                      {isTransfer && transferLabel
                        ? transferLabel
                        : action.type}
                    </p>
                  </ContentRow>

                  {!isTransfer && (
                    <>
                      <ContentRow>
                        <h3>Target</h3>
                        <p>{action.target || "—"}</p>
                      </ContentRow>

                      <ContentRow>
                        <h3>Function</h3>
                        <p>{action.functionFragment || "—"}</p>
                      </ContentRow>

                      {action.inputs?.length > 0 && (
                        <ContentRow>
                          <h3>Arguments</h3>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                          >
                            {action.inputs.map((input, i) => (
                              <p key={i}>{input?.toString() || "—"}</p>
                            ))}
                          </div>
                        </ContentRow>
                      )}
                    </>
                  )}

                  {index < proposal.actions.length - 1 && <Line />}
                </Fragment>
              );
            })
          )}
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
