/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: pipeline
// ====================================================

export interface pipeline_pipeline_deals {
  id: string;
}

export interface pipeline_pipeline {
  id: string;
  name: string;
  deals: pipeline_pipeline_deals[] | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface pipeline {
  pipeline: pipeline_pipeline | null;
}

export interface pipelineVariables {
  name?: string | null;
}
