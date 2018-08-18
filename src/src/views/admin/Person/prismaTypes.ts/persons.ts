/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: persons
// ====================================================

export interface persons_persons_owner {
  id: string;
  name: string;
}

export interface persons_persons_pictures {
  id: string;
}

export interface persons_persons_products {
  id: string;
}

export interface persons_persons_deals {
  id: string;
}

export interface persons_persons {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  owner: persons_persons_owner | null;
  pictures: persons_persons_pictures[] | null;
  products: persons_persons_products[] | null;
  deals: persons_persons_deals[] | null;
}

export interface persons {
  persons: (persons_persons | null)[];
}
