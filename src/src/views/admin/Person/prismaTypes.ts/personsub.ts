/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PersonSubscriptionWhereInput, MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: personsub
// ====================================================

export interface personsub_person_node_owner {
  id: string;
  name: string;
}

export interface personsub_person_node_pictures {
  id: string;
}

export interface personsub_person_node_products {
  id: string;
}

export interface personsub_person_node_deals {
  id: string;
}

export interface personsub_person_node {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  owner: personsub_person_node_owner | null;
  pictures: personsub_person_node_pictures[] | null;
  products: personsub_person_node_products[] | null;
  deals: personsub_person_node_deals[] | null;
}

export interface personsub_person_previousValues {
  id: string;
  name: string;
}

export interface personsub_person {
  mutation: MutationType;
  node: personsub_person_node | null;
  updatedFields: string[] | null;
  previousValues: personsub_person_previousValues | null;
}

export interface personsub {
  person: personsub_person | null;
}

export interface personsubVariables {
  where?: PersonSubscriptionWhereInput | null;
}
