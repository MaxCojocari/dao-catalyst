import { Fragment } from "react";
import styled from "styled-components";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { AddressInput } from "../..";
import plusSign from "../../../assets/images/plus-sign.svg";
import { $daoInfo, setInitialRecipients } from "../../../store";
import { useUnit } from "effector-react";

export const DistributionTable = () => {
  const daoInfo = useUnit($daoInfo);
  const wallets = daoInfo.token.initialDistribution;

  const totalTokens = daoInfo.token.initialDistribution.reduce(
    (sum, w) => sum + Number(w.tokens),
    0
  );

  const handleTokenChange = (id: number, tokens: string) => {
    setInitialRecipients(
      wallets.map((entry) => (entry.id === id ? { ...entry, tokens } : entry))
    );
  };

  const handleRemove = (id: number) => {
    setInitialRecipients(wallets.filter((entry) => entry.id !== id));
  };

  const handleAddWallet = () => {
    const newId = wallets.length ? wallets[wallets.length - 1].id + 1 : 1;
    setInitialRecipients([...wallets, { id: newId, address: "", tokens: "" }]);
  };

  const handleAddressChange = (id: number, newAddress: string) => {
    setInitialRecipients(
      wallets.map((entry) =>
        entry.id === id ? { ...entry, address: newAddress } : entry
      )
    );
  };

  return (
    <>
      <Table>
        <>
          <HeaderRow>Address</HeaderRow>
          <HeaderRow>Tokens</HeaderRow>
          <HeaderRow>Allocation</HeaderRow>
          <p></p>
        </>

        {wallets.map((entry) => {
          const allocation =
            totalTokens > 0
              ? ((Number(entry.tokens) / totalTokens) * 100).toFixed(0)
              : 0;
          return (
            <Fragment key={`wallet-entry-${entry.id}`}>
              <AddressInput
                address={entry.address ?? ""}
                onChange={(val) => handleAddressChange(entry.id, val)}
              />
              <Input
                type="number"
                step={100}
                value={entry.tokens}
                placeholder="0"
                onChange={(e) => handleTokenChange(entry.id, e.target.value)}
              />

              <Input
                type="text"
                value={`${allocation}%`}
                readOnly
                onChange={(e) => {
                  const input = e.target.value.replace("%", "").trim();
                  const percent = parseFloat(input);
                  if (isNaN(percent)) return;
                  if (percent > 100) return;
                  const newTokens = Math.round((percent / 100) * totalTokens);
                  setInitialRecipients(
                    wallets.map((w) =>
                      w.id === entry.id
                        ? { ...w, tokens: newTokens.toString() }
                        : w
                    )
                  );
                }}
                style={{
                  background: "#F6F6FB",
                  border: "1px solid #E6E6FF",
                  margin: "0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={deleteIcon}
                  alt="Delete"
                  onClick={() => handleRemove(entry.id)}
                  style={{ width: "20px" }}
                />
              </div>
            </Fragment>
          );
        })}
        <>
          <Total>{wallets.length} addresses</Total>
          <Total>{totalTokens ? totalTokens : "0"}</Total>
          <Total>100%</Total>
          <p></p>
        </>
      </Table>
      <AddButton onClick={handleAddWallet}>
        <img src={plusSign} width="10px" />
        Add wallet
      </AddButton>
    </>
  );
};

export const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 80px 10px;
  column-gap: 12px;
  row-gap: 12px;
  margin-top: 18px;
`;

export const HeaderRow = styled.a`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #555566;
`;

export const Line = styled.div`
  height: 1px;
  background: #e6e6ff;
`;

export const Total = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
  padding-left: 17px;
`;

export const WalletRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 8px;
  box-sizing: border-box;
  height: 50px;
  color: rgba(41, 41, 51, 0.9);
  flex: 1;

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

export const AddButton = styled.button`
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 17px 24px;
  margin-top: 12px;
  gap: 8px;

  height: 48px;
  width: fit-content;

  background: #ffffff;
  border: 1px solid rgba(102, 102, 255, 0.2);
  border-radius: 6px;

  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #6666ff;
`;
