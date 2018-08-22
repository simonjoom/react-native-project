/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserUpdateOneInput, OrganizationUpdateOneInput, PersonUpdateManyWithoutDealsInput, ProductUpdateManyWithoutDealsInput, StageUpdateOneInput, OrderStatus } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertDeal
// ====================================================

export interface upsertDeal_upsertDeal_owner {
  id: string;
}

export interface upsertDeal_upsertDeal_org {
  id: string;
}

export interface upsertDeal_upsertDeal_stage {
  id: string;
}

export interface upsertDeal_upsertDeal_products {
  id: string;
}

export interface upsertDeal_upsertDeal_participants {
  id: string;
}

export interface upsertDeal_upsertDeal {
  id: string;
  title: string;
  value: string;
  currency: string;
  owner: upsertDeal_upsertDeal_owner | null;
  org: upsertDeal_upsertDeal_org | null;
  stage: upsertDeal_upsertDeal_stage | null;
  products: upsertDeal_upsertDeal_products[] | null;
  participants: upsertDeal_upsertDeal_participants[] | null;
  status: OrderStatus | null;
  probability: string | null;
}

export interface upsertDeal {
  upsertDeal: upsertDeal_upsertDeal;
}

export interface upsertDealVariables {
  title: string;
  namewhere: string;
  value: string;
  currency: string;
  owner?: UserUpdateOneInput | null;
  org?: OrganizationUpdateOneInput | null;
  participants?: PersonUpdateManyWithoutDealsInput | null;
  products?: ProductUpdateManyWithoutDealsInput | null;
  stage?: StageUpdateOneInput | null;
  status?: OrderStatus | null;
  probability?: string | null;
}
