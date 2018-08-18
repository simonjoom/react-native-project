/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Active, Role } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user_company {
  id: string;
  name: string;
}

export interface user_user {
  id: string;
  name: string;
  email: string;
  company: user_user_company | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  active_flag: Active | null;
  role: Role | null;
}

export interface user {
  user: user_user | null;
}

export interface userVariables {
  name?: string | null;
}
