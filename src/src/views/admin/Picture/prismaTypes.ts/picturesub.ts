/* tslint:disable */
// This file was automatically generated and should not be edited.

import { PictureSubscriptionWhereInput, MutationType } from "../../../../../../prismaTypes.ts/globalTypes";

// ====================================================
// GraphQL subscription operation: picturesub
// ====================================================

export interface picturesub_picture_node {
  id: string;
  file: string;
}

export interface picturesub_picture_previousValues {
  id: string;
  file: string;
}

export interface picturesub_picture {
  mutation: MutationType;
  node: picturesub_picture_node | null;
  updatedFields: string[] | null;
  previousValues: picturesub_picture_previousValues | null;
}

export interface picturesub {
  picture: picturesub_picture | null;
}

export interface picturesubVariables {
  where?: PictureSubscriptionWhereInput | null;
}
