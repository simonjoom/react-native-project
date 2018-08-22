/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: uploads
// ====================================================

export interface uploads_uploads {
  id: string | null;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
}

export interface uploads {
  uploads: (uploads_uploads | null)[] | null;
}
