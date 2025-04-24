import styled from "styled-components";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils";
import { blo } from "blo";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Member {
  address: string;
  votingPower: number;
  percentage: number;
}

interface MembersListExtendedProps {
  members: Member[];
  tokenSymbol: string;
}

export const MembersListExtended = ({
  members,
  tokenSymbol,
}: MembersListExtendedProps) => {
  const { address: connectedAddress } = useAccount();
  const displayMembers = members.slice(0, 3);

  return (
    <Container>
      <Header>
        <ColumnTitle>Member</ColumnTitle>
        <ColumnTitle>Voting power</ColumnTitle>
        <ColumnTitle>Delegations</ColumnTitle>
      </Header>

      {displayMembers.map((member, index) => (
        <MemberCard key={index}>
          <Left>
            <img
              alt={member.address}
              src={blo(member.address as `0x{string}`)}
              style={{
                width: "30px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Info>
              <Row>
                <Address>{shortenAddress(member.address)}</Address>
                {connectedAddress?.toLowerCase() ===
                  member.address.toLowerCase() && <YouBadge>You</YouBadge>}
              </Row>
            </Info>
          </Left>
          <VotingPower>
            {member.votingPower.toLocaleString()} {tokenSymbol}
            <Percentage>({member.percentage.toFixed(2)}%)</Percentage>
          </VotingPower>
          <Delegation>
            <CircleButton>
              <KeyboardArrowRightIcon width={10} sx={{ color: "#8F8FB2" }} />
            </CircleButton>
          </Delegation>
        </MemberCard>
      ))}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  background: #ffffff;
  padding: 21px 21px 0 21px;
  font-weight: 500;
  font-size: 14px;
  line-height: 48px;
  letter-spacing: -0.02em;
  color: #8f8fb2;
`;

export const ColumnTitle = styled.div``;

export const MemberCard = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  align-items: center;
  padding: 16px 21px;
  border-top: 1px solid #e6e6ff;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Address = styled.span`
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #292933;
`;

const YouBadge = styled.span`
  background: #e6e6ee;
  color: #292933;
  font-size: 13px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
`;

const VotingPower = styled.div`
  font-size: 14px;
  color: #666680;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const Percentage = styled.span`
  font-size: 13px;
  margin-left: 4px;
  color: #8f8fb2;
  letter-spacing: -0.03em;
  font-weight: 400;
`;

const Delegation = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CircleButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e6e6ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgb(235, 235, 242);
  }
`;
