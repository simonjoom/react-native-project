/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: organization
// ====================================================

export interface organization_organization_owner {
  id: string;
}

export interface organization_organization_persons {
  id: string;
}

export interface organization_organization {
  id: string;
  name: string;
  owner: organization_organization_owner | null;
  persons: organization_organization_persons[] | null;
}

export interface organization {
  organization: organization_organization | null;
}

export interface organizationVariables {
  name?: string | null;
}
