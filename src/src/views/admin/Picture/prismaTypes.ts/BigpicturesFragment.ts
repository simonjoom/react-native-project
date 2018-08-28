/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BigpicturesFragment
// ====================================================

export interface BigpicturesFragment_upload {
  path: string;
  filename: string;
}

export interface BigpicturesFragment {
  id: string | null;
  file: string;
  upload: BigpicturesFragment_upload[] | null;
}
