import {
  DefineMembership,
  DescribeDao,
  ProgressBar,
  SelectGovernanceSettings,
} from "../components";
import styled from "styled-components";

export const CreateDaoPage = () => {
  return (
    <>
      <Container>
        <ProgressBar
          position={3}
          finished={false}
          firstStep="Describe DAO"
          secondStep="Define Membership"
          thirdStep="Select Governance Settings"
        />
        {/* <DescribeDao /> */}
        {/* <DefineMembership /> */}
        <SelectGovernanceSettings />
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
