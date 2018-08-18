/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: stages
// ====================================================

export interface stages_stages_pipeline {
  id: string;
}

export interface stages_stages {
  id: string;
  name: string;
  pipeline: stages_stages_pipeline | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface stages {
  stages: (stages_stages | null)[];
}
