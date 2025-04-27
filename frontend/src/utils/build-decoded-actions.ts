import { Dao__factory, TargetContract__factory } from "../typechain-types";
import { ProposalAction, ActionType } from "../types";
import { Interface } from "ethers";

type RawProposalAction = {
  target: `0x${string}`;
  value: bigint;
  calldatas: `0x${string}`;
};

export function buildDecodedActions(
  rawActions: RawProposalAction[]
): ProposalAction[] {
  const actions: ProposalAction[] = [];
  const daoInterface = new Interface(Dao__factory.abi);
  const targetInterface = new Interface(TargetContract__factory.abi);

  rawActions.forEach((action, index) => {
    let functionFragment = "unknown";
    let inputs: any[] = [];

    try {
      const decoded = daoInterface.parseTransaction({
        data: action.calldatas,
      })!;

      functionFragment = decoded.signature;
      inputs = decoded.args;
    } catch (errorFirst) {
      try {
        const decoded = targetInterface.parseTransaction({
          data: action.calldatas,
        })!;

        functionFragment = decoded.signature;
        inputs = decoded.args;
      } catch (errorSecond) {
        console.warn(`Failed to decode action at index ${index}`, {
          firstError: errorFirst,
          secondError: errorSecond,
        });
      }
    }

    const type = detectActionType(functionFragment);

    actions.push({
      id: `action-${index + 1}`,
      target: action.target,
      value: action.value.toString(),
      type,
      functionFragment,
      inputs,
    });
  });

  return actions;
}

function detectActionType(functionFragment: string): ActionType {
  if (
    functionFragment.startsWith("transfer(") ||
    functionFragment.startsWith("transfer(address,address,uint256)")
  ) {
    return ActionType.TransferTokens;
  }
  return ActionType.Other;
}
