export * from "./create-dao";
export * from "./tx-status";
export * from "./generic-props";
export * from "./create-proposal";
export * from "./voting";
export * from "./token";
export * from "./proposal";

export type Fraction = {
  numerator: number;
  denominator: number;
};

export type Duration = {
  days: string;
  hours: string;
  minutes: string;
};

export type Link = {
  label: string;
  url: string;
};
