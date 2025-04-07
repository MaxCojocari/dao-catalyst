import { useState } from "react";
import { BinarySelector, ImportDaoToken, MintDaoToken } from ".";
import { Input } from "./describe-dao";
import { InputMetadata } from "./input-metadata";

export const DaoTokenInfo = () => {
  const [selectedOption, setSelectedOption] = useState("No");

  return (
    <>
      <Input>
        <br />
        <InputMetadata inputName="Does your community already have an ERC-20 token to govern your DAO?" />
        <BinarySelector value={selectedOption} onChange={setSelectedOption} />
      </Input>
      {selectedOption === "Yes" && <ImportDaoToken />}
      {selectedOption === "No" && <MintDaoToken />}
    </>
  );
};
