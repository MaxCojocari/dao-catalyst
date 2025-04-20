import { Fragment } from "react";
import styled from "styled-components";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { AddressInput } from "../..";
import plusSign from "../../../assets/images/plus-sign.svg";
import { $daoInfo, updateDaoInfo, updateMemberAddress } from "../../../store";
import { useUnit } from "effector-react";

export const OwnershipTable = () => {
  const daoInfo = useUnit($daoInfo);

  const handleAddWallet = () => {
    updateDaoInfo({ members: [...daoInfo.members, ""] });
  };

  const handleRemove = (id: number) => {
    updateDaoInfo({
      members: daoInfo.members.filter((_, index) => index !== id),
    });
  };

  const handleAddressChange = (id: number, newAddress: string) => {
    updateMemberAddress({ id, address: newAddress });
    updateDaoInfo({
      members: daoInfo.members.map((member, index) =>
        index === id ? newAddress : member
      ),
    });
  };

  return (
    <>
      <Table>
        <>
          <HeaderRow>Address</HeaderRow>
          <p></p>
        </>

        {daoInfo.members.map((entry, id) => {
          return (
            <Fragment key={`wallet-entry-${id}`}>
              <AddressInput
                address={entry!}
                onChange={(val) => handleAddressChange(id, val)}
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
                  onClick={() => handleRemove(id)}
                  style={{ width: "20px" }}
                />
              </div>
            </Fragment>
          );
        })}
        <>
          <Total>{daoInfo.members.length} addresses</Total>
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
