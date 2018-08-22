/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserUpdateOneInput, PictureUpdateManyInput, ProductUpdateManyInput, DealUpdateManyWithoutParticipantsInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertPerson
// ====================================================

export interface upsertPerson_upsertPerson_owner {
  id: string;
  name: string;
}

export interface upsertPerson_upsertPerson_pictures {
  id: string;
}

export interface upsertPerson_upsertPerson_products {
  id: string;
}

export interface upsertPerson_upsertPerson_deals {
  id: string;
}

export interface upsertPerson_upsertPerson {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  owner: upsertPerson_upsertPerson_owner | null;
  pictures: upsertPerson_upsertPerson_pictures[] | null;
  products: upsertPerson_upsertPerson_products[] | null;
  deals: upsertPerson_upsertPerson_deals[] | null;
}

export interface upsertPerson {
  upsertPerson: upsertPerson_upsertPerson;
}

export interface upsertPersonVariables {
  name: string;
  namewhere?: string | null;
  email?: string | null;
  phone?: string | null;
  owner?: UserUpdateOneInput | null;
  pictures?: PictureUpdateManyInput | null;
  products?: ProductUpdateManyInput | null;
  deals?: DealUpdateManyWithoutParticipantsInput | null;
}
