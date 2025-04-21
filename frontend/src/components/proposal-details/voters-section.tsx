import { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/images/search-icon.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { blo } from "blo";
import { shortenAddress } from "../../utils";

interface Voter {
  address: string;
  power: string;
  vote: "Yes" | "No" | "Abstain";
}

interface VotersSectionProps {
  voters: Voter[];
  tokenSymbol?: string;
}

export const VotersSection = ({ voters, tokenSymbol }: VotersSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleVoters = showAll ? voters : voters.slice(0, 3);
  const canToggle = voters.length > 3;

  return (
    <Container>
      <SearchBar>
        <img src={searchIcon} alt="search" width={16} />
        <input placeholder="Wallet, ENS, or email" />
      </SearchBar>

      <VoterList>
        {visibleVoters.map((voter, index) => (
          <VoterRow key={index}>
            <VoterInfo>
              <img
                alt={voter.address}
                src={blo(voter.address as `0x{string}`)}
                style={{
                  width: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <VoterData>
                <Address>{shortenAddress(voter.address)}</Address>
                <Power>
                  {voter.power} {tokenSymbol}
                </Power>
              </VoterData>
            </VoterInfo>
            <RightSide>
              <VoteTag type={voter.vote}>{voter.vote}</VoteTag>
              <KeyboardArrowRightIcon width={10} sx={{ color: "#8F8FB2" }} />
            </RightSide>
          </VoterRow>
        ))}
        {canToggle && (
          <LoadMore onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "Load More"}
          </LoadMore>
        )}
      </VoterList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  background: #fff;

  input {
    box-sizing: border-box;
    border: none;
    outline: none;
    width: 100%;

    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: rgba(41, 41, 51, 0.9);
  }

  input::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 48px;
    letter-spacing: -0.02em;
    color: #8f8fb2;
  }
`;

const VoterList = styled.div`
  display: flex;
  flex-direction: column;
`;

const VoterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-top: 1px solid #e6e6ff;
  cursor: pointer;

  &:first-child {
    border-top: none;
  }
`;

const VoterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const VoterData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Address = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
`;

const Power = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: #8f8fb2;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VoteTag = styled.span<{ type: "Yes" | "No" | "Abstain" }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  color: ${({ type }) =>
    type === "Yes" ? "#1a490f" : type === "No" ? "#7b1f1f" : "#524600"};
  background: ${({ type }) =>
    type === "Yes" ? "#e3f8d3" : type === "No" ? "#f9d0d0" : "#fff7cf"};
`;

const LoadMore = styled.div`
  cursor: pointer;
  padding-top: 6px;

  font-weight: 600;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #6666ff;
`;
