import { useState } from "react";
import styled from "styled-components";
import deleteIcon from "../assets/images/delete-icon.svg";
import { Input } from "./links";
import { useAccount } from "wagmi";
import { AddressInput } from ".";
import plusSign from "../assets/images/plus-sign.svg";

interface WalletEntry {
  id: number;
  address: string | undefined;
  tokens: number;
}

export const DistributionTable = () => {
  const { address } = useAccount();
  const [wallets, setWallets] = useState<WalletEntry[]>([
    { id: 1, address, tokens: 0 },
  ]);

  const totalTokens = wallets.reduce((sum, w) => sum + w.tokens, 0);

  const handleTokenChange = (id: number, delta: number) => {
    setWallets((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? { ...entry, tokens: Math.max(entry.tokens + delta, 0) }
          : entry
      )
    );
  };

  const handleRemove = (id: number) => {
    setWallets((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleAddWallet = () => {
    const newId = wallets.length ? wallets[wallets.length - 1].id + 1 : 1;
    setWallets([...wallets, { id: newId, address: "", tokens: 0 }]);
  };

  return (
    <>
      <Table>
        <>
          <HeaderRow>Address</HeaderRow>
          <HeaderRow>Tokens</HeaderRow>
          <HeaderRow>Allocation</HeaderRow>
          <a></a>
        </>

        {wallets.map((entry) => {
          const allocation =
            totalTokens > 0
              ? ((entry.tokens / totalTokens) * 100).toFixed(0)
              : 0;
          return (
            <>
              <AddressInput address={entry.address!} />
              <CustomInput
                type="number"
                step={100}
                value={entry.tokens}
                onChange={(e) =>
                  handleTokenChange(
                    entry.id,
                    parseInt(e.target.value) - entry.tokens
                  )
                }
              />

              <CustomInput
                type="text"
                value={`${allocation}%`}
                readOnly
                onChange={(e) => {
                  const input = e.target.value.replace("%", "").trim();
                  const percent = parseFloat(input);
                  if (isNaN(percent)) return;
                  if (percent > 100) return;
                  const newTokens = Math.round((percent / 100) * totalTokens);
                  setWallets((prev) =>
                    prev.map((w) =>
                      w.id === entry.id ? { ...w, tokens: newTokens } : w
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
            </>
          );
        })}
        <>
          <Total>{wallets.length} addresses</Total>
          <Total>{totalTokens ? totalTokens : "0"}</Total>
          <Total>100%</Total>
          <a></a>
        </>
      </Table>
      <AddWalletButton onClick={handleAddWallet}>
        <img src={plusSign} width="10px" />
        Add wallet
      </AddWalletButton>
    </>
  );
};

export const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 80px 10px;
  column-gap: 12px;
  row-gap: 12px;
  margin-top: 10px;
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

export const CustomInput = styled(Input)`
  flex: 1;
  margin: 0;
`;

export const AddWalletButton = styled.button`
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
