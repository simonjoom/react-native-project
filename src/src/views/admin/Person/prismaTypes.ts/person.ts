/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: person
// ====================================================

export interface person_person_owner {
  id: string;
  name: string;
}

export interface person_person_pictures {
  id: string;
}

export interface person_person_products {
  id: string;
}

export interface person_person_deals {
  id: string;
}

export interface person_person {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  owner: person_person_owner | null;
  pictures: person_person_pictures[] | null;
  products: person_person_products[] | null;
  deals: person_person_deals[] | null;
}

export interface person {
  person: person_person | null;
}

export interface personVariables {
  name?: string | null;
}
