/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Active, Role } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_company {
  id: string;
  name: string;
}

export interface users_users {
  id: string;
  name: string;
  email: string;
  company: users_users_company | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  active_flag: Active | null;
  role: Role | null;
}

export interface users {
  users: (users_users | null)[];
}
