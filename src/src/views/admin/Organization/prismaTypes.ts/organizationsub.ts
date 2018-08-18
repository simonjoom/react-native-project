/* tslint:disable */
// This file was automatically generated and should not be edited.

import { OrganizationSubscriptionWhereInput } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: organizationsub
// ====================================================

export interface organizationsub_organizationsub_node {
  id: string;
  name: string;
}

export interface organizationsub_organizationsub_previousValues {
  id: string;
  name: string;
}

export interface organizationsub_organizationsub {
  node: organizationsub_organizationsub_node | null;
  updatedFields: string[] | null;
  previousValues: organizationsub_organizationsub_previousValues | null;
}

export interface organizationsub {
  organizationsub: organizationsub_organizationsub | null;
}

export interface organizationsubVariables {
  where?: OrganizationSubscriptionWhereInput | null;
}
