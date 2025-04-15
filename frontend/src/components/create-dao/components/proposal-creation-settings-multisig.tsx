import styled from "styled-components";
import { Description, RadioGroup, RadioHeader } from "./voting-method-selector";
import { GenericProps } from "../../../types";
import { ANY_WALLET, MULTISIG_MEMBERS } from "../../../constants";
import { Warning } from "../common-styles";
import warningIcon from "../../../assets/images/warning.svg";

export const ProposalCreationSettingsMultisig = ({
  value,
  onChange,
}: GenericProps) => {
  return (
    <>
      <Container>
        <Requirement>
          <RadioGroupMultisig>
            <div
              className={`radio-card ${
                value === MULTISIG_MEMBERS ? "active" : ""
              }`}
              onClick={() => onChange(MULTISIG_MEMBERS)}
            >
              <RadioHeader>
                <p className="title">Multisig members</p>
                <input
                  type="radio"
                  value={MULTISIG_MEMBERS}
                  checked={value === MULTISIG_MEMBERS}
                  onChange={() => onChange(MULTISIG_MEMBERS)}
                />
              </RadioHeader>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Description>
                  Only the multisig owners added in the previous step can create
                  proposals.
                </Description>
                <div style={{ width: "35px" }}></div>
              </div>
            </div>

            <div
              className={`radio-card ${value === ANY_WALLET ? "active" : ""}`}
              onClick={() => onChange(ANY_WALLET)}
            >
              <RadioHeader>
                <p className="title">Any wallet</p>
                <input
                  type="radio"
                  value={ANY_WALLET}
                  checked={value === ANY_WALLET}
                  onChange={() => onChange(ANY_WALLET)}
                />
              </RadioHeader>
              <Description>
                Any connected wallet can create proposals.
              </Description>
            </div>
          </RadioGroupMultisig>
        </Requirement>
      </Container>
      {value === ANY_WALLET && (
        <Warning>
          <img
            src={warningIcon}
            width="14px"
            style={{ marginRight: "8px", marginTop: "3px" }}
          />
          <p>
            With anyone being able to propose, there is a risk of proposal spam.
            Consider having a minimum token threshold.
          </p>
        </Warning>
      )}
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const RadioGroupMultisig = styled(RadioGroup)`
  flex-direction: row;

  .radio-card {
    flex: 1;
    justify-content: flex-start;
  }
`;

export const Requirement = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #555566;
  }
`;
