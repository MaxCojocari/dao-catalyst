import styled from "styled-components";
import successIcon from "../../assets/images/success_progress.svg";
import pendingIcon from "../../assets/images/pending.svg";
import errorIcon from "../../assets/images/error-filled.svg";
import activeIcon from "../../assets/images/active-icon.svg";
import { StatusType } from "../../types";

const statusMap: Record<
  StatusType,
  { icon: string; color: string; defaultText: string }
> = {
  success: {
    icon: successIcon,
    color: "#1FBA66",
    defaultText: "Success",
  },
  pending: {
    icon: pendingIcon,
    color: "#FFD056",
    defaultText: "Pending",
  },
  error: {
    icon: errorIcon,
    color: "#FF9999",
    defaultText: "Error",
  },
  active: {
    icon: activeIcon,
    color: "#4CABFF",
    defaultText: "Active",
  },
};

export const StatusTag = ({
  type,
  text,
  style,
}: {
  type: StatusType;
  text?: string;
  style?: React.CSSProperties;
}) => {
  const { icon, color, defaultText } = statusMap[type];

  return (
    <Container style={style}>
      <img src={icon} width="16px" />
      <p style={{ color }}>{text || defaultText}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    letter-spacing: -0.02em;
    margin-right: 4px;
  }
`;
