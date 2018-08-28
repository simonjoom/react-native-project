/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePicture
// ====================================================

export interface deletePicture_deleteBigpicture_upload {
  path: string;
  filename: string;
}

export interface deletePicture_deleteBigpicture {
  id: string | null;
  file: string;
  upload: deletePicture_deleteBigpicture_upload[] | null;
}

export interface deletePicture {
  deleteBigpicture: deletePicture_deleteBigpicture;
}

export interface deletePictureVariables {
  id?: string | null;
}
