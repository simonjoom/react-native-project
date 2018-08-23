/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: product
// ====================================================

export interface product_product_owner {
  id: string;
  name: string;
}

export interface product_product_deals {
  id: string;
  title: string;
}

export interface product_product {
  id: string;
  name: string;
  unit: string | null;
  code: string | null;
  owner: product_product_owner | null;
  deals: product_product_deals[] | null;
}

export interface product {
  product: product_product | null;
}

export interface productVariables {
  name?: string | null;
}
