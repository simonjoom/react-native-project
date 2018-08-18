/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteDeal
// ====================================================

export interface deleteDeal_deleteDeal_owner {
  id: string;
}

export interface deleteDeal_deleteDeal_org {
  id: string;
}

export interface deleteDeal_deleteDeal_stage {
  id: string;
}

export interface deleteDeal_deleteDeal_products {
  id: string;
}

export interface deleteDeal_deleteDeal_participants {
  id: string;
}

export interface deleteDeal_deleteDeal {
  id: string;
  title: string;
  value: string;
  currency: string;
  owner: deleteDeal_deleteDeal_owner | null;
  org: deleteDeal_deleteDeal_org | null;
  stage: deleteDeal_deleteDeal_stage | null;
  products: deleteDeal_deleteDeal_products[] | null;
  participants: deleteDeal_deleteDeal_participants[] | null;
  status: OrderStatus | null;
  probability: string | null;
}

export interface deleteDeal {
  deleteDeal: deleteDeal_deleteDeal | null;
}

export interface deleteDealVariables {
  title?: string | null;
}
