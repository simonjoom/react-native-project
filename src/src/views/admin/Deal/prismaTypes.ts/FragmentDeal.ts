/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL fragment: FragmentDeal
// ====================================================

export interface FragmentDeal_owner {
  id: string;
}

export interface FragmentDeal_org {
  id: string;
}

export interface FragmentDeal_stage {
  id: string;
}

export interface FragmentDeal_products {
  id: string;
}

export interface FragmentDeal_participants {
  id: string;
}

export interface FragmentDeal {
  id: string;
  title: string;
  value: string;
  currency: string;
  owner: FragmentDeal_owner | null;
  org: FragmentDeal_org | null;
  stage: FragmentDeal_stage | null;
  products: FragmentDeal_products[] | null;
  participants: FragmentDeal_participants[] | null;
  status: OrderStatus | null;
  probability: string | null;
}
