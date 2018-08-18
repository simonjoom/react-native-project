/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteStage
// ====================================================

export interface deleteStage_deleteStage_pipeline {
  id: string;
}

export interface deleteStage_deleteStage {
  id: string;
  name: string;
  pipeline: deleteStage_deleteStage_pipeline | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface deleteStage {
  deleteStage: deleteStage_deleteStage | null;
}

export interface deleteStageVariables {
  name?: string | null;
}
