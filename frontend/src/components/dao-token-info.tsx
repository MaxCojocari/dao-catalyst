import { useState } from "react";
import { BinarySelector, ImportDaoToken, MintDaoToken } from ".";
import { InputMetadata } from "./input-metadata";
import { Input } from "./create-dao/common-styles";

export const DaoTokenInfo = () => {
  const [selectedOption, setSelectedOption] = useState(false);

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
