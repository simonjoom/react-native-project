/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Probability } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL fragment: PipelineFragment
// ====================================================

export interface PipelineFragment_deals {
  id: string;
}

export interface PipelineFragment {
  id: string;
  name: string;
  deals: PipelineFragment_deals[] | null;
  order_nr: string | null;
  deal_probability: Probability | null;
}
