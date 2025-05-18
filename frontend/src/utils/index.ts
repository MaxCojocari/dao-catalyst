export { Provider } from "./provider";
export * from "./motions";
export * from "./time-helpers";
export * from "./address";
export * from "./number";
export * from "./build-decoded-actions";
export * from "./generate-statuses";
export * from "./predict-ipfs-uri";
export * from "./get-create-dao-params";
export * from "./get-create-proposal-params";
export * from "./get-current-timestamp";
export * from "./fetch-logs";

export function toDashedName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}
