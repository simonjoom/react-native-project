/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: pipelines
// ====================================================

export interface pipelines_pipelines_deals {
  id: string;
}

export interface pipelines_pipelines {
  id: string;
  name: string;
  deals: pipelines_pipelines_deals[] | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}

export interface pipelines {
  pipelines: (pipelines_pipelines | null)[];
}
