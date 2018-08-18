/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Active, Role } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser_company {
  id: string;
  name: string;
}

export interface deleteUser_deleteUser {
  id: string;
  name: string;
  email: string;
  company: deleteUser_deleteUser_company | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  active_flag: Active | null;
  role: Role | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser | null;
}

export interface deleteUserVariables {
  name?: string | null;
}
