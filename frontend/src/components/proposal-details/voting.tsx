import styled from "styled-components";
import { Container } from "../common-styles";
import { useState } from "react";
import { ToggleTabs } from "..";

export const Voting = () => {
  const [activeTab, setActiveTab] = useState("Info");

  return (
    <Container>
      <Row>
        <h1>Voting</h1>
        <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Row>
    </Container>
  );
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
