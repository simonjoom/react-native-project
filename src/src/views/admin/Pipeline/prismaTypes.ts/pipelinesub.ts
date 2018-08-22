/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PipelineSubscriptionWhereInput, MutationType, Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: pipelinesub
// ====================================================

export interface pipelinesub_pipeline_node_deals {
  id: string;
}

export interface pipelinesub_pipeline_node {
  id: string;
  name: string;
  deals: pipelinesub_pipeline_node_deals[] | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface pipelinesub_pipeline_previousValues {
  id: string;
  name: string;
}

export interface pipelinesub_pipeline {
  mutation: MutationType;
  node: pipelinesub_pipeline_node | null;
  updatedFields: string[] | null;
  previousValues: pipelinesub_pipeline_previousValues | null;
}

export interface pipelinesub {
  pipeline: pipelinesub_pipeline | null;
}

export interface pipelinesubVariables {
  where?: PipelineSubscriptionWhereInput | null;
}
