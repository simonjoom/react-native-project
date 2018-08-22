/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrganizationUpdateOneWithoutOwnerInput, Active, Role } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: upsertUser
// ====================================================

export interface upsertUser_upsertUser_company {
  id: string;
  name: string;
}

export interface upsertUser_upsertUser {
  id: string;
  name: string;
  email: string;
  company: upsertUser_upsertUser_company | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  active_flag: Active | null;
  role: Role | null;
}

export interface upsertUser {
  upsertUser: upsertUser_upsertUser;
}

export interface upsertUserVariables {
  name: string;
  namewhere?: string | null;
  email: string;
  password: string;
  company?: OrganizationUpdateOneWithoutOwnerInput | null;
  firstName?: string | null;
  lastName?: string | null;
  active_flag?: Active | null;
  role?: Role | null;
}
