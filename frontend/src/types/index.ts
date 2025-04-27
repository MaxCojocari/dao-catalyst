export * from "./dao";
export * from "./tx-status";
export * from "./generic-props";
export * from "./proposal";
export * from "./voting";
export * from "./token";

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
