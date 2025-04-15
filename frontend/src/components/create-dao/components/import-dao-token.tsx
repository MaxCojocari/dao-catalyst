import styled from "styled-components";
import { InputMetadata } from "../..";
import copyIcon from "../../../assets/images/copy-icon.svg";
import { useEffect, useState } from "react";
import successIcon from "../../../assets/images/success_progress.svg";
import failureIcon from "../../../assets/images/failure.svg";
import { formatUnits, isAddress } from "viem";
import { Input } from "../../common-styles";
import { $daoInfo, updateDaoInfo } from "../../../store";
import { useUnit } from "effector-react";
import { useReadContracts } from "wagmi";
import { DaoToken__factory } from "../../../typechain-types";
import { ERC20Votes_INTERFACE_ID } from "../../../constants";

export const ImportDaoToken = () => {
  const daoInfo = useUnit($daoInfo);
  const [isFocused, setIsFocused] = useState(false);

  const abi = DaoToken__factory.abi;
  const address = daoInfo.token.tokenAddress as `0x${string}`;
  const { data, isPending } = useReadContracts({
    contracts: [
      {
        abi,
        functionName: "supportsInterface",
        address,
        args: [ERC20Votes_INTERFACE_ID],
      },
      {
        abi,
        functionName: "totalSupply",
        address,
      },
      {
        abi,
        functionName: "name",
        address,
      },
      {
        abi,
        functionName: "symbol",
        address,
      },
    ],
  });

  const [supportsInterface, totalSupply, name, symbol] =
    data?.map((d) => d.result) || [];

  const formatAddress = (addr: string) => {
    if (!isAddress(addr)) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
  };

  useEffect(() => {
    if (name && symbol && totalSupply) {
      updateDaoInfo({
        token: {
          ...daoInfo.token,
          name: name?.toString()!,
          symbol: symbol?.toString()!,
          totalSupply: Number(
            formatUnits(BigInt(totalSupply?.toString() as string), 18)
          ),
        },
      });
    }
  }, [data]);

  return (
    <>
      <Input>
        <br />
        <InputMetadata
          inputName="Import your existing token"
          inputDescription="Link the ERC-20 token your community relies on for governance."
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
          inputName="Contract address"
          inputDescription="Enter the contract address. We reccoment double checking it in a block explorer."
        />
        <Container>
          <input
            type="text"
            placeholder="Enter token address..."
            onChange={(e) =>
              updateDaoInfo({
                token: {
                  ...daoInfo.token,
                  isDeployed: true,
                  tokenAddress: e.target.value,
                },
              })
            }
            value={isFocused ? address.trim() : formatAddress(address.trim())}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <img
            src={copyIcon}
            alt="copy-icon"
            width="20px"
            onClick={handleCopy}
            style={{ cursor: "pointer" }}
          />
        </Container>
      </Input>
      {!isPending && (
        <TokenCard>
          {supportsInterface ? (
            <>
              <>
                <h1>
                  {name?.toString()} ({symbol?.toString()})
                </h1>
                <TokenInfo>
                  <InfoRow>
                    <h2>Standard</h2>
                    <h2>ERC-20</h2>
                  </InfoRow>
                  <InfoRow>
                    <h2>Total supply</h2>
                    <h2>
                      {formatUnits(
                        BigInt(totalSupply?.toString() as string),
                        18
                      )}{" "}
                      {symbol?.toString()}
                    </h2>
                  </InfoRow>
                  <InfoRow>
                    <h2>Current holders</h2>
                    <h2>3</h2>
                  </InfoRow>
                </TokenInfo>
              </>
              <ImportSuccess>
                <img
                  src={successIcon}
                  width="16px"
                  style={{ marginRight: "10px", marginTop: "2px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2 style={{ marginBottom: "4px" }}>Supported token</h2>
                  <h3>
                    This token can be used for governance in your DAO as it
                    implements the ERC20Votes extension of the ERC-20 standard.
                  </h3>
                </div>
              </ImportSuccess>
            </>
          ) : (
            <>
              <>
                <h1>{formatAddress(address.trim())}</h1>
                <TokenInfo>
                  <InfoRow>
                    <h2>Standard</h2>
                    <h2>Unknown</h2>
                  </InfoRow>
                </TokenInfo>
              </>
              <ImportFailure>
                <img
                  src={failureIcon}
                  width="16px"
                  style={{ marginRight: "10px", marginTop: "2px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2 style={{ marginBottom: "4px" }}>Not supported token!</h2>
                  <h3>
                    This token is not supported in the DAO Catalyst app. Try a
                    different token or specify that you don't have a governance
                    token yet.
                  </h3>
                </div>
              </ImportFailure>
            </>
          )}
        </TokenCard>
      )}
    </>
  );
};

export const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  margin-top: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 8px;
  margin-top: 8px;
  box-sizing: border-box;
  height: 50px;

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;

  &:focus-within {
    border: 2px solid rgba(102, 102, 255, 0.8);
  }

  input[type="text"] {
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    height: 22px;
    width: 100%;
  }
`;

export const TokenCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  box-sizing: border-box;

  border: 1px solid #e6e6ff;
  border-radius: 8px;

  h1 {
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    letter-spacing: -0.03em;
    color: #555566;
  }

  h2 {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #8f8fb2;
  }
`;

export const ImportSuccess = styled.div`
  margin-top: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;

  width: 100%;

  background: rgba(31, 186, 102, 0.1);
  border: 1px solid rgba(31, 186, 102, 0.2);
  border-radius: 4px;

  h2 {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #1fba66;
  }

  h3 {
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const ImportFailure = styled(ImportSuccess)`
  background: rgba(255, 97, 97, 0.1);
  border: 1px solid rgba(255, 97, 97, 0.2);
  border-radius: 6px;

  h2 {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: rgba(255, 109, 109, 0.9);
  }
`;
