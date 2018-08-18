/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: stage
// ====================================================

export interface stage_stage_pipeline {
  id: string;
}

export interface stage_stage {
  id: string;
  name: string;
  pipeline: stage_stage_pipeline | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface stage {
  stage: stage_stage | null;
}

export interface stageVariables {
  name?: string | null;
}
