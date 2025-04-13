import { Fragment, useState } from "react";
import styled from "styled-components";
import deleteIcon from "../assets/images/delete-icon.svg";
import { useAccount } from "wagmi";
import { AddressInput } from ".";
import plusSign from "../assets/images/plus-sign.svg";

interface WalletEntry {
  id: number;
  address: string | undefined;
}

export const OwnershipTable = () => {
  const { address } = useAccount();
  const [wallets, setWallets] = useState<WalletEntry[]>([{ id: 1, address }]);

  const handleAddWallet = () => {
    const newId = wallets.length ? wallets[wallets.length - 1].id + 1 : 1;
    setWallets([...wallets, { id: newId, address: "" }]);
  };

  const handleRemove = (id: number) => {
    setWallets((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <>
      <Table>
        <>
          <HeaderRow>Address</HeaderRow>
          <p></p>
        </>

        {wallets.map((entry) => {
          return (
            <Fragment key={`wallet-entry-${entry.id}`}>
              <AddressInput address={entry.address!} />
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
          <p></p>
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
  grid-template-columns: 1fr 10px;
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

export const Total = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
  padding-left: 17px;
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
