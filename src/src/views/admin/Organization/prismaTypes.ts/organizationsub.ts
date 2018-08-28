/* tslint:disable */
// This file was automatically generated and should not be edited.

import { MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: organizationsub
// ====================================================

export interface organizationsub_organization_node_owner {
  id: string;
}

export interface organizationsub_organization_node_persons {
  id: string;
}

export interface organizationsub_organization_node {
  id: string;
  name: string;
  owner: organizationsub_organization_node_owner | null;
  persons: organizationsub_organization_node_persons[] | null;
}

export interface organizationsub_organization_previousValues {
  id: string;
  name: string;
}

export interface organizationsub_organization {
  mutation: MutationType;
  node: organizationsub_organization_node | null;
  updatedFields: string[] | null;
  previousValues: organizationsub_organization_previousValues | null;
}

export interface organizationsub {
  organization: organizationsub_organization | null;
}

export interface organizationsubVariables {
  mutation?: MutationType[] | null;
}
