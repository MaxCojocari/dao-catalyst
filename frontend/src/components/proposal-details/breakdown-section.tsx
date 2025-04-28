import styled from "styled-components";
import { DaoType } from "../../types";

interface BreakdownSectionProps {
  votes: Record<
    string,
    {
      amount: string;
      percentage: number;
    }
  >;
  tokenSymbol?: string;
  daoType: DaoType | undefined;
}

export const BreakdownSection = ({
  votes,
  tokenSymbol,
  daoType,
}: BreakdownSectionProps) => {
  const renderOption = (label: string, amount: string, percent: number) => (
    <VoteRow key={label}>
      <RowTop>
        {label && <Label>{label}</Label>}
        <Right>
          <Votes>{amount}</Votes>
          <Percentage>{percent.toFixed(2).replace(/\.00$/, "")}%</Percentage>
        </Right>
      </RowTop>
      <ProgressBar>
        <Filler width={percent} />
      </ProgressBar>
    </VoteRow>
  );

  if (daoType == DaoType.SimpleVote)
    return (
      <Container>
        {renderOption(
          "Yes",
          `${votes.yes.amount} ${tokenSymbol}`,
          votes.yes.percentage
        )}
        {renderOption(
          "No",
          `${votes.no.amount} ${tokenSymbol}`,
          votes.no.percentage
        )}
        {renderOption(
          "Abstain",
          `${votes.abstain.amount} ${tokenSymbol}`,
          votes.abstain.percentage
        )}
      </Container>
    );

  if (daoType === DaoType.MultisigVote)
    return (
      <Container>
        {renderOption(
          "",
          `${votes.confirmations.amount} confirmations`,
          votes.confirmations.percentage
        )}
      </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 12px 0 40px 0;
  width: 100%;
`;

const VoteRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.p`
  font-weight: 600;
  font-size: 15px;
  color: #6666ff;
  margin: 0;
`;

const Right = styled.div`
  display: flex;
  gap: 14px;
`;

const Votes = styled.p`
  font-size: 15px;
  color: #6b7280;
  margin: 0;
`;

const Percentage = styled.p`
  font-weight: 600;
  font-size: 15px;
  color: #6666ff;
  margin: 0;
`;

const ProgressBar = styled.div`
  height: 6px;
  width: 100%;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
`;

const Filler = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  background: #6666ff;
  height: 100%;
`;
