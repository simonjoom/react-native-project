/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserSubscriptionWhereInput, MutationType, Active, Role } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: usersub
// ====================================================

export interface usersub_user_node_company {
  id: string;
  name: string;
}

export interface usersub_user_node {
  id: string;
  name: string;
  email: string;
  company: usersub_user_node_company | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  active_flag: Active | null;
  role: Role | null;
}

export interface usersub_user_previousValues {
  id: string;
  name: string;
}

export interface usersub_user {
  mutation: MutationType;
  node: usersub_user_node | null;
  updatedFields: string[] | null;
  previousValues: usersub_user_previousValues | null;
}

export interface usersub {
  user: usersub_user | null;
}

export interface usersubVariables {
  where?: UserSubscriptionWhereInput | null;
}
