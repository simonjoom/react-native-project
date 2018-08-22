/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DealSubscriptionWhereInput, MutationType, OrderStatus } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: dealsub
// ====================================================

export interface dealsub_deal_node_owner {
  id: string;
}

export interface dealsub_deal_node_org {
  id: string;
}

export interface dealsub_deal_node_stage {
  id: string;
}

export interface dealsub_deal_node_products {
  id: string;
}

export interface dealsub_deal_node_participants {
  id: string;
}

export interface dealsub_deal_node {
  id: string;
  title: string;
  value: string;
  currency: string;
  owner: dealsub_deal_node_owner | null;
  org: dealsub_deal_node_org | null;
  stage: dealsub_deal_node_stage | null;
  products: dealsub_deal_node_products[] | null;
  participants: dealsub_deal_node_participants[] | null;
  status: OrderStatus | null;
  probability: string | null;
}

export interface dealsub_deal_previousValues {
  id: string;
  title: string;
}

export interface dealsub_deal {
  mutation: MutationType;
  node: dealsub_deal_node | null;
  updatedFields: string[] | null;
  previousValues: dealsub_deal_previousValues | null;
}

export interface dealsub {
  deal: dealsub_deal | null;
}

export interface dealsubVariables {
  where?: DealSubscriptionWhereInput | null;
}
