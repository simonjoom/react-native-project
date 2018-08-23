/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ProductSubscriptionWhereInput, MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: productsub
// ====================================================

export interface productsub_product_node_owner {
  id: string;
  name: string;
}

export interface productsub_product_node_deals {
  id: string;
  title: string;
}

export interface productsub_product_node {
  id: string;
  name: string;
  unit: string | null;
  code: string | null;
  owner: productsub_product_node_owner | null;
  deals: productsub_product_node_deals[] | null;
}

export interface productsub_product_previousValues {
  id: string;
  name: string;
}

export interface productsub_product {
  mutation: MutationType;
  node: productsub_product_node | null;
  updatedFields: string[] | null;
  previousValues: productsub_product_previousValues | null;
}

export interface productsub {
  product: productsub_product | null;
}

export interface productsubVariables {
  where?: ProductSubscriptionWhereInput | null;
}
