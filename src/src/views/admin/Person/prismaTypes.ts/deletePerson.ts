/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePerson
// ====================================================

export interface deletePerson_deletePerson_owner {
  id: string;
  name: string;
}

export interface deletePerson_deletePerson_pictures {
  id: string;
}

export interface deletePerson_deletePerson_products {
  id: string;
}

export interface deletePerson_deletePerson_deals {
  id: string;
}

export interface deletePerson_deletePerson {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  owner: deletePerson_deletePerson_owner | null;
  pictures: deletePerson_deletePerson_pictures[] | null;
  products: deletePerson_deletePerson_products[] | null;
  deals: deletePerson_deletePerson_deals[] | null;
}

export interface deletePerson {
  deletePerson: deletePerson_deletePerson | null;
}

export interface deletePersonVariables {
  name?: string | null;
}
