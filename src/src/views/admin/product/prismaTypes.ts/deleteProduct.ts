/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteProduct
// ====================================================

export interface deleteProduct_deleteProduct_owner {
  id: string;
  name: string;
}

export interface deleteProduct_deleteProduct_deals {
  id: string;
  title: string;
}

export interface deleteProduct_deleteProduct {
  id: string;
  name: string;
  unit: string | null;
  code: string | null;
  owner: deleteProduct_deleteProduct_owner | null;
  deals: deleteProduct_deleteProduct_deals[] | null;
}

export interface deleteProduct {
  deleteProduct: deleteProduct_deleteProduct | null;
}

export interface deleteProductVariables {
  name?: string | null;
}
