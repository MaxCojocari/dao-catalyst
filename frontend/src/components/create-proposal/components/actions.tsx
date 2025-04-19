import styled from "styled-components";
import plusSign from "../../../assets/images/plus-sign.svg";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { AddButton } from "../../create-dao/components/distribution-table";
import {
  $proposalInfo,
  updateProposalAction,
  updateProposalInfo,
  updateSelectedActionType,
} from "../../../store";
import { useUnit } from "effector-react";
import { ActionType, ProposalAction, Token } from "../../../types";
import { AddressInput } from "../../address-input";
import { ActionsDropdown } from "./actions-dropdown";
import { Fragment, useEffect, useState } from "react";
import { TokensDropdown } from "../..";
import { useParams } from "react-router-dom";
import { TOKENS } from "../../../constants";
import { nanoid } from "nanoid";

const TransferAction = ({
  index,
  action,
}: {
  index: number;
  action: ProposalAction;
}) => {
  const { daoAddress } = useParams();
  const [recipient, setRecipient] = useState(action.inputs[1] || "");
  const [token, setToken] = useState<Token>(() => {
    if (action.inputs.length > 0) {
      return TOKENS.find(
        (token) =>
          token.address.toLowerCase() === action.inputs[0].toLowerCase()
      )!;
    }
    return TOKENS[0];
  });
  const [amount, setAmount] = useState(action.inputs[2]);

  useEffect(() => {
    if (recipient && token && amount) {
      updateProposalAction({
        index,
        updatedAction: {
          functionFragment: "transfer(address,address,uint256)",
          target: daoAddress,
          inputs: [token.address, recipient, amount],
        },
      });
    }
  }, [recipient, token, amount]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: "18px",
          marginBottom: "8px",
        }}
      >
        <p>Enter recipient address</p>
      </div>
      <AddressInput address={recipient} onChange={setRecipient} />
      <Row>
        <TokensDropdown
          selectedToken={token}
          setSelectedToken={setToken}
          style={{ flex: 1, margin: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: "12px",
              marginBottom: "8px",
            }}
          >
            <p>Enter amount</p>
          </div>
          <Input
            type="text"
            value={amount}
            placeholder="Enter amount..."
            onChange={(e) => setAmount(e.target.value)}
            style={{
              margin: 0,
              flex: 1,
            }}
          />
        </div>
      </Row>
    </>
  );
};

export const CustomAction = ({
  index,
  action,
}: {
  index: number;
  action: ProposalAction;
}) => {
  const [signature, setSignature] = useState(action.functionFragment);
  const [params, setParams] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>(action.inputs);
  const [target, setTarget] = useState(action.target);

  useEffect(() => {
    const match = signature.match(/^\w+\((.*)\)$/);

    if (match) {
      const paramTypes = match[1].split(",").map((p) => p.trim());
      setParams(paramTypes);
      if (values.length === 0) {
        setValues(Array(paramTypes.length).fill(""));
      }
    } else {
      setParams([]);
      setValues([]);
    }
  }, [signature]);

  useEffect(() => {
    updateProposalAction({
      index,
      updatedAction: {
        target,
        functionFragment: signature,
        inputs: values,
      },
    });
  }, [params, values, target, signature]);

  const handleValueChange = (idx: number, newVal: string) => {
    setValues((prev) => {
      const copy = [...prev];
      copy[idx] = newVal;
      return copy;
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: "18px",
          marginBottom: "8px",
        }}
      >
        <p>Enter target smart contract address</p>
      </div>

      <AddressInput address={target} onChange={setTarget} />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 18 }}>
        <p>Enter function signature</p>
        <Input
          type="text"
          value={signature}
          placeholder="e.g. transfer(address,uint256)"
          onChange={(e) => setSignature(e.target.value)}
        />
        {params.map((type, i) => {
          if (!type) return null;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 12,
              }}
            >
              <p>Enter {type} value</p>
              <Input
                type="text"
                value={values[i]}
                placeholder={`Type: ${type}`}
                onChange={(e) => handleValueChange(i, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export const Actions = () => {
  const proposalInfo = useUnit($proposalInfo);

  const addRow = () => {
    updateProposalInfo({
      actions: [
        ...proposalInfo.actions,
        {
          id: nanoid(),
          target: "",
          value: "0x0",
          type: ActionType.TransferTokens,
          functionFragment: "",
          inputs: [],
        },
      ],
    });
  };

  const handleDelete = (index: number) => {
    const updated = proposalInfo.actions.filter((_, i) => i !== index);
    updateProposalInfo({ actions: updated });
  };

  return (
    <Container>
      <Grid>
        {proposalInfo.actions.length > 0 && (
          <>
            {proposalInfo.actions.map((action, index) => (
              <Fragment key={action.id}>
                <Row
                  style={{
                    margin: "20px 0 16px 0",
                    justifyContent: "flex-start",
                  }}
                >
                  <h2>Action #{index + 1}</h2>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    onClick={() => handleDelete(index)}
                    style={{ width: "20px", cursor: "pointer" }}
                  />
                </Row>
                <ActionsDropdown
                  selectedOption={action.type}
                  setSelectedOption={(newType) =>
                    updateSelectedActionType({ index, type: newType })
                  }
                />
                {action.type === ActionType.TransferTokens && (
                  <TransferAction index={index} action={action} />
                )}
                {action.type === ActionType.Other && (
                  <CustomAction index={index} action={action} />
                )}
                {index < proposalInfo.actions.length - 1 && <Line />}
              </Fragment>
            ))}
          </>
        )}
      </Grid>
      <AddButton onClick={addRow} style={{ margin: "0" }}>
        <img src={plusSign} width="10px" />
        Add action
      </AddButton>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Grid = styled.div`
  p,
  input {
    flex: 1;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #555566;
  }

  h2 {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #292933;
  }
`;

export const Input = styled.input`
  margin: 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 8px;
  box-sizing: border-box;
  height: 50px;
  color: rgba(41, 41, 51, 0.9);

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  transition: border 0.2s ease;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;

  &::placeholder {
    color: rgba(143, 143, 178, 0.9);
  }

  &:focus {
    outline-color: rgba(102, 102, 255, 0.8);
  }
`;

export const Line = styled.hr`
  width: 100%;
  border: none;
  height: 0.5px;
  background-color: #e6e6ff;
  margin: 24px 0 22px 0;
`;
