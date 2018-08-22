/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability, PipelineUpdateOneInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertStage
// ====================================================

export interface upsertStage_upsertStage_pipeline {
  id: string;
}

export interface upsertStage_upsertStage {
  id: string;
  name: string;
  pipeline: upsertStage_upsertStage_pipeline | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface upsertStage {
  upsertStage: upsertStage_upsertStage;
}

export interface upsertStageVariables {
  name: string;
  namewhere?: string | null;
  order_nr?: string | null;
  deal_probability?: Probability | null;
  pipeline?: PipelineUpdateOneInput | null;
}
