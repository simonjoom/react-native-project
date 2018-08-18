/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: deals
// ====================================================

export interface deals_deals_owner {
  id: string;
}

export interface deals_deals_org {
  id: string;
}

export interface deals_deals_stage {
  id: string;
}

export interface deals_deals_products {
  id: string;
}

export interface deals_deals_participants {
  id: string;
}

export interface deals_deals {
  id: string;
  title: string;
  value: string;
  currency: string;
  owner: deals_deals_owner | null;
  org: deals_deals_org | null;
  stage: deals_deals_stage | null;
  products: deals_deals_products[] | null;
  participants: deals_deals_participants[] | null;
  status: OrderStatus | null;
  probability: string | null;
}

export interface deals {
  deals: (deals_deals | null)[];
}
