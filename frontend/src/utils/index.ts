export { Provider } from "./provider";
export * from "./motions";
export * from "./time-helpers";
export * from "./address";
export * from "./number";
export * from "./build-decoded-actions";
export * from "./generate-statuses";
export * from "./predict-ipfs-uri";
export * from "./get-create-dao-params";

export function toDashedName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}
