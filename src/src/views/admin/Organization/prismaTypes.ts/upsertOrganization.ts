/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput, PersonWhereUniqueInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertOrganization
// ====================================================

export interface upsertOrganization_upsertOrganization_owner {
  id: string;
  name: string;
}

export interface upsertOrganization_upsertOrganization_persons {
  id: string;
}

export interface upsertOrganization_upsertOrganization {
  id: string;
  name: string;
  owner: upsertOrganization_upsertOrganization_owner | null;
  persons: upsertOrganization_upsertOrganization_persons[] | null;
}

export interface upsertOrganization {
  upsertOrganization: upsertOrganization_upsertOrganization;
}

export interface upsertOrganizationVariables {
  namewhere?: string | null;
  name: string;
  owner?: UserWhereUniqueInput | null;
  persons?: PersonWhereUniqueInput[] | null;
}
