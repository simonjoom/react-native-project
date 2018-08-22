/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability, DealUpdateManyInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertPipeline
// ====================================================

export interface upsertPipeline_upsertPipeline_deals {
  id: string;
}

export interface upsertPipeline_upsertPipeline {
  id: string;
  name: string;
  deals: upsertPipeline_upsertPipeline_deals[] | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface upsertPipeline {
  upsertPipeline: upsertPipeline_upsertPipeline;
}

export interface upsertPipelineVariables {
  name: string;
  namewhere?: string | null;
  order_nr?: string | null;
  deal_probability?: Probability | null;
  deals?: DealUpdateManyInput | null;
}
