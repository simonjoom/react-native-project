/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  DELETED = "DELETED",
  LOST = "LOST",
  OPEN = "OPEN",
  WON = "WON",
}

export enum Active {
  ACTIVATED = "ACTIVATED",
  NOTACTIVATED = "NOTACTIVATED",
}

export enum Role {
  PERSON = "PERSON",
  USER = "USER",
}

export enum Probability {
  DISABLE = "DISABLE",
  ENABLE = "ENABLE",
}

export enum MutationType {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}

export interface UserUpdateOneInput {
  create?: UserCreateInput | null;
  connect?: UserWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: UserUpdateDataInput | null;
  upsert?: UserUpsertNestedInput | null;
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  active_flag?: Active | null;
  role?: Role | null;
  company?: OrganizationCreateOneWithoutOwnerInput | null;
}

export interface OrganizationCreateOneWithoutOwnerInput {
  create?: OrganizationCreateWithoutOwnerInput | null;
  connect?: OrganizationWhereUniqueInput | null;
}

export interface OrganizationCreateWithoutOwnerInput {
  name: string;
  persons?: PersonCreateManyInput | null;
}

export interface PersonCreateManyInput {
  create?: PersonCreateInput[] | null;
  connect?: PersonWhereUniqueInput[] | null;
}

export interface PersonCreateInput {
  name: string;
  email?: string | null;
  phone?: string | null;
  owner?: UserCreateOneInput | null;
  pictures?: PictureCreateManyInput | null;
  products?: ProductCreateManyInput | null;
  deals?: DealCreateManyWithoutParticipantsInput | null;
}

export interface UserCreateOneInput {
  create?: UserCreateInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  name?: string | null;
  email?: string | null;
}

export interface PictureCreateManyInput {
  create?: PictureCreateInput[] | null;
  connect?: PictureWhereUniqueInput[] | null;
}

export interface PictureCreateInput {
  file: string;
}

export interface PictureWhereUniqueInput {
  id?: string | null;
}

export interface ProductCreateManyInput {
  create?: ProductCreateInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateInput {
  name: string;
  unit?: string | null;
  code?: string | null;
  owner?: UserCreateOneInput | null;
  deals?: DealCreateManyWithoutProductsInput | null;
}

export interface DealCreateManyWithoutProductsInput {
  create?: DealCreateWithoutProductsInput[] | null;
  connect?: DealWhereUniqueInput[] | null;
}

export interface DealCreateWithoutProductsInput {
  title: string;
  value: string;
  currency: string;
  status?: OrderStatus | null;
  probability?: string | null;
  owner?: UserCreateOneInput | null;
  org?: OrganizationCreateOneInput | null;
  participants?: PersonCreateManyWithoutDealsInput | null;
  stage?: StageCreateOneInput | null;
}

export interface OrganizationCreateOneInput {
  create?: OrganizationCreateInput | null;
  connect?: OrganizationWhereUniqueInput | null;
}

export interface OrganizationCreateInput {
  name: string;
  owner?: UserCreateOneWithoutCompanyInput | null;
  persons?: PersonCreateManyInput | null;
}

export interface UserCreateOneWithoutCompanyInput {
  create?: UserCreateWithoutCompanyInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateWithoutCompanyInput {
  name: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  active_flag?: Active | null;
  role?: Role | null;
}

export interface OrganizationWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface PersonCreateManyWithoutDealsInput {
  create?: PersonCreateWithoutDealsInput[] | null;
  connect?: PersonWhereUniqueInput[] | null;
}

export interface PersonCreateWithoutDealsInput {
  name: string;
  email?: string | null;
  phone?: string | null;
  owner?: UserCreateOneInput | null;
  pictures?: PictureCreateManyInput | null;
  products?: ProductCreateManyInput | null;
}

export interface PersonWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface StageCreateOneInput {
  create?: StageCreateInput | null;
  connect?: StageWhereUniqueInput | null;
}

export interface StageCreateInput {
  name: string;
  order_nr?: string | null;
  deal_probability?: Probability | null;
  pipeline?: PipelineCreateOneInput | null;
}

export interface PipelineCreateOneInput {
  create?: PipelineCreateInput | null;
  connect?: PipelineWhereUniqueInput | null;
}

export interface PipelineCreateInput {
  name: string;
  order_nr?: string | null;
  deal_probability?: Probability | null;
  deals?: DealCreateManyInput | null;
}

export interface DealCreateManyInput {
  create?: DealCreateInput[] | null;
  connect?: DealWhereUniqueInput[] | null;
}

export interface DealCreateInput {
  title: string;
  value: string;
  currency: string;
  status?: OrderStatus | null;
  probability?: string | null;
  owner?: UserCreateOneInput | null;
  org?: OrganizationCreateOneInput | null;
  participants?: PersonCreateManyWithoutDealsInput | null;
  products?: ProductCreateManyWithoutDealsInput | null;
  stage?: StageCreateOneInput | null;
}

export interface ProductCreateManyWithoutDealsInput {
  create?: ProductCreateWithoutDealsInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
}

export interface ProductCreateWithoutDealsInput {
  name: string;
  unit?: string | null;
  code?: string | null;
  owner?: UserCreateOneInput | null;
}

export interface ProductWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface DealWhereUniqueInput {
  id?: string | null;
  title?: string | null;
}

export interface PipelineWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface StageWhereUniqueInput {
  id?: string | null;
  name?: string | null;
}

export interface DealCreateManyWithoutParticipantsInput {
  create?: DealCreateWithoutParticipantsInput[] | null;
  connect?: DealWhereUniqueInput[] | null;
}

export interface DealCreateWithoutParticipantsInput {
  title: string;
  value: string;
  currency: string;
  status?: OrderStatus | null;
  probability?: string | null;
  owner?: UserCreateOneInput | null;
  org?: OrganizationCreateOneInput | null;
  products?: ProductCreateManyWithoutDealsInput | null;
  stage?: StageCreateOneInput | null;
}

export interface UserUpdateDataInput {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  active_flag?: Active | null;
  role?: Role | null;
  company?: OrganizationUpdateOneWithoutOwnerInput | null;
}

export interface OrganizationUpdateOneWithoutOwnerInput {
  create?: OrganizationCreateWithoutOwnerInput | null;
  connect?: OrganizationWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: OrganizationUpdateWithoutOwnerDataInput | null;
  upsert?: OrganizationUpsertWithoutOwnerInput | null;
}

export interface OrganizationUpdateWithoutOwnerDataInput {
  name?: string | null;
  persons?: PersonUpdateManyInput | null;
}

export interface PersonUpdateManyInput {
  create?: PersonCreateInput[] | null;
  connect?: PersonWhereUniqueInput[] | null;
  disconnect?: PersonWhereUniqueInput[] | null;
  delete?: PersonWhereUniqueInput[] | null;
  update?: PersonUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: PersonUpsertWithWhereUniqueNestedInput[] | null;
}

export interface PersonUpdateWithWhereUniqueNestedInput {
  where: PersonWhereUniqueInput;
  data: PersonUpdateDataInput;
}

export interface PersonUpdateDataInput {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  owner?: UserUpdateOneInput | null;
  pictures?: PictureUpdateManyInput | null;
  products?: ProductUpdateManyInput | null;
  deals?: DealUpdateManyWithoutParticipantsInput | null;
}

export interface PictureUpdateManyInput {
  create?: PictureCreateInput[] | null;
  connect?: PictureWhereUniqueInput[] | null;
  disconnect?: PictureWhereUniqueInput[] | null;
  delete?: PictureWhereUniqueInput[] | null;
  update?: PictureUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: PictureUpsertWithWhereUniqueNestedInput[] | null;
}

export interface PictureUpdateWithWhereUniqueNestedInput {
  where: PictureWhereUniqueInput;
  data: PictureUpdateDataInput;
}

export interface PictureUpdateDataInput {
  file?: string | null;
}

export interface PictureUpsertWithWhereUniqueNestedInput {
  where: PictureWhereUniqueInput;
  update: PictureUpdateDataInput;
  create: PictureCreateInput;
}

export interface ProductUpdateManyInput {
  create?: ProductCreateInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
  disconnect?: ProductWhereUniqueInput[] | null;
  delete?: ProductWhereUniqueInput[] | null;
  update?: ProductUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: ProductUpsertWithWhereUniqueNestedInput[] | null;
}

export interface ProductUpdateWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput;
  data: ProductUpdateDataInput;
}

export interface ProductUpdateDataInput {
  name?: string | null;
  unit?: string | null;
  code?: string | null;
  owner?: UserUpdateOneInput | null;
  deals?: DealUpdateManyWithoutProductsInput | null;
}

export interface DealUpdateManyWithoutProductsInput {
  create?: DealCreateWithoutProductsInput[] | null;
  connect?: DealWhereUniqueInput[] | null;
  disconnect?: DealWhereUniqueInput[] | null;
  delete?: DealWhereUniqueInput[] | null;
  update?: DealUpdateWithWhereUniqueWithoutProductsInput[] | null;
  upsert?: DealUpsertWithWhereUniqueWithoutProductsInput[] | null;
}

export interface DealUpdateWithWhereUniqueWithoutProductsInput {
  where: DealWhereUniqueInput;
  data: DealUpdateWithoutProductsDataInput;
}

export interface DealUpdateWithoutProductsDataInput {
  title?: string | null;
  value?: string | null;
  currency?: string | null;
  status?: OrderStatus | null;
  probability?: string | null;
  owner?: UserUpdateOneInput | null;
  org?: OrganizationUpdateOneInput | null;
  participants?: PersonUpdateManyWithoutDealsInput | null;
  stage?: StageUpdateOneInput | null;
}

export interface OrganizationUpdateOneInput {
  create?: OrganizationCreateInput | null;
  connect?: OrganizationWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: OrganizationUpdateDataInput | null;
  upsert?: OrganizationUpsertNestedInput | null;
}

export interface OrganizationUpdateDataInput {
  name?: string | null;
  owner?: UserUpdateOneWithoutCompanyInput | null;
  persons?: PersonUpdateManyInput | null;
}

export interface UserUpdateOneWithoutCompanyInput {
  create?: UserCreateWithoutCompanyInput | null;
  connect?: UserWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: UserUpdateWithoutCompanyDataInput | null;
  upsert?: UserUpsertWithoutCompanyInput | null;
}

export interface UserUpdateWithoutCompanyDataInput {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  active_flag?: Active | null;
  role?: Role | null;
}

export interface UserUpsertWithoutCompanyInput {
  update: UserUpdateWithoutCompanyDataInput;
  create: UserCreateWithoutCompanyInput;
}

export interface OrganizationUpsertNestedInput {
  update: OrganizationUpdateDataInput;
  create: OrganizationCreateInput;
}

export interface PersonUpdateManyWithoutDealsInput {
  create?: PersonCreateWithoutDealsInput[] | null;
  connect?: PersonWhereUniqueInput[] | null;
  disconnect?: PersonWhereUniqueInput[] | null;
  delete?: PersonWhereUniqueInput[] | null;
  update?: PersonUpdateWithWhereUniqueWithoutDealsInput[] | null;
  upsert?: PersonUpsertWithWhereUniqueWithoutDealsInput[] | null;
}

export interface PersonUpdateWithWhereUniqueWithoutDealsInput {
  where: PersonWhereUniqueInput;
  data: PersonUpdateWithoutDealsDataInput;
}

export interface PersonUpdateWithoutDealsDataInput {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  owner?: UserUpdateOneInput | null;
  pictures?: PictureUpdateManyInput | null;
  products?: ProductUpdateManyInput | null;
}

export interface PersonUpsertWithWhereUniqueWithoutDealsInput {
  where: PersonWhereUniqueInput;
  update: PersonUpdateWithoutDealsDataInput;
  create: PersonCreateWithoutDealsInput;
}

export interface StageUpdateOneInput {
  create?: StageCreateInput | null;
  connect?: StageWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: StageUpdateDataInput | null;
  upsert?: StageUpsertNestedInput | null;
}

export interface StageUpdateDataInput {
  name?: string | null;
  order_nr?: string | null;
  deal_probability?: Probability | null;
  pipeline?: PipelineUpdateOneInput | null;
}

export interface PipelineUpdateOneInput {
  create?: PipelineCreateInput | null;
  connect?: PipelineWhereUniqueInput | null;
  disconnect?: boolean | null;
  delete?: boolean | null;
  update?: PipelineUpdateDataInput | null;
  upsert?: PipelineUpsertNestedInput | null;
}

export interface PipelineUpdateDataInput {
  name?: string | null;
  order_nr?: string | null;
  deal_probability?: Probability | null;
  deals?: DealUpdateManyInput | null;
}

export interface DealUpdateManyInput {
  create?: DealCreateInput[] | null;
  connect?: DealWhereUniqueInput[] | null;
  disconnect?: DealWhereUniqueInput[] | null;
  delete?: DealWhereUniqueInput[] | null;
  update?: DealUpdateWithWhereUniqueNestedInput[] | null;
  upsert?: DealUpsertWithWhereUniqueNestedInput[] | null;
}

export interface DealUpdateWithWhereUniqueNestedInput {
  where: DealWhereUniqueInput;
  data: DealUpdateDataInput;
}

export interface DealUpdateDataInput {
  title?: string | null;
  value?: string | null;
  currency?: string | null;
  status?: OrderStatus | null;
  probability?: string | null;
  owner?: UserUpdateOneInput | null;
  org?: OrganizationUpdateOneInput | null;
  participants?: PersonUpdateManyWithoutDealsInput | null;
  products?: ProductUpdateManyWithoutDealsInput | null;
  stage?: StageUpdateOneInput | null;
}

export interface ProductUpdateManyWithoutDealsInput {
  create?: ProductCreateWithoutDealsInput[] | null;
  connect?: ProductWhereUniqueInput[] | null;
  disconnect?: ProductWhereUniqueInput[] | null;
  delete?: ProductWhereUniqueInput[] | null;
  update?: ProductUpdateWithWhereUniqueWithoutDealsInput[] | null;
  upsert?: ProductUpsertWithWhereUniqueWithoutDealsInput[] | null;
}

export interface ProductUpdateWithWhereUniqueWithoutDealsInput {
  where: ProductWhereUniqueInput;
  data: ProductUpdateWithoutDealsDataInput;
}

export interface ProductUpdateWithoutDealsDataInput {
  name?: string | null;
  unit?: string | null;
  code?: string | null;
  owner?: UserUpdateOneInput | null;
}

export interface ProductUpsertWithWhereUniqueWithoutDealsInput {
  where: ProductWhereUniqueInput;
  update: ProductUpdateWithoutDealsDataInput;
  create: ProductCreateWithoutDealsInput;
}

export interface DealUpsertWithWhereUniqueNestedInput {
  where: DealWhereUniqueInput;
  update: DealUpdateDataInput;
  create: DealCreateInput;
}

export interface PipelineUpsertNestedInput {
  update: PipelineUpdateDataInput;
  create: PipelineCreateInput;
}

export interface StageUpsertNestedInput {
  update: StageUpdateDataInput;
  create: StageCreateInput;
}

export interface DealUpsertWithWhereUniqueWithoutProductsInput {
  where: DealWhereUniqueInput;
  update: DealUpdateWithoutProductsDataInput;
  create: DealCreateWithoutProductsInput;
}

export interface ProductUpsertWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput;
  update: ProductUpdateDataInput;
  create: ProductCreateInput;
}

export interface DealUpdateManyWithoutParticipantsInput {
  create?: DealCreateWithoutParticipantsInput[] | null;
  connect?: DealWhereUniqueInput[] | null;
  disconnect?: DealWhereUniqueInput[] | null;
  delete?: DealWhereUniqueInput[] | null;
  update?: DealUpdateWithWhereUniqueWithoutParticipantsInput[] | null;
  upsert?: DealUpsertWithWhereUniqueWithoutParticipantsInput[] | null;
}

export interface DealUpdateWithWhereUniqueWithoutParticipantsInput {
  where: DealWhereUniqueInput;
  data: DealUpdateWithoutParticipantsDataInput;
}

export interface DealUpdateWithoutParticipantsDataInput {
  title?: string | null;
  value?: string | null;
  currency?: string | null;
  status?: OrderStatus | null;
  probability?: string | null;
  owner?: UserUpdateOneInput | null;
  org?: OrganizationUpdateOneInput | null;
  products?: ProductUpdateManyWithoutDealsInput | null;
  stage?: StageUpdateOneInput | null;
}

export interface DealUpsertWithWhereUniqueWithoutParticipantsInput {
  where: DealWhereUniqueInput;
  update: DealUpdateWithoutParticipantsDataInput;
  create: DealCreateWithoutParticipantsInput;
}

export interface PersonUpsertWithWhereUniqueNestedInput {
  where: PersonWhereUniqueInput;
  update: PersonUpdateDataInput;
  create: PersonCreateInput;
}

export interface OrganizationUpsertWithoutOwnerInput {
  update: OrganizationUpdateWithoutOwnerDataInput;
  create: OrganizationCreateWithoutOwnerInput;
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput;
  create: UserCreateInput;
}

export interface DealSubscriptionWhereInput {
  AND?: DealSubscriptionWhereInput[] | null;
  OR?: DealSubscriptionWhereInput[] | null;
  NOT?: DealSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: DealWhereInput | null;
}

export interface DealWhereInput {
  AND?: DealWhereInput[] | null;
  OR?: DealWhereInput[] | null;
  NOT?: DealWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  value?: string | null;
  value_not?: string | null;
  value_in?: string[] | null;
  value_not_in?: string[] | null;
  value_lt?: string | null;
  value_lte?: string | null;
  value_gt?: string | null;
  value_gte?: string | null;
  value_contains?: string | null;
  value_not_contains?: string | null;
  value_starts_with?: string | null;
  value_not_starts_with?: string | null;
  value_ends_with?: string | null;
  value_not_ends_with?: string | null;
  currency?: string | null;
  currency_not?: string | null;
  currency_in?: string[] | null;
  currency_not_in?: string[] | null;
  currency_lt?: string | null;
  currency_lte?: string | null;
  currency_gt?: string | null;
  currency_gte?: string | null;
  currency_contains?: string | null;
  currency_not_contains?: string | null;
  currency_starts_with?: string | null;
  currency_not_starts_with?: string | null;
  currency_ends_with?: string | null;
  currency_not_ends_with?: string | null;
  status?: OrderStatus | null;
  status_not?: OrderStatus | null;
  status_in?: OrderStatus[] | null;
  status_not_in?: OrderStatus[] | null;
  probability?: string | null;
  probability_not?: string | null;
  probability_in?: string[] | null;
  probability_not_in?: string[] | null;
  probability_lt?: string | null;
  probability_lte?: string | null;
  probability_gt?: string | null;
  probability_gte?: string | null;
  probability_contains?: string | null;
  probability_not_contains?: string | null;
  probability_starts_with?: string | null;
  probability_not_starts_with?: string | null;
  probability_ends_with?: string | null;
  probability_not_ends_with?: string | null;
  owner?: UserWhereInput | null;
  org?: OrganizationWhereInput | null;
  participants_every?: PersonWhereInput | null;
  participants_some?: PersonWhereInput | null;
  participants_none?: PersonWhereInput | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  stage?: StageWhereInput | null;
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  email?: string | null;
  email_not?: string | null;
  email_in?: string[] | null;
  email_not_in?: string[] | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  email_contains?: string | null;
  email_not_contains?: string | null;
  email_starts_with?: string | null;
  email_not_starts_with?: string | null;
  email_ends_with?: string | null;
  email_not_ends_with?: string | null;
  password?: string | null;
  password_not?: string | null;
  password_in?: string[] | null;
  password_not_in?: string[] | null;
  password_lt?: string | null;
  password_lte?: string | null;
  password_gt?: string | null;
  password_gte?: string | null;
  password_contains?: string | null;
  password_not_contains?: string | null;
  password_starts_with?: string | null;
  password_not_starts_with?: string | null;
  password_ends_with?: string | null;
  password_not_ends_with?: string | null;
  firstName?: string | null;
  firstName_not?: string | null;
  firstName_in?: string[] | null;
  firstName_not_in?: string[] | null;
  firstName_lt?: string | null;
  firstName_lte?: string | null;
  firstName_gt?: string | null;
  firstName_gte?: string | null;
  firstName_contains?: string | null;
  firstName_not_contains?: string | null;
  firstName_starts_with?: string | null;
  firstName_not_starts_with?: string | null;
  firstName_ends_with?: string | null;
  firstName_not_ends_with?: string | null;
  lastName?: string | null;
  lastName_not?: string | null;
  lastName_in?: string[] | null;
  lastName_not_in?: string[] | null;
  lastName_lt?: string | null;
  lastName_lte?: string | null;
  lastName_gt?: string | null;
  lastName_gte?: string | null;
  lastName_contains?: string | null;
  lastName_not_contains?: string | null;
  lastName_starts_with?: string | null;
  lastName_not_starts_with?: string | null;
  lastName_ends_with?: string | null;
  lastName_not_ends_with?: string | null;
  active_flag?: Active | null;
  active_flag_not?: Active | null;
  active_flag_in?: Active[] | null;
  active_flag_not_in?: Active[] | null;
  role?: Role | null;
  role_not?: Role | null;
  role_in?: Role[] | null;
  role_not_in?: Role[] | null;
  company?: OrganizationWhereInput | null;
}

export interface OrganizationWhereInput {
  AND?: OrganizationWhereInput[] | null;
  OR?: OrganizationWhereInput[] | null;
  NOT?: OrganizationWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  owner?: UserWhereInput | null;
  persons_every?: PersonWhereInput | null;
  persons_some?: PersonWhereInput | null;
  persons_none?: PersonWhereInput | null;
}

export interface PersonWhereInput {
  AND?: PersonWhereInput[] | null;
  OR?: PersonWhereInput[] | null;
  NOT?: PersonWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  email?: string | null;
  email_not?: string | null;
  email_in?: string[] | null;
  email_not_in?: string[] | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  email_contains?: string | null;
  email_not_contains?: string | null;
  email_starts_with?: string | null;
  email_not_starts_with?: string | null;
  email_ends_with?: string | null;
  email_not_ends_with?: string | null;
  phone?: string | null;
  phone_not?: string | null;
  phone_in?: string[] | null;
  phone_not_in?: string[] | null;
  phone_lt?: string | null;
  phone_lte?: string | null;
  phone_gt?: string | null;
  phone_gte?: string | null;
  phone_contains?: string | null;
  phone_not_contains?: string | null;
  phone_starts_with?: string | null;
  phone_not_starts_with?: string | null;
  phone_ends_with?: string | null;
  phone_not_ends_with?: string | null;
  owner?: UserWhereInput | null;
  pictures_every?: PictureWhereInput | null;
  pictures_some?: PictureWhereInput | null;
  pictures_none?: PictureWhereInput | null;
  products_every?: ProductWhereInput | null;
  products_some?: ProductWhereInput | null;
  products_none?: ProductWhereInput | null;
  deals_every?: DealWhereInput | null;
  deals_some?: DealWhereInput | null;
  deals_none?: DealWhereInput | null;
}

export interface PictureWhereInput {
  AND?: PictureWhereInput[] | null;
  OR?: PictureWhereInput[] | null;
  NOT?: PictureWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  file?: string | null;
  file_not?: string | null;
  file_in?: string[] | null;
  file_not_in?: string[] | null;
  file_lt?: string | null;
  file_lte?: string | null;
  file_gt?: string | null;
  file_gte?: string | null;
  file_contains?: string | null;
  file_not_contains?: string | null;
  file_starts_with?: string | null;
  file_not_starts_with?: string | null;
  file_ends_with?: string | null;
  file_not_ends_with?: string | null;
}

export interface ProductWhereInput {
  AND?: ProductWhereInput[] | null;
  OR?: ProductWhereInput[] | null;
  NOT?: ProductWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  unit?: string | null;
  unit_not?: string | null;
  unit_in?: string[] | null;
  unit_not_in?: string[] | null;
  unit_lt?: string | null;
  unit_lte?: string | null;
  unit_gt?: string | null;
  unit_gte?: string | null;
  unit_contains?: string | null;
  unit_not_contains?: string | null;
  unit_starts_with?: string | null;
  unit_not_starts_with?: string | null;
  unit_ends_with?: string | null;
  unit_not_ends_with?: string | null;
  code?: string | null;
  code_not?: string | null;
  code_in?: string[] | null;
  code_not_in?: string[] | null;
  code_lt?: string | null;
  code_lte?: string | null;
  code_gt?: string | null;
  code_gte?: string | null;
  code_contains?: string | null;
  code_not_contains?: string | null;
  code_starts_with?: string | null;
  code_not_starts_with?: string | null;
  code_ends_with?: string | null;
  code_not_ends_with?: string | null;
  owner?: UserWhereInput | null;
  deals_every?: DealWhereInput | null;
  deals_some?: DealWhereInput | null;
  deals_none?: DealWhereInput | null;
}

export interface StageWhereInput {
  AND?: StageWhereInput[] | null;
  OR?: StageWhereInput[] | null;
  NOT?: StageWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  order_nr?: string | null;
  order_nr_not?: string | null;
  order_nr_in?: string[] | null;
  order_nr_not_in?: string[] | null;
  order_nr_lt?: string | null;
  order_nr_lte?: string | null;
  order_nr_gt?: string | null;
  order_nr_gte?: string | null;
  order_nr_contains?: string | null;
  order_nr_not_contains?: string | null;
  order_nr_starts_with?: string | null;
  order_nr_not_starts_with?: string | null;
  order_nr_ends_with?: string | null;
  order_nr_not_ends_with?: string | null;
  deal_probability?: Probability | null;
  deal_probability_not?: Probability | null;
  deal_probability_in?: Probability[] | null;
  deal_probability_not_in?: Probability[] | null;
  pipeline?: PipelineWhereInput | null;
}

export interface PipelineWhereInput {
  AND?: PipelineWhereInput[] | null;
  OR?: PipelineWhereInput[] | null;
  NOT?: PipelineWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  order_nr?: string | null;
  order_nr_not?: string | null;
  order_nr_in?: string[] | null;
  order_nr_not_in?: string[] | null;
  order_nr_lt?: string | null;
  order_nr_lte?: string | null;
  order_nr_gt?: string | null;
  order_nr_gte?: string | null;
  order_nr_contains?: string | null;
  order_nr_not_contains?: string | null;
  order_nr_starts_with?: string | null;
  order_nr_not_starts_with?: string | null;
  order_nr_ends_with?: string | null;
  order_nr_not_ends_with?: string | null;
  deal_probability?: Probability | null;
  deal_probability_not?: Probability | null;
  deal_probability_in?: Probability[] | null;
  deal_probability_not_in?: Probability[] | null;
  deals_every?: DealWhereInput | null;
  deals_some?: DealWhereInput | null;
  deals_none?: DealWhereInput | null;
}

export interface OrganizationSubscriptionWhereInput {
  AND?: OrganizationSubscriptionWhereInput[] | null;
  OR?: OrganizationSubscriptionWhereInput[] | null;
  NOT?: OrganizationSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: OrganizationWhereInput | null;
}

export interface PersonSubscriptionWhereInput {
  AND?: PersonSubscriptionWhereInput[] | null;
  OR?: PersonSubscriptionWhereInput[] | null;
  NOT?: PersonSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: PersonWhereInput | null;
}

export interface PictureSubscriptionWhereInput {
  AND?: PictureSubscriptionWhereInput[] | null;
  OR?: PictureSubscriptionWhereInput[] | null;
  NOT?: PictureSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: PictureWhereInput | null;
}

export interface PipelineSubscriptionWhereInput {
  AND?: PipelineSubscriptionWhereInput[] | null;
  OR?: PipelineSubscriptionWhereInput[] | null;
  NOT?: PipelineSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: PipelineWhereInput | null;
}

export interface ProductSubscriptionWhereInput {
  AND?: ProductSubscriptionWhereInput[] | null;
  OR?: ProductSubscriptionWhereInput[] | null;
  NOT?: ProductSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: ProductWhereInput | null;
}

export interface StageSubscriptionWhereInput {
  AND?: StageSubscriptionWhereInput[] | null;
  OR?: StageSubscriptionWhereInput[] | null;
  NOT?: StageSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: StageWhereInput | null;
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | null;
  OR?: UserSubscriptionWhereInput[] | null;
  NOT?: UserSubscriptionWhereInput[] | null;
  mutation_in?: MutationType[] | null;
  updatedFields_contains?: string | null;
  updatedFields_contains_every?: string[] | null;
  updatedFields_contains_some?: string[] | null;
  node?: UserWhereInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
