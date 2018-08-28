/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: upsertPicture
// ====================================================

export interface upsertPicture_upsertBigpicture_upload {
  path: string;
  filename: string;
}

export interface upsertPicture_upsertBigpicture {
  id: string | null;
  file: string;
  upload: upsertPicture_upsertBigpicture_upload[] | null;
}

export interface upsertPicture {
  upsertBigpicture: upsertPicture_upsertBigpicture;
}

export interface upsertPictureVariables {
  id: string;
  file: string;
}
