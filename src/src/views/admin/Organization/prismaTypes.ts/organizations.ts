/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: organizations
// ====================================================

export interface organizations_organizations_owner {
  id: string;
}

export interface organizations_organizations_persons {
  id: string;
}

export interface organizations_organizations {
  id: string;
  name: string;
  owner: organizations_organizations_owner | null;
  persons: organizations_organizations_persons[] | null;
}

export interface organizations {
  organizations: (organizations_organizations | null)[];
}
