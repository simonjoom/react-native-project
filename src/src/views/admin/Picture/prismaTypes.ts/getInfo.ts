/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getInfo
// ====================================================

export interface getInfo_getInfo {
  id: string | null;
  filename: string;
  encoding: string;
  mimetype: string;
  path: string;
}

export interface getInfo {
  getInfo: getInfo_getInfo | null;
}

export interface getInfoVariables {
  file: string;
}
