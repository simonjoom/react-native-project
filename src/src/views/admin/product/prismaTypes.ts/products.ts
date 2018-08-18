/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: products
// ====================================================

export interface products_products_owner {
  id: string;
  name: string;
}

export interface products_products_deals {
  id: string;
  title: string;
}

export interface products_products {
  id: string;
  name: string;
  unit: string | null;
  code: string | null;
  owner: products_products_owner | null;
  deals: products_products_deals[] | null;
}

export interface products {
  products: (products_products | null)[];
}
