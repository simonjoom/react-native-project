/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL fragment: StageFragment
// ====================================================

export interface StageFragment_pipeline {
  id: string;
}

export interface StageFragment {
  id: string;
  name: string;
  pipeline: StageFragment_pipeline | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}
