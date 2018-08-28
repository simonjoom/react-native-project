/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: picture
// ====================================================

export interface picture_bigpicture_upload {
  path: string;
  filename: string;
}

export interface picture_bigpicture {
  id: string | null;
  file: string;
  upload: picture_bigpicture_upload[] | null;
}

export interface picture {
  bigpicture: picture_bigpicture | null;
}

export interface pictureVariables {
  id?: string | null;
}
