import styled from "styled-components";
import { VotingTab } from "./voting";

export interface ToggleTabsProps {
  activeTab: string;
  setActiveTab: (v: any) => void;
}

const tabs = [VotingTab.Breakdown, VotingTab.Voters, VotingTab.Info];

export const ToggleTabs = ({ activeTab, setActiveTab }: ToggleTabsProps) => {
  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          isActive={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  padding: 4px;
  background: #f7f7fa;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: none;
  background: ${({ isActive }) => (isActive ? "#ffffff" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#6666FF" : "#3a3a3a")};
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100px;

  &:hover {
    background: #ffffff;
  }
`;
