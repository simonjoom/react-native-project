/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OrganizationFragment
// ====================================================

export interface OrganizationFragment_owner {
  id: string;
}

export interface OrganizationFragment_persons {
  id: string;
}

export interface OrganizationFragment {
  id: string;
  name: string;
  owner: OrganizationFragment_owner | null;
  persons: OrganizationFragment_persons[] | null;
}
