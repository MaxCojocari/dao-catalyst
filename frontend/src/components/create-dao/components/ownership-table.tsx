import { Fragment } from "react";
import styled from "styled-components";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { AddressInput } from "../..";
import plusSign from "../../../assets/images/plus-sign.svg";
import {
  $members,
  addMember,
  removeMember,
  updateMemberAddress,
} from "../../../store";
import { useUnit } from "effector-react";

export const OwnershipTable = () => {
  const wallets = useUnit($members);

  const handleAddWallet = () => addMember();
  const handleRemove = (id: number) => removeMember(id);
  const handleAddressChange = (id: number, newAddress: string) =>
    updateMemberAddress({ id, address: newAddress });

  // const handleAddWallet = () => {
  //   const newId = wallets.length ? wallets[wallets.length - 1].id + 1 : 1;
  //   const fraction = {
  //     numerator: Math.floor(((wallets.length + 1) * 2) / 3),
  //     denominator: wallets.length + 1,
  //   };
  //   updateDaoInfo({
  //     members: [...wallets, { id: newId, address: "" }],
  //     quorum: fraction,
  //     minimumParticipation: fraction,
  //   });
  // };

  // const handleRemove = (id: number) => {
  //   const fraction = {
  //     numerator: Math.floor(((wallets.length - 1) * 2) / 3),
  //     denominator: wallets.length - 1,
  //   };
  //   updateDaoInfo({
  //     members: wallets.filter((entry) => entry.id !== id),
  //     quorum: fraction,
  //     minimumParticipation: fraction,
  //   });
  // };

  // const handleAddressChange = (id: number, newAddress: string) => {
  //   updateDaoInfo({
  //     members: wallets.map((entry) =>
  //       entry.id === id ? { ...entry, address: newAddress } : entry
  //     ),
  //   });
  //   const fraction = {
  //     numerator: Math.floor((daoInfo.members.length * 2) / 3),
  //     denominator: daoInfo.members.length,
  //   };
  //   updateDaoInfo({
  //     quorum: fraction,
  //     minimumParticipation: fraction,
  //   });
  // };

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
              <AddressInput
                address={entry.address!}
                onChange={(val) => handleAddressChange(entry.id, val)}
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
