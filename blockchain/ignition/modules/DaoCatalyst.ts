import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UNLOCK_TIME = 10n;
const LOCKED_AMOUNT = 232323n;

const DaoCatalystModule = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", UNLOCK_TIME);
  const lockedAmount = m.getParameter("lockedAmount", LOCKED_AMOUNT);

  const contract = m.contract("DaoCatalystModule", [unlockTime], {
    value: lockedAmount,
  });

  return { contract };
});

export default DaoCatalystModule;
