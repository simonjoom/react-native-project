/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: deal
// ====================================================

export interface deal_deal_owner {
  id: string;
}

export interface deal_deal_org {
  id: string;
}

export interface deal_deal_stage {
  id: string;
}

export interface deal_deal_products {
  id: string;
}

export interface deal_deal_participants {
  id: string;
}

export interface deal_deal {
  id: string;
  title: string;
  value: string;
  currency: string;
  owner: deal_deal_owner | null;
  org: deal_deal_org | null;
  stage: deal_deal_stage | null;
  products: deal_deal_products[] | null;
  participants: deal_deal_participants[] | null;
  status: OrderStatus | null;
  probability: string | null;
}

export interface deal {
  deal: deal_deal | null;
}

export interface dealVariables {
  title?: string | null;
}
