/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: singleUpload
// ====================================================

export interface singleUpload_singleUpload {
  id: string | null;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
}

export interface singleUpload {
  singleUpload: singleUpload_singleUpload;
}

export interface singleUploadVariables {
  file: any;
}
