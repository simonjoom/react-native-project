/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductFragment
// ====================================================

export interface ProductFragment_owner {
  id: string;
  name: string;
}

export interface ProductFragment_deals {
  id: string;
  title: string;
}

export interface ProductFragment {
  id: string;
  name: string;
  unit: string | null;
  code: string | null;
  owner: ProductFragment_owner | null;
  deals: ProductFragment_deals[] | null;
}
