import styled from "styled-components";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils";
import { blo } from "blo";

interface Member {
  address: string;
  votingPower: number;
  percentage: number;
}

interface MembersListProps {
  members: Member[];
  tokenSymbol?: string;
}

export const MembersList = ({ members, tokenSymbol }: MembersListProps) => {
  const { address: connectedAddress } = useAccount();
  const displayMembers = members.slice(0, 3);

  return (
    <ListContainer>
      {displayMembers?.map((member, index) => (
        <MemberCard key={index}>
          <Left>
            <img
              alt={member?.address}
              src={blo(member?.address as `0x{string}`)}
              style={{
                width: "30px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center",
                marginRight: "11px",
              }}
            />
            <Info>
              <Row>
                <Address>{shortenAddress(member?.address)}</Address>
                {connectedAddress?.toLowerCase() ===
                  member?.address.toLowerCase() && <YouBadge>You</YouBadge>}
              </Row>
              {tokenSymbol && (
                <Power>
                  {member?.votingPower.toLocaleString()} {tokenSymbol}
                  <Percentage>({member?.percentage.toFixed(2)}%)</Percentage>
                </Power>
              )}
            </Info>
          </Left>
        </MemberCard>
      ))}
    </ListContainer>
  );
};

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: -0.03em;
`;

export const MemberCard = styled.div`
  display: flex;
  padding: 21px;
  border: 1px solid #e6e6ff;
  border-top: none;
  background: white;
  align-items: center;

  &:first-child {
    border-top: 1px solid #e6e6ff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Address = styled.span`
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #292933;
`;

export const YouBadge = styled.span`
  background: #e6e6ee;
  color: #292933;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const Power = styled.div`
  font-size: 14px;
  color: #666680;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

export const Percentage = styled.span`
  font-size: 13px;
  margin-left: 4px;
  color: #8f8fb2;
  letter-spacing: -0.03em;
  font-weight: 400;
`;
