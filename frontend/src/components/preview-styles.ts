import styled from "styled-components";

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
