import styled from "styled-components";
import { shortenAddress } from "../../utils";
import startIcon from "../../assets/images/flag.svg";
import peopleIcon from "../../assets/images/people.svg";
import { DaoSummary, DaoType } from "../../types";

export const DaoOverview = ({ dao }: { dao: DaoSummary }) => {
  return (
    <Container>
      <Header>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>{dao?.name}</h1>
          <a
            href={`https://sepolia.arbiscan.io/address/${dao?.contractAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            {shortenAddress(dao?.contractAddress!)}
          </a>
          <h2>{dao?.summary}</h2>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "124px" }}
        >
          <img className="logo" src={dao?.logo} />
        </div>
      </Header>
      <Metadata>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Fragment>
            <img src={startIcon} width="16px" />
            <p>{dao?.creationDate}</p>
          </Fragment>
          <Fragment>
            <img src={peopleIcon} width="16px" />
            {dao?.daoType === DaoType.SimpleVote && <p>Token-based</p>}
            {dao?.daoType === DaoType.MultisigVote && <p>Wallet-based</p>}
          </Fragment>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {dao?.links?.map((link, id) => (
            <a href={link.url} key={id} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </Metadata>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: -10px;
  padding: 60px 150px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  h1 {
    font-weight: 800;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.03em;
    color: #292933;
  }

  h2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: -0.02em;
    color: #666680;
  }

  a {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #6666ff;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    margin: 14px 0;
  }

  .logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;

export const Metadata = styled(Header)`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  justify-content: space-between;
`;

export const Fragment = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 24px;
  gap: 8px;

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;
