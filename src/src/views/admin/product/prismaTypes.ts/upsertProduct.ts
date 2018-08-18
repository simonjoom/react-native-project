/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput, DealWhereUniqueInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertProduct
// ====================================================

export interface upsertProduct_upsertProduct_owner {
  id: string;
  name: string;
}

export interface upsertProduct_upsertProduct_deals {
  id: string;
  title: string;
}

export interface upsertProduct_upsertProduct {
  id: string;
  name: string;
  unit: string | null;
  code: string | null;
  owner: upsertProduct_upsertProduct_owner | null;
  deals: upsertProduct_upsertProduct_deals[] | null;
}

export interface upsertProduct {
  upsertProduct: upsertProduct_upsertProduct;
}

export interface upsertProductVariables {
  name: string;
  namewhere?: string | null;
  unit?: string | null;
  code?: string | null;
  owner?: UserWhereUniqueInput | null;
  deals?: DealWhereUniqueInput[] | null;
}
