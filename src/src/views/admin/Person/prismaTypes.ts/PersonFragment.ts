/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PersonFragment
// ====================================================

export interface PersonFragment_owner {
  id: string;
  name: string;
}

export interface PersonFragment_pictures {
  id: string;
}

export interface PersonFragment_products {
  id: string;
}

export interface PersonFragment_deals {
  id: string;
}

export interface PersonFragment {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  owner: PersonFragment_owner | null;
  pictures: PersonFragment_pictures[] | null;
  products: PersonFragment_products[] | null;
  deals: PersonFragment_deals[] | null;
}
