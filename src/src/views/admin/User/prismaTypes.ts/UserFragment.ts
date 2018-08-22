/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Active, Role } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment_company {
  id: string;
  name: string;
}

export interface UserFragment {
  id: string;
  name: string;
  email: string;
  company: UserFragment_company | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  active_flag: Active | null;
  role: Role | null;
}
