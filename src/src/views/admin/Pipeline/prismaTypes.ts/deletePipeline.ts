/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: deletePipeline
// ====================================================

export interface deletePipeline_deletePipeline_deals {
  id: string;
}

export interface deletePipeline_deletePipeline {
  id: string;
  name: string;
  deals: deletePipeline_deletePipeline_deals[] | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface deletePipeline {
  deletePipeline: deletePipeline_deletePipeline | null;
}

export interface deletePipelineVariables {
  name?: string | null;
}
