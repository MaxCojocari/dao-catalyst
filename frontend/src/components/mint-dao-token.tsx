import { DistributionTable, InputMetadata } from ".";
import { Input } from "./create-dao/common-styles";

export const MintDaoToken = () => {
  return (
    <>
      <Input>
        <br />
        <InputMetadata
          inputName="Mint your token"
          inputDescription="Define the token details and distribute tokens to a core team and DAO treasury."
          inputNameStyle={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "130%",
            letterSpacing: "-0.03em",
            color: "#292933",
          }}
        />
      </Input>
      <Input>
        <InputMetadata
          inputName="Name"
          inputDescription="The full name of the token. Example: SHIBA"
        />
        <input type="text" placeholder="Type name..." />
      </Input>
      <Input>
        <InputMetadata
          inputName="Symbol"
          inputDescription="The abbreviation of the token. Example: SHI"
        />
        <input type="text" placeholder="Type symbol..." />
      </Input>
      <Input>
        <InputMetadata
          inputName="Token distribution"
          inputDescription="Enter the wallet addresses where you'd like to send tokens."
        />
        <DistributionTable />
      </Input>
    </>
  );
};
