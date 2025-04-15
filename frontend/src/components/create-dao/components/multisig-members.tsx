import { InputMetadata, OwnershipTable } from "../..";
import { Input } from "../common-styles";

export const MultisigMembers = () => {
  return (
    <>
      <Input>
        <InputMetadata
          inputName="Multisig members"
          inputDescription="There is no limit on the number of addresses on your multisig. Addresses can create proposals, create and approve transactions, and suggest changes to the DAO settings after creation."
        />
        <OwnershipTable />
      </Input>
    </>
  );
};
