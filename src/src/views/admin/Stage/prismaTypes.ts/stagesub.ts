/* tslint:disable */
// This file was automatically generated and should not be edited.

import { StageSubscriptionWhereInput, MutationType, Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: stagesub
// ====================================================

export interface stagesub_stage_node_pipeline {
  id: string;
}

export interface stagesub_stage_node {
  id: string;
  name: string;
  pipeline: stagesub_stage_node_pipeline | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface stagesub_stage_previousValues {
  id: string;
  name: string;
}

export interface stagesub_stage {
  mutation: MutationType;
  node: stagesub_stage_node | null;
  updatedFields: string[] | null;
  previousValues: stagesub_stage_previousValues | null;
}

export interface stagesub {
  stage: stagesub_stage | null;
}

export interface stagesubVariables {
  where?: StageSubscriptionWhereInput | null;
}
