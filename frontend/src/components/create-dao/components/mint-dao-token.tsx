import { useUnit } from "effector-react";
import { DistributionTable, InputMetadata } from "../../.";
import { $daoInfo, updateDaoInfo } from "../../../store";
import { Input } from "../../common-styles";

export const MintDaoToken = () => {
  const daoInfo = useUnit($daoInfo);
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
        <input
          type="text"
          placeholder="Type name..."
          value={daoInfo.token.name}
          onChange={(e) =>
            updateDaoInfo({
              token: {
                ...daoInfo.token,
                name: e.target.value,
              },
            })
          }
        />
      </Input>
      <Input>
        <InputMetadata
          inputName="Symbol"
          inputDescription="The abbreviation of the token. Example: SHI"
        />
        <input
          type="text"
          placeholder="Type symbol..."
          value={daoInfo.token.symbol}
          onChange={(e) =>
            updateDaoInfo({
              token: {
                ...daoInfo.token,
                symbol: e.target.value,
              },
            })
          }
        />
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
