import { useState } from "react";
import { BinarySelector, ImportDaoToken, MintDaoToken } from "../..";
import { InputMetadata } from "../../input-metadata";
import { Input } from "../common-styles";
import { $daoInfo } from "../../../store";
import { useUnit } from "effector-react";

export const DaoTokenInfo = () => {
  const daoInfo = useUnit($daoInfo);
  const [selectedOption, setSelectedOption] = useState(
    daoInfo.token.isDeployed
  );

  return (
    <>
      <Input>
        <br />
        <InputMetadata inputName="Does your community already have an ERC-20 token to govern your DAO?" />
        <BinarySelector value={selectedOption} onChange={setSelectedOption} />
      </Input>
      {selectedOption ? <ImportDaoToken /> : <MintDaoToken />}
    </>
  );
};
