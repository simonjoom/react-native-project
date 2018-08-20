import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    products: <T = Product[]>(args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deals: <T = Deal[]>(args: { where?: DealWhereInput, orderBy?: DealOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    persons: <T = Person[]>(args: { where?: PersonWhereInput, orderBy?: PersonOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    pipelines: <T = Pipeline[]>(args: { where?: PipelineWhereInput, orderBy?: PipelineOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    pictures: <T = Picture[]>(args: { where?: PictureWhereInput, orderBy?: PictureOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    organizations: <T = Organization[]>(args: { where?: OrganizationWhereInput, orderBy?: OrganizationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stages: <T = Stage[]>(args: { where?: StageWhereInput, orderBy?: StageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    product: <T = Product | null>(args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deal: <T = Deal | null>(args: { where: DealWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    person: <T = Person | null>(args: { where: PersonWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    pipeline: <T = Pipeline | null>(args: { where: PipelineWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    picture: <T = Picture | null>(args: { where: PictureWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    organization: <T = Organization | null>(args: { where: OrganizationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stage: <T = Stage | null>(args: { where: StageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    productsConnection: <T = ProductConnection>(args: { where?: ProductWhereInput, orderBy?: ProductOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    dealsConnection: <T = DealConnection>(args: { where?: DealWhereInput, orderBy?: DealOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    personsConnection: <T = PersonConnection>(args: { where?: PersonWhereInput, orderBy?: PersonOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    pipelinesConnection: <T = PipelineConnection>(args: { where?: PipelineWhereInput, orderBy?: PipelineOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    picturesConnection: <T = PictureConnection>(args: { where?: PictureWhereInput, orderBy?: PictureOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    organizationsConnection: <T = OrganizationConnection>(args: { where?: OrganizationWhereInput, orderBy?: OrganizationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    stagesConnection: <T = StageConnection>(args: { where?: StageWhereInput, orderBy?: StageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createProduct: <T = Product>(args: { data: ProductCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createDeal: <T = Deal>(args: { data: DealCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPerson: <T = Person>(args: { data: PersonCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPipeline: <T = Pipeline>(args: { data: PipelineCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPicture: <T = Picture>(args: { data: PictureCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createOrganization: <T = Organization>(args: { data: OrganizationCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createStage: <T = Stage>(args: { data: StageCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateProduct: <T = Product | null>(args: { data: ProductUpdateInput, where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateDeal: <T = Deal | null>(args: { data: DealUpdateInput, where: DealWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePerson: <T = Person | null>(args: { data: PersonUpdateInput, where: PersonWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePipeline: <T = Pipeline | null>(args: { data: PipelineUpdateInput, where: PipelineWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updatePicture: <T = Picture | null>(args: { data: PictureUpdateInput, where: PictureWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateOrganization: <T = Organization | null>(args: { data: OrganizationUpdateInput, where: OrganizationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateStage: <T = Stage | null>(args: { data: StageUpdateInput, where: StageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteProduct: <T = Product | null>(args: { where: ProductWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteDeal: <T = Deal | null>(args: { where: DealWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePerson: <T = Person | null>(args: { where: PersonWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePipeline: <T = Pipeline | null>(args: { where: PipelineWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deletePicture: <T = Picture | null>(args: { where: PictureWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteOrganization: <T = Organization | null>(args: { where: OrganizationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteStage: <T = Stage | null>(args: { where: StageWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertProduct: <T = Product>(args: { where: ProductWhereUniqueInput, create: ProductCreateInput, update: ProductUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertDeal: <T = Deal>(args: { where: DealWhereUniqueInput, create: DealCreateInput, update: DealUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPerson: <T = Person>(args: { where: PersonWhereUniqueInput, create: PersonCreateInput, update: PersonUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPipeline: <T = Pipeline>(args: { where: PipelineWhereUniqueInput, create: PipelineCreateInput, update: PipelineUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertPicture: <T = Picture>(args: { where: PictureWhereUniqueInput, create: PictureCreateInput, update: PictureUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertOrganization: <T = Organization>(args: { where: OrganizationWhereUniqueInput, create: OrganizationCreateInput, update: OrganizationUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertStage: <T = Stage>(args: { where: StageWhereUniqueInput, create: StageCreateInput, update: StageUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyProducts: <T = BatchPayload>(args: { data: ProductUpdateInput, where?: ProductWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyDeals: <T = BatchPayload>(args: { data: DealUpdateInput, where?: DealWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPersons: <T = BatchPayload>(args: { data: PersonUpdateInput, where?: PersonWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPipelines: <T = BatchPayload>(args: { data: PipelineUpdateInput, where?: PipelineWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPictures: <T = BatchPayload>(args: { data: PictureUpdateInput, where?: PictureWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyOrganizations: <T = BatchPayload>(args: { data: OrganizationUpdateInput, where?: OrganizationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyStages: <T = BatchPayload>(args: { data: StageUpdateInput, where?: StageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyProducts: <T = BatchPayload>(args: { where?: ProductWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyDeals: <T = BatchPayload>(args: { where?: DealWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPersons: <T = BatchPayload>(args: { where?: PersonWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPipelines: <T = BatchPayload>(args: { where?: PipelineWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPictures: <T = BatchPayload>(args: { where?: PictureWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyOrganizations: <T = BatchPayload>(args: { where?: OrganizationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyStages: <T = BatchPayload>(args: { where?: StageWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    product: <T = ProductSubscriptionPayload | null>(args: { where?: ProductSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    deal: <T = DealSubscriptionPayload | null>(args: { where?: DealSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    person: <T = PersonSubscriptionPayload | null>(args: { where?: PersonSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    pipeline: <T = PipelineSubscriptionPayload | null>(args: { where?: PipelineSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    picture: <T = PictureSubscriptionPayload | null>(args: { where?: PictureSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    organization: <T = OrganizationSubscriptionPayload | null>(args: { where?: OrganizationSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    stage: <T = StageSubscriptionPayload | null>(args: { where?: StageSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Product: (where?: ProductWhereInput) => Promise<boolean>
  Deal: (where?: DealWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
  Person: (where?: PersonWhereInput) => Promise<boolean>
  Pipeline: (where?: PipelineWhereInput) => Promise<boolean>
  Picture: (where?: PictureWhereInput) => Promise<boolean>
  Organization: (where?: OrganizationWhereInput) => Promise<boolean>
  Stage: (where?: StageWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `enum Active {
  ACTIVATED
  NOTACTIVATED
}

type AggregateDeal {
  count: Int!
}

type AggregateOrganization {
  count: Int!
}

type AggregatePerson {
  count: Int!
}

type AggregatePicture {
  count: Int!
}

type AggregatePipeline {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateStage {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Deal implements Node {
  id: ID!
  title: String!
  value: String!
  currency: String!
  owner(where: UserWhereInput): User
  org(where: OrganizationWhereInput): Organization
  participants(where: PersonWhereInput, orderBy: PersonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Person!]
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
  stage(where: StageWhereInput): Stage
  status: OrderStatus
  probability: String
}

"""A connection to a list of items."""
type DealConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DealEdge]!
  aggregate: AggregateDeal!
}

input DealCreateInput {
  title: String!
  value: String!
  currency: String!
  status: OrderStatus
  probability: String
  owner: UserCreateOneInput
  org: OrganizationCreateOneInput
  participants: PersonCreateManyWithoutDealsInput
  products: ProductCreateManyWithoutDealsInput
  stage: StageCreateOneInput
}

input DealCreateManyInput {
  create: [DealCreateInput!]
  connect: [DealWhereUniqueInput!]
}

input DealCreateManyWithoutParticipantsInput {
  create: [DealCreateWithoutParticipantsInput!]
  connect: [DealWhereUniqueInput!]
}

input DealCreateManyWithoutProductsInput {
  create: [DealCreateWithoutProductsInput!]
  connect: [DealWhereUniqueInput!]
}

input DealCreateWithoutParticipantsInput {
  title: String!
  value: String!
  currency: String!
  status: OrderStatus
  probability: String
  owner: UserCreateOneInput
  org: OrganizationCreateOneInput
  products: ProductCreateManyWithoutDealsInput
  stage: StageCreateOneInput
}

input DealCreateWithoutProductsInput {
  title: String!
  value: String!
  currency: String!
  status: OrderStatus
  probability: String
  owner: UserCreateOneInput
  org: OrganizationCreateOneInput
  participants: PersonCreateManyWithoutDealsInput
  stage: StageCreateOneInput
}

"""An edge in a connection."""
type DealEdge {
  """The item at the end of the edge."""
  node: Deal!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DealOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  value_ASC
  value_DESC
  currency_ASC
  currency_DESC
  status_ASC
  status_DESC
  probability_ASC
  probability_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type DealPreviousValues {
  id: ID!
  title: String!
  value: String!
  currency: String!
  status: OrderStatus
  probability: String
}

type DealSubscriptionPayload {
  mutation: MutationType!
  node: Deal
  updatedFields: [String!]
  previousValues: DealPreviousValues
}

input DealSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DealSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DealSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DealSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DealWhereInput
}

input DealUpdateDataInput {
  title: String
  value: String
  currency: String
  status: OrderStatus
  probability: String
  owner: UserUpdateOneInput
  org: OrganizationUpdateOneInput
  participants: PersonUpdateManyWithoutDealsInput
  products: ProductUpdateManyWithoutDealsInput
  stage: StageUpdateOneInput
}

input DealUpdateInput {
  title: String
  value: String
  currency: String
  status: OrderStatus
  probability: String
  owner: UserUpdateOneInput
  org: OrganizationUpdateOneInput
  participants: PersonUpdateManyWithoutDealsInput
  products: ProductUpdateManyWithoutDealsInput
  stage: StageUpdateOneInput
}

input DealUpdateManyInput {
  create: [DealCreateInput!]
  connect: [DealWhereUniqueInput!]
  disconnect: [DealWhereUniqueInput!]
  delete: [DealWhereUniqueInput!]
  update: [DealUpdateWithWhereUniqueNestedInput!]
  upsert: [DealUpsertWithWhereUniqueNestedInput!]
}

input DealUpdateManyWithoutParticipantsInput {
  create: [DealCreateWithoutParticipantsInput!]
  connect: [DealWhereUniqueInput!]
  disconnect: [DealWhereUniqueInput!]
  delete: [DealWhereUniqueInput!]
  update: [DealUpdateWithWhereUniqueWithoutParticipantsInput!]
  upsert: [DealUpsertWithWhereUniqueWithoutParticipantsInput!]
}

input DealUpdateManyWithoutProductsInput {
  create: [DealCreateWithoutProductsInput!]
  connect: [DealWhereUniqueInput!]
  disconnect: [DealWhereUniqueInput!]
  delete: [DealWhereUniqueInput!]
  update: [DealUpdateWithWhereUniqueWithoutProductsInput!]
  upsert: [DealUpsertWithWhereUniqueWithoutProductsInput!]
}

input DealUpdateWithoutParticipantsDataInput {
  title: String
  value: String
  currency: String
  status: OrderStatus
  probability: String
  owner: UserUpdateOneInput
  org: OrganizationUpdateOneInput
  products: ProductUpdateManyWithoutDealsInput
  stage: StageUpdateOneInput
}

input DealUpdateWithoutProductsDataInput {
  title: String
  value: String
  currency: String
  status: OrderStatus
  probability: String
  owner: UserUpdateOneInput
  org: OrganizationUpdateOneInput
  participants: PersonUpdateManyWithoutDealsInput
  stage: StageUpdateOneInput
}

input DealUpdateWithWhereUniqueNestedInput {
  where: DealWhereUniqueInput!
  data: DealUpdateDataInput!
}

input DealUpdateWithWhereUniqueWithoutParticipantsInput {
  where: DealWhereUniqueInput!
  data: DealUpdateWithoutParticipantsDataInput!
}

input DealUpdateWithWhereUniqueWithoutProductsInput {
  where: DealWhereUniqueInput!
  data: DealUpdateWithoutProductsDataInput!
}

input DealUpsertWithWhereUniqueNestedInput {
  where: DealWhereUniqueInput!
  update: DealUpdateDataInput!
  create: DealCreateInput!
}

input DealUpsertWithWhereUniqueWithoutParticipantsInput {
  where: DealWhereUniqueInput!
  update: DealUpdateWithoutParticipantsDataInput!
  create: DealCreateWithoutParticipantsInput!
}

input DealUpsertWithWhereUniqueWithoutProductsInput {
  where: DealWhereUniqueInput!
  update: DealUpdateWithoutProductsDataInput!
  create: DealCreateWithoutProductsInput!
}

input DealWhereInput {
  """Logical AND on all given filters."""
  AND: [DealWhereInput!]

  """Logical OR on all given filters."""
  OR: [DealWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DealWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  value: String

  """All values that are not equal to given value."""
  value_not: String

  """All values that are contained in given list."""
  value_in: [String!]

  """All values that are not contained in given list."""
  value_not_in: [String!]

  """All values less than the given value."""
  value_lt: String

  """All values less than or equal the given value."""
  value_lte: String

  """All values greater than the given value."""
  value_gt: String

  """All values greater than or equal the given value."""
  value_gte: String

  """All values containing the given string."""
  value_contains: String

  """All values not containing the given string."""
  value_not_contains: String

  """All values starting with the given string."""
  value_starts_with: String

  """All values not starting with the given string."""
  value_not_starts_with: String

  """All values ending with the given string."""
  value_ends_with: String

  """All values not ending with the given string."""
  value_not_ends_with: String
  currency: String

  """All values that are not equal to given value."""
  currency_not: String

  """All values that are contained in given list."""
  currency_in: [String!]

  """All values that are not contained in given list."""
  currency_not_in: [String!]

  """All values less than the given value."""
  currency_lt: String

  """All values less than or equal the given value."""
  currency_lte: String

  """All values greater than the given value."""
  currency_gt: String

  """All values greater than or equal the given value."""
  currency_gte: String

  """All values containing the given string."""
  currency_contains: String

  """All values not containing the given string."""
  currency_not_contains: String

  """All values starting with the given string."""
  currency_starts_with: String

  """All values not starting with the given string."""
  currency_not_starts_with: String

  """All values ending with the given string."""
  currency_ends_with: String

  """All values not ending with the given string."""
  currency_not_ends_with: String
  status: OrderStatus

  """All values that are not equal to given value."""
  status_not: OrderStatus

  """All values that are contained in given list."""
  status_in: [OrderStatus!]

  """All values that are not contained in given list."""
  status_not_in: [OrderStatus!]
  probability: String

  """All values that are not equal to given value."""
  probability_not: String

  """All values that are contained in given list."""
  probability_in: [String!]

  """All values that are not contained in given list."""
  probability_not_in: [String!]

  """All values less than the given value."""
  probability_lt: String

  """All values less than or equal the given value."""
  probability_lte: String

  """All values greater than the given value."""
  probability_gt: String

  """All values greater than or equal the given value."""
  probability_gte: String

  """All values containing the given string."""
  probability_contains: String

  """All values not containing the given string."""
  probability_not_contains: String

  """All values starting with the given string."""
  probability_starts_with: String

  """All values not starting with the given string."""
  probability_not_starts_with: String

  """All values ending with the given string."""
  probability_ends_with: String

  """All values not ending with the given string."""
  probability_not_ends_with: String
  owner: UserWhereInput
  org: OrganizationWhereInput
  participants_every: PersonWhereInput
  participants_some: PersonWhereInput
  participants_none: PersonWhereInput
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
  stage: StageWhereInput
}

input DealWhereUniqueInput {
  id: ID
  title: String
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createProduct(data: ProductCreateInput!): Product!
  createDeal(data: DealCreateInput!): Deal!
  createUser(data: UserCreateInput!): User!
  createPerson(data: PersonCreateInput!): Person!
  createPipeline(data: PipelineCreateInput!): Pipeline!
  createPicture(data: PictureCreateInput!): Picture!
  createOrganization(data: OrganizationCreateInput!): Organization!
  createStage(data: StageCreateInput!): Stage!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateDeal(data: DealUpdateInput!, where: DealWhereUniqueInput!): Deal
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updatePerson(data: PersonUpdateInput!, where: PersonWhereUniqueInput!): Person
  updatePipeline(data: PipelineUpdateInput!, where: PipelineWhereUniqueInput!): Pipeline
  updatePicture(data: PictureUpdateInput!, where: PictureWhereUniqueInput!): Picture
  updateOrganization(data: OrganizationUpdateInput!, where: OrganizationWhereUniqueInput!): Organization
  updateStage(data: StageUpdateInput!, where: StageWhereUniqueInput!): Stage
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteDeal(where: DealWhereUniqueInput!): Deal
  deleteUser(where: UserWhereUniqueInput!): User
  deletePerson(where: PersonWhereUniqueInput!): Person
  deletePipeline(where: PipelineWhereUniqueInput!): Pipeline
  deletePicture(where: PictureWhereUniqueInput!): Picture
  deleteOrganization(where: OrganizationWhereUniqueInput!): Organization
  deleteStage(where: StageWhereUniqueInput!): Stage
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  upsertDeal(where: DealWhereUniqueInput!, create: DealCreateInput!, update: DealUpdateInput!): Deal!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertPerson(where: PersonWhereUniqueInput!, create: PersonCreateInput!, update: PersonUpdateInput!): Person!
  upsertPipeline(where: PipelineWhereUniqueInput!, create: PipelineCreateInput!, update: PipelineUpdateInput!): Pipeline!
  upsertPicture(where: PictureWhereUniqueInput!, create: PictureCreateInput!, update: PictureUpdateInput!): Picture!
  upsertOrganization(where: OrganizationWhereUniqueInput!, create: OrganizationCreateInput!, update: OrganizationUpdateInput!): Organization!
  upsertStage(where: StageWhereUniqueInput!, create: StageCreateInput!, update: StageUpdateInput!): Stage!
  updateManyProducts(data: ProductUpdateInput!, where: ProductWhereInput): BatchPayload!
  updateManyDeals(data: DealUpdateInput!, where: DealWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyPersons(data: PersonUpdateInput!, where: PersonWhereInput): BatchPayload!
  updateManyPipelines(data: PipelineUpdateInput!, where: PipelineWhereInput): BatchPayload!
  updateManyPictures(data: PictureUpdateInput!, where: PictureWhereInput): BatchPayload!
  updateManyOrganizations(data: OrganizationUpdateInput!, where: OrganizationWhereInput): BatchPayload!
  updateManyStages(data: StageUpdateInput!, where: StageWhereInput): BatchPayload!
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  deleteManyDeals(where: DealWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyPersons(where: PersonWhereInput): BatchPayload!
  deleteManyPipelines(where: PipelineWhereInput): BatchPayload!
  deleteManyPictures(where: PictureWhereInput): BatchPayload!
  deleteManyOrganizations(where: OrganizationWhereInput): BatchPayload!
  deleteManyStages(where: StageWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

enum OrderStatus {
  OPEN
  WON
  LOST
  DELETED
}

type Organization implements Node {
  id: ID!
  name: String!
  owner(where: UserWhereInput): User
  persons(where: PersonWhereInput, orderBy: PersonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Person!]
}

"""A connection to a list of items."""
type OrganizationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [OrganizationEdge]!
  aggregate: AggregateOrganization!
}

input OrganizationCreateInput {
  name: String!
  owner: UserCreateOneWithoutCompanyInput
  persons: PersonCreateManyInput
}

input OrganizationCreateOneInput {
  create: OrganizationCreateInput
  connect: OrganizationWhereUniqueInput
}

input OrganizationCreateOneWithoutOwnerInput {
  create: OrganizationCreateWithoutOwnerInput
  connect: OrganizationWhereUniqueInput
}

input OrganizationCreateWithoutOwnerInput {
  name: String!
  persons: PersonCreateManyInput
}

"""An edge in a connection."""
type OrganizationEdge {
  """The item at the end of the edge."""
  node: Organization!

  """A cursor for use in pagination."""
  cursor: String!
}

enum OrganizationOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type OrganizationPreviousValues {
  id: ID!
  name: String!
}

type OrganizationSubscriptionPayload {
  mutation: MutationType!
  node: Organization
  updatedFields: [String!]
  previousValues: OrganizationPreviousValues
}

input OrganizationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [OrganizationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [OrganizationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [OrganizationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OrganizationWhereInput
}

input OrganizationUpdateDataInput {
  name: String
  owner: UserUpdateOneWithoutCompanyInput
  persons: PersonUpdateManyInput
}

input OrganizationUpdateInput {
  name: String
  owner: UserUpdateOneWithoutCompanyInput
  persons: PersonUpdateManyInput
}

input OrganizationUpdateOneInput {
  create: OrganizationCreateInput
  connect: OrganizationWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: OrganizationUpdateDataInput
  upsert: OrganizationUpsertNestedInput
}

input OrganizationUpdateOneWithoutOwnerInput {
  create: OrganizationCreateWithoutOwnerInput
  connect: OrganizationWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: OrganizationUpdateWithoutOwnerDataInput
  upsert: OrganizationUpsertWithoutOwnerInput
}

input OrganizationUpdateWithoutOwnerDataInput {
  name: String
  persons: PersonUpdateManyInput
}

input OrganizationUpsertNestedInput {
  update: OrganizationUpdateDataInput!
  create: OrganizationCreateInput!
}

input OrganizationUpsertWithoutOwnerInput {
  update: OrganizationUpdateWithoutOwnerDataInput!
  create: OrganizationCreateWithoutOwnerInput!
}

input OrganizationWhereInput {
  """Logical AND on all given filters."""
  AND: [OrganizationWhereInput!]

  """Logical OR on all given filters."""
  OR: [OrganizationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [OrganizationWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  owner: UserWhereInput
  persons_every: PersonWhereInput
  persons_some: PersonWhereInput
  persons_none: PersonWhereInput
}

input OrganizationWhereUniqueInput {
  id: ID
  name: String
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Person implements Node {
  id: ID!
  name: String!
  owner(where: UserWhereInput): User
  email: String
  phone: String
  pictures(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Picture!]
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
  deals(where: DealWhereInput, orderBy: DealOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Deal!]
}

"""A connection to a list of items."""
type PersonConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PersonEdge]!
  aggregate: AggregatePerson!
}

input PersonCreateInput {
  name: String!
  email: String
  phone: String
  owner: UserCreateOneInput
  pictures: PictureCreateManyInput
  products: ProductCreateManyInput
  deals: DealCreateManyWithoutParticipantsInput
}

input PersonCreateManyInput {
  create: [PersonCreateInput!]
  connect: [PersonWhereUniqueInput!]
}

input PersonCreateManyWithoutDealsInput {
  create: [PersonCreateWithoutDealsInput!]
  connect: [PersonWhereUniqueInput!]
}

input PersonCreateWithoutDealsInput {
  name: String!
  email: String
  phone: String
  owner: UserCreateOneInput
  pictures: PictureCreateManyInput
  products: ProductCreateManyInput
}

"""An edge in a connection."""
type PersonEdge {
  """The item at the end of the edge."""
  node: Person!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PersonOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PersonPreviousValues {
  id: ID!
  name: String!
  email: String
  phone: String
}

type PersonSubscriptionPayload {
  mutation: MutationType!
  node: Person
  updatedFields: [String!]
  previousValues: PersonPreviousValues
}

input PersonSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PersonSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PersonSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PersonSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PersonWhereInput
}

input PersonUpdateDataInput {
  name: String
  email: String
  phone: String
  owner: UserUpdateOneInput
  pictures: PictureUpdateManyInput
  products: ProductUpdateManyInput
  deals: DealUpdateManyWithoutParticipantsInput
}

input PersonUpdateInput {
  name: String
  email: String
  phone: String
  owner: UserUpdateOneInput
  pictures: PictureUpdateManyInput
  products: ProductUpdateManyInput
  deals: DealUpdateManyWithoutParticipantsInput
}

input PersonUpdateManyInput {
  create: [PersonCreateInput!]
  connect: [PersonWhereUniqueInput!]
  disconnect: [PersonWhereUniqueInput!]
  delete: [PersonWhereUniqueInput!]
  update: [PersonUpdateWithWhereUniqueNestedInput!]
  upsert: [PersonUpsertWithWhereUniqueNestedInput!]
}

input PersonUpdateManyWithoutDealsInput {
  create: [PersonCreateWithoutDealsInput!]
  connect: [PersonWhereUniqueInput!]
  disconnect: [PersonWhereUniqueInput!]
  delete: [PersonWhereUniqueInput!]
  update: [PersonUpdateWithWhereUniqueWithoutDealsInput!]
  upsert: [PersonUpsertWithWhereUniqueWithoutDealsInput!]
}

input PersonUpdateWithoutDealsDataInput {
  name: String
  email: String
  phone: String
  owner: UserUpdateOneInput
  pictures: PictureUpdateManyInput
  products: ProductUpdateManyInput
}

input PersonUpdateWithWhereUniqueNestedInput {
  where: PersonWhereUniqueInput!
  data: PersonUpdateDataInput!
}

input PersonUpdateWithWhereUniqueWithoutDealsInput {
  where: PersonWhereUniqueInput!
  data: PersonUpdateWithoutDealsDataInput!
}

input PersonUpsertWithWhereUniqueNestedInput {
  where: PersonWhereUniqueInput!
  update: PersonUpdateDataInput!
  create: PersonCreateInput!
}

input PersonUpsertWithWhereUniqueWithoutDealsInput {
  where: PersonWhereUniqueInput!
  update: PersonUpdateWithoutDealsDataInput!
  create: PersonCreateWithoutDealsInput!
}

input PersonWhereInput {
  """Logical AND on all given filters."""
  AND: [PersonWhereInput!]

  """Logical OR on all given filters."""
  OR: [PersonWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PersonWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  phone: String

  """All values that are not equal to given value."""
  phone_not: String

  """All values that are contained in given list."""
  phone_in: [String!]

  """All values that are not contained in given list."""
  phone_not_in: [String!]

  """All values less than the given value."""
  phone_lt: String

  """All values less than or equal the given value."""
  phone_lte: String

  """All values greater than the given value."""
  phone_gt: String

  """All values greater than or equal the given value."""
  phone_gte: String

  """All values containing the given string."""
  phone_contains: String

  """All values not containing the given string."""
  phone_not_contains: String

  """All values starting with the given string."""
  phone_starts_with: String

  """All values not starting with the given string."""
  phone_not_starts_with: String

  """All values ending with the given string."""
  phone_ends_with: String

  """All values not ending with the given string."""
  phone_not_ends_with: String
  owner: UserWhereInput
  pictures_every: PictureWhereInput
  pictures_some: PictureWhereInput
  pictures_none: PictureWhereInput
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
  deals_every: DealWhereInput
  deals_some: DealWhereInput
  deals_none: DealWhereInput
}

input PersonWhereUniqueInput {
  id: ID
  name: String
}

type Picture implements Node {
  id: ID!
  file: String!
}

"""A connection to a list of items."""
type PictureConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PictureEdge]!
  aggregate: AggregatePicture!
}

input PictureCreateInput {
  file: String!
}

input PictureCreateManyInput {
  create: [PictureCreateInput!]
  connect: [PictureWhereUniqueInput!]
}

"""An edge in a connection."""
type PictureEdge {
  """The item at the end of the edge."""
  node: Picture!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PictureOrderByInput {
  id_ASC
  id_DESC
  file_ASC
  file_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PicturePreviousValues {
  id: ID!
  file: String!
}

type PictureSubscriptionPayload {
  mutation: MutationType!
  node: Picture
  updatedFields: [String!]
  previousValues: PicturePreviousValues
}

input PictureSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PictureSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PictureSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PictureSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PictureWhereInput
}

input PictureUpdateDataInput {
  file: String
}

input PictureUpdateInput {
  file: String
}

input PictureUpdateManyInput {
  create: [PictureCreateInput!]
  connect: [PictureWhereUniqueInput!]
  disconnect: [PictureWhereUniqueInput!]
  delete: [PictureWhereUniqueInput!]
  update: [PictureUpdateWithWhereUniqueNestedInput!]
  upsert: [PictureUpsertWithWhereUniqueNestedInput!]
}

input PictureUpdateWithWhereUniqueNestedInput {
  where: PictureWhereUniqueInput!
  data: PictureUpdateDataInput!
}

input PictureUpsertWithWhereUniqueNestedInput {
  where: PictureWhereUniqueInput!
  update: PictureUpdateDataInput!
  create: PictureCreateInput!
}

input PictureWhereInput {
  """Logical AND on all given filters."""
  AND: [PictureWhereInput!]

  """Logical OR on all given filters."""
  OR: [PictureWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PictureWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  file: String

  """All values that are not equal to given value."""
  file_not: String

  """All values that are contained in given list."""
  file_in: [String!]

  """All values that are not contained in given list."""
  file_not_in: [String!]

  """All values less than the given value."""
  file_lt: String

  """All values less than or equal the given value."""
  file_lte: String

  """All values greater than the given value."""
  file_gt: String

  """All values greater than or equal the given value."""
  file_gte: String

  """All values containing the given string."""
  file_contains: String

  """All values not containing the given string."""
  file_not_contains: String

  """All values starting with the given string."""
  file_starts_with: String

  """All values not starting with the given string."""
  file_not_starts_with: String

  """All values ending with the given string."""
  file_ends_with: String

  """All values not ending with the given string."""
  file_not_ends_with: String
}

input PictureWhereUniqueInput {
  id: ID
}

type Pipeline implements Node {
  id: ID!
  name: String!
  order_nr: String
  deal_probability: Probability
  deals(where: DealWhereInput, orderBy: DealOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Deal!]
}

"""A connection to a list of items."""
type PipelineConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PipelineEdge]!
  aggregate: AggregatePipeline!
}

input PipelineCreateInput {
  name: String!
  order_nr: String
  deal_probability: Probability
  deals: DealCreateManyInput
}

input PipelineCreateOneInput {
  create: PipelineCreateInput
  connect: PipelineWhereUniqueInput
}

"""An edge in a connection."""
type PipelineEdge {
  """The item at the end of the edge."""
  node: Pipeline!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PipelineOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  order_nr_ASC
  order_nr_DESC
  deal_probability_ASC
  deal_probability_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PipelinePreviousValues {
  id: ID!
  name: String!
  order_nr: String
  deal_probability: Probability
}

type PipelineSubscriptionPayload {
  mutation: MutationType!
  node: Pipeline
  updatedFields: [String!]
  previousValues: PipelinePreviousValues
}

input PipelineSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PipelineSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PipelineSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PipelineSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PipelineWhereInput
}

input PipelineUpdateDataInput {
  name: String
  order_nr: String
  deal_probability: Probability
  deals: DealUpdateManyInput
}

input PipelineUpdateInput {
  name: String
  order_nr: String
  deal_probability: Probability
  deals: DealUpdateManyInput
}

input PipelineUpdateOneInput {
  create: PipelineCreateInput
  connect: PipelineWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PipelineUpdateDataInput
  upsert: PipelineUpsertNestedInput
}

input PipelineUpsertNestedInput {
  update: PipelineUpdateDataInput!
  create: PipelineCreateInput!
}

input PipelineWhereInput {
  """Logical AND on all given filters."""
  AND: [PipelineWhereInput!]

  """Logical OR on all given filters."""
  OR: [PipelineWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PipelineWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  order_nr: String

  """All values that are not equal to given value."""
  order_nr_not: String

  """All values that are contained in given list."""
  order_nr_in: [String!]

  """All values that are not contained in given list."""
  order_nr_not_in: [String!]

  """All values less than the given value."""
  order_nr_lt: String

  """All values less than or equal the given value."""
  order_nr_lte: String

  """All values greater than the given value."""
  order_nr_gt: String

  """All values greater than or equal the given value."""
  order_nr_gte: String

  """All values containing the given string."""
  order_nr_contains: String

  """All values not containing the given string."""
  order_nr_not_contains: String

  """All values starting with the given string."""
  order_nr_starts_with: String

  """All values not starting with the given string."""
  order_nr_not_starts_with: String

  """All values ending with the given string."""
  order_nr_ends_with: String

  """All values not ending with the given string."""
  order_nr_not_ends_with: String
  deal_probability: Probability

  """All values that are not equal to given value."""
  deal_probability_not: Probability

  """All values that are contained in given list."""
  deal_probability_in: [Probability!]

  """All values that are not contained in given list."""
  deal_probability_not_in: [Probability!]
  deals_every: DealWhereInput
  deals_some: DealWhereInput
  deals_none: DealWhereInput
}

input PipelineWhereUniqueInput {
  id: ID
  name: String
}

enum Probability {
  DISABLE
  ENABLE
}

type Product implements Node {
  id: ID!
  name: String!
  unit: String
  code: String
  owner(where: UserWhereInput): User
  deals(where: DealWhereInput, orderBy: DealOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Deal!]
}

"""A connection to a list of items."""
type ProductConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  name: String!
  unit: String
  code: String
  owner: UserCreateOneInput
  deals: DealCreateManyWithoutProductsInput
}

input ProductCreateManyInput {
  create: [ProductCreateInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateManyWithoutDealsInput {
  create: [ProductCreateWithoutDealsInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateWithoutDealsInput {
  name: String!
  unit: String
  code: String
  owner: UserCreateOneInput
}

"""An edge in a connection."""
type ProductEdge {
  """The item at the end of the edge."""
  node: Product!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  unit_ASC
  unit_DESC
  code_ASC
  code_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ProductPreviousValues {
  id: ID!
  name: String!
  unit: String
  code: String
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ProductSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ProductSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ProductSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
}

input ProductUpdateDataInput {
  name: String
  unit: String
  code: String
  owner: UserUpdateOneInput
  deals: DealUpdateManyWithoutProductsInput
}

input ProductUpdateInput {
  name: String
  unit: String
  code: String
  owner: UserUpdateOneInput
  deals: DealUpdateManyWithoutProductsInput
}

input ProductUpdateManyInput {
  create: [ProductCreateInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  delete: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueNestedInput!]
  upsert: [ProductUpsertWithWhereUniqueNestedInput!]
}

input ProductUpdateManyWithoutDealsInput {
  create: [ProductCreateWithoutDealsInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  delete: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueWithoutDealsInput!]
  upsert: [ProductUpsertWithWhereUniqueWithoutDealsInput!]
}

input ProductUpdateWithoutDealsDataInput {
  name: String
  unit: String
  code: String
  owner: UserUpdateOneInput
}

input ProductUpdateWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateDataInput!
}

input ProductUpdateWithWhereUniqueWithoutDealsInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutDealsDataInput!
}

input ProductUpsertWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateDataInput!
  create: ProductCreateInput!
}

input ProductUpsertWithWhereUniqueWithoutDealsInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutDealsDataInput!
  create: ProductCreateWithoutDealsInput!
}

input ProductWhereInput {
  """Logical AND on all given filters."""
  AND: [ProductWhereInput!]

  """Logical OR on all given filters."""
  OR: [ProductWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ProductWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  unit: String

  """All values that are not equal to given value."""
  unit_not: String

  """All values that are contained in given list."""
  unit_in: [String!]

  """All values that are not contained in given list."""
  unit_not_in: [String!]

  """All values less than the given value."""
  unit_lt: String

  """All values less than or equal the given value."""
  unit_lte: String

  """All values greater than the given value."""
  unit_gt: String

  """All values greater than or equal the given value."""
  unit_gte: String

  """All values containing the given string."""
  unit_contains: String

  """All values not containing the given string."""
  unit_not_contains: String

  """All values starting with the given string."""
  unit_starts_with: String

  """All values not starting with the given string."""
  unit_not_starts_with: String

  """All values ending with the given string."""
  unit_ends_with: String

  """All values not ending with the given string."""
  unit_not_ends_with: String
  code: String

  """All values that are not equal to given value."""
  code_not: String

  """All values that are contained in given list."""
  code_in: [String!]

  """All values that are not contained in given list."""
  code_not_in: [String!]

  """All values less than the given value."""
  code_lt: String

  """All values less than or equal the given value."""
  code_lte: String

  """All values greater than the given value."""
  code_gt: String

  """All values greater than or equal the given value."""
  code_gte: String

  """All values containing the given string."""
  code_contains: String

  """All values not containing the given string."""
  code_not_contains: String

  """All values starting with the given string."""
  code_starts_with: String

  """All values not starting with the given string."""
  code_not_starts_with: String

  """All values ending with the given string."""
  code_ends_with: String

  """All values not ending with the given string."""
  code_not_ends_with: String
  owner: UserWhereInput
  deals_every: DealWhereInput
  deals_some: DealWhereInput
  deals_none: DealWhereInput
}

input ProductWhereUniqueInput {
  id: ID
  name: String
}

type Query {
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  deals(where: DealWhereInput, orderBy: DealOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Deal]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  persons(where: PersonWhereInput, orderBy: PersonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Person]!
  pipelines(where: PipelineWhereInput, orderBy: PipelineOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Pipeline]!
  pictures(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Picture]!
  organizations(where: OrganizationWhereInput, orderBy: OrganizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Organization]!
  stages(where: StageWhereInput, orderBy: StageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Stage]!
  product(where: ProductWhereUniqueInput!): Product
  deal(where: DealWhereUniqueInput!): Deal
  user(where: UserWhereUniqueInput!): User
  person(where: PersonWhereUniqueInput!): Person
  pipeline(where: PipelineWhereUniqueInput!): Pipeline
  picture(where: PictureWhereUniqueInput!): Picture
  organization(where: OrganizationWhereUniqueInput!): Organization
  stage(where: StageWhereUniqueInput!): Stage
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  dealsConnection(where: DealWhereInput, orderBy: DealOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DealConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  personsConnection(where: PersonWhereInput, orderBy: PersonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PersonConnection!
  pipelinesConnection(where: PipelineWhereInput, orderBy: PipelineOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PipelineConnection!
  picturesConnection(where: PictureWhereInput, orderBy: PictureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PictureConnection!
  organizationsConnection(where: OrganizationWhereInput, orderBy: OrganizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrganizationConnection!
  stagesConnection(where: StageWhereInput, orderBy: StageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StageConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

enum Role {
  USER
  PERSON
}

type Stage implements Node {
  id: ID!
  name: String!
  pipeline(where: PipelineWhereInput): Pipeline
  order_nr: String
  deal_probability: Probability
}

"""A connection to a list of items."""
type StageConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [StageEdge]!
  aggregate: AggregateStage!
}

input StageCreateInput {
  name: String!
  order_nr: String
  deal_probability: Probability
  pipeline: PipelineCreateOneInput
}

input StageCreateOneInput {
  create: StageCreateInput
  connect: StageWhereUniqueInput
}

"""An edge in a connection."""
type StageEdge {
  """The item at the end of the edge."""
  node: Stage!

  """A cursor for use in pagination."""
  cursor: String!
}

enum StageOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  order_nr_ASC
  order_nr_DESC
  deal_probability_ASC
  deal_probability_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type StagePreviousValues {
  id: ID!
  name: String!
  order_nr: String
  deal_probability: Probability
}

type StageSubscriptionPayload {
  mutation: MutationType!
  node: Stage
  updatedFields: [String!]
  previousValues: StagePreviousValues
}

input StageSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [StageSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [StageSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StageSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: StageWhereInput
}

input StageUpdateDataInput {
  name: String
  order_nr: String
  deal_probability: Probability
  pipeline: PipelineUpdateOneInput
}

input StageUpdateInput {
  name: String
  order_nr: String
  deal_probability: Probability
  pipeline: PipelineUpdateOneInput
}

input StageUpdateOneInput {
  create: StageCreateInput
  connect: StageWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: StageUpdateDataInput
  upsert: StageUpsertNestedInput
}

input StageUpsertNestedInput {
  update: StageUpdateDataInput!
  create: StageCreateInput!
}

input StageWhereInput {
  """Logical AND on all given filters."""
  AND: [StageWhereInput!]

  """Logical OR on all given filters."""
  OR: [StageWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [StageWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  order_nr: String

  """All values that are not equal to given value."""
  order_nr_not: String

  """All values that are contained in given list."""
  order_nr_in: [String!]

  """All values that are not contained in given list."""
  order_nr_not_in: [String!]

  """All values less than the given value."""
  order_nr_lt: String

  """All values less than or equal the given value."""
  order_nr_lte: String

  """All values greater than the given value."""
  order_nr_gt: String

  """All values greater than or equal the given value."""
  order_nr_gte: String

  """All values containing the given string."""
  order_nr_contains: String

  """All values not containing the given string."""
  order_nr_not_contains: String

  """All values starting with the given string."""
  order_nr_starts_with: String

  """All values not starting with the given string."""
  order_nr_not_starts_with: String

  """All values ending with the given string."""
  order_nr_ends_with: String

  """All values not ending with the given string."""
  order_nr_not_ends_with: String
  deal_probability: Probability

  """All values that are not equal to given value."""
  deal_probability_not: Probability

  """All values that are contained in given list."""
  deal_probability_in: [Probability!]

  """All values that are not contained in given list."""
  deal_probability_not_in: [Probability!]
  pipeline: PipelineWhereInput
}

input StageWhereUniqueInput {
  id: ID
  name: String
}

type Subscription {
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  deal(where: DealSubscriptionWhereInput): DealSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  person(where: PersonSubscriptionWhereInput): PersonSubscriptionPayload
  pipeline(where: PipelineSubscriptionWhereInput): PipelineSubscriptionPayload
  picture(where: PictureSubscriptionWhereInput): PictureSubscriptionPayload
  organization(where: OrganizationSubscriptionWhereInput): OrganizationSubscriptionPayload
  stage(where: StageSubscriptionWhereInput): StageSubscriptionPayload
}

type User implements Node {
  id: ID!
  name: String!
  email: String!
  company(where: OrganizationWhereInput): Organization
  password: String!
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
  company: OrganizationCreateOneWithoutOwnerInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutCompanyInput {
  create: UserCreateWithoutCompanyInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCompanyInput {
  name: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  active_flag_ASC
  active_flag_DESC
  role_ASC
  role_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  name: String
  email: String
  password: String
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
  company: OrganizationUpdateOneWithoutOwnerInput
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
  company: OrganizationUpdateOneWithoutOwnerInput
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneWithoutCompanyInput {
  create: UserCreateWithoutCompanyInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutCompanyDataInput
  upsert: UserUpsertWithoutCompanyInput
}

input UserUpdateWithoutCompanyDataInput {
  name: String
  email: String
  password: String
  firstName: String
  lastName: String
  active_flag: Active
  role: Role
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutCompanyInput {
  update: UserUpdateWithoutCompanyDataInput!
  create: UserCreateWithoutCompanyInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  firstName: String

  """All values that are not equal to given value."""
  firstName_not: String

  """All values that are contained in given list."""
  firstName_in: [String!]

  """All values that are not contained in given list."""
  firstName_not_in: [String!]

  """All values less than the given value."""
  firstName_lt: String

  """All values less than or equal the given value."""
  firstName_lte: String

  """All values greater than the given value."""
  firstName_gt: String

  """All values greater than or equal the given value."""
  firstName_gte: String

  """All values containing the given string."""
  firstName_contains: String

  """All values not containing the given string."""
  firstName_not_contains: String

  """All values starting with the given string."""
  firstName_starts_with: String

  """All values not starting with the given string."""
  firstName_not_starts_with: String

  """All values ending with the given string."""
  firstName_ends_with: String

  """All values not ending with the given string."""
  firstName_not_ends_with: String
  lastName: String

  """All values that are not equal to given value."""
  lastName_not: String

  """All values that are contained in given list."""
  lastName_in: [String!]

  """All values that are not contained in given list."""
  lastName_not_in: [String!]

  """All values less than the given value."""
  lastName_lt: String

  """All values less than or equal the given value."""
  lastName_lte: String

  """All values greater than the given value."""
  lastName_gt: String

  """All values greater than or equal the given value."""
  lastName_gte: String

  """All values containing the given string."""
  lastName_contains: String

  """All values not containing the given string."""
  lastName_not_contains: String

  """All values starting with the given string."""
  lastName_starts_with: String

  """All values not starting with the given string."""
  lastName_not_starts_with: String

  """All values ending with the given string."""
  lastName_ends_with: String

  """All values not ending with the given string."""
  lastName_not_ends_with: String
  active_flag: Active

  """All values that are not equal to given value."""
  active_flag_not: Active

  """All values that are contained in given list."""
  active_flag_in: [Active!]

  """All values that are not contained in given list."""
  active_flag_not_in: [Active!]
  role: Role

  """All values that are not equal to given value."""
  role_not: Role

  """All values that are contained in given list."""
  role_in: [Role!]

  """All values that are not contained in given list."""
  role_not_in: [Role!]
  company: OrganizationWhereInput
}

input UserWhereUniqueInput {
  id: ID
  name: String
  email: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'firstName_ASC' |
  'firstName_DESC' |
  'lastName_ASC' |
  'lastName_DESC' |
  'active_flag_ASC' |
  'active_flag_DESC' |
  'role_ASC' |
  'role_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ProductOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'unit_ASC' |
  'unit_DESC' |
  'code_ASC' |
  'code_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type DealOrderByInput =   'id_ASC' |
  'id_DESC' |
  'title_ASC' |
  'title_DESC' |
  'value_ASC' |
  'value_DESC' |
  'currency_ASC' |
  'currency_DESC' |
  'status_ASC' |
  'status_DESC' |
  'probability_ASC' |
  'probability_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type StageOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'order_nr_ASC' |
  'order_nr_DESC' |
  'deal_probability_ASC' |
  'deal_probability_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type PersonOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'email_ASC' |
  'email_DESC' |
  'phone_ASC' |
  'phone_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Probability =   'DISABLE' |
  'ENABLE'

export type PictureOrderByInput =   'id_ASC' |
  'id_DESC' |
  'file_ASC' |
  'file_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OrderStatus =   'OPEN' |
  'WON' |
  'LOST' |
  'DELETED'

export type Active =   'ACTIVATED' |
  'NOTACTIVATED'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type PipelineOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'order_nr_ASC' |
  'order_nr_DESC' |
  'deal_probability_ASC' |
  'deal_probability_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type OrganizationOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Role =   'USER' |
  'PERSON'

export interface DealCreateInput {
  title: String
  value: String
  currency: String
  status?: OrderStatus
  probability?: String
  owner?: UserCreateOneInput
  org?: OrganizationCreateOneInput
  participants?: PersonCreateManyWithoutDealsInput
  products?: ProductCreateManyWithoutDealsInput
  stage?: StageCreateOneInput
}

export interface ProductWhereInput {
  AND?: ProductWhereInput[] | ProductWhereInput
  OR?: ProductWhereInput[] | ProductWhereInput
  NOT?: ProductWhereInput[] | ProductWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  unit?: String
  unit_not?: String
  unit_in?: String[] | String
  unit_not_in?: String[] | String
  unit_lt?: String
  unit_lte?: String
  unit_gt?: String
  unit_gte?: String
  unit_contains?: String
  unit_not_contains?: String
  unit_starts_with?: String
  unit_not_starts_with?: String
  unit_ends_with?: String
  unit_not_ends_with?: String
  code?: String
  code_not?: String
  code_in?: String[] | String
  code_not_in?: String[] | String
  code_lt?: String
  code_lte?: String
  code_gt?: String
  code_gte?: String
  code_contains?: String
  code_not_contains?: String
  code_starts_with?: String
  code_not_starts_with?: String
  code_ends_with?: String
  code_not_ends_with?: String
  owner?: UserWhereInput
  deals_every?: DealWhereInput
  deals_some?: DealWhereInput
  deals_none?: DealWhereInput
}

export interface OrganizationCreateWithoutOwnerInput {
  name: String
  persons?: PersonCreateManyInput
}

export interface PipelineUpdateOneInput {
  create?: PipelineCreateInput
  connect?: PipelineWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: PipelineUpdateDataInput
  upsert?: PipelineUpsertNestedInput
}

export interface PersonCreateManyInput {
  create?: PersonCreateInput[] | PersonCreateInput
  connect?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
}

export interface OrganizationUpdateOneWithoutOwnerInput {
  create?: OrganizationCreateWithoutOwnerInput
  connect?: OrganizationWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: OrganizationUpdateWithoutOwnerDataInput
  upsert?: OrganizationUpsertWithoutOwnerInput
}

export interface PersonCreateInput {
  name: String
  email?: String
  phone?: String
  owner?: UserCreateOneInput
  pictures?: PictureCreateManyInput
  products?: ProductCreateManyInput
  deals?: DealCreateManyWithoutParticipantsInput
}

export interface StageSubscriptionWhereInput {
  AND?: StageSubscriptionWhereInput[] | StageSubscriptionWhereInput
  OR?: StageSubscriptionWhereInput[] | StageSubscriptionWhereInput
  NOT?: StageSubscriptionWhereInput[] | StageSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: StageWhereInput
}

export interface PictureCreateManyInput {
  create?: PictureCreateInput[] | PictureCreateInput
  connect?: PictureWhereUniqueInput[] | PictureWhereUniqueInput
}

export interface PipelineWhereInput {
  AND?: PipelineWhereInput[] | PipelineWhereInput
  OR?: PipelineWhereInput[] | PipelineWhereInput
  NOT?: PipelineWhereInput[] | PipelineWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  order_nr?: String
  order_nr_not?: String
  order_nr_in?: String[] | String
  order_nr_not_in?: String[] | String
  order_nr_lt?: String
  order_nr_lte?: String
  order_nr_gt?: String
  order_nr_gte?: String
  order_nr_contains?: String
  order_nr_not_contains?: String
  order_nr_starts_with?: String
  order_nr_not_starts_with?: String
  order_nr_ends_with?: String
  order_nr_not_ends_with?: String
  deal_probability?: Probability
  deal_probability_not?: Probability
  deal_probability_in?: Probability[] | Probability
  deal_probability_not_in?: Probability[] | Probability
  deals_every?: DealWhereInput
  deals_some?: DealWhereInput
  deals_none?: DealWhereInput
}

export interface PictureCreateInput {
  file: String
}

export interface StageWhereInput {
  AND?: StageWhereInput[] | StageWhereInput
  OR?: StageWhereInput[] | StageWhereInput
  NOT?: StageWhereInput[] | StageWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  order_nr?: String
  order_nr_not?: String
  order_nr_in?: String[] | String
  order_nr_not_in?: String[] | String
  order_nr_lt?: String
  order_nr_lte?: String
  order_nr_gt?: String
  order_nr_gte?: String
  order_nr_contains?: String
  order_nr_not_contains?: String
  order_nr_starts_with?: String
  order_nr_not_starts_with?: String
  order_nr_ends_with?: String
  order_nr_not_ends_with?: String
  deal_probability?: Probability
  deal_probability_not?: Probability
  deal_probability_in?: Probability[] | Probability
  deal_probability_not_in?: Probability[] | Probability
  pipeline?: PipelineWhereInput
}

export interface ProductCreateManyInput {
  create?: ProductCreateInput[] | ProductCreateInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
}

export interface DealWhereInput {
  AND?: DealWhereInput[] | DealWhereInput
  OR?: DealWhereInput[] | DealWhereInput
  NOT?: DealWhereInput[] | DealWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  value?: String
  value_not?: String
  value_in?: String[] | String
  value_not_in?: String[] | String
  value_lt?: String
  value_lte?: String
  value_gt?: String
  value_gte?: String
  value_contains?: String
  value_not_contains?: String
  value_starts_with?: String
  value_not_starts_with?: String
  value_ends_with?: String
  value_not_ends_with?: String
  currency?: String
  currency_not?: String
  currency_in?: String[] | String
  currency_not_in?: String[] | String
  currency_lt?: String
  currency_lte?: String
  currency_gt?: String
  currency_gte?: String
  currency_contains?: String
  currency_not_contains?: String
  currency_starts_with?: String
  currency_not_starts_with?: String
  currency_ends_with?: String
  currency_not_ends_with?: String
  status?: OrderStatus
  status_not?: OrderStatus
  status_in?: OrderStatus[] | OrderStatus
  status_not_in?: OrderStatus[] | OrderStatus
  probability?: String
  probability_not?: String
  probability_in?: String[] | String
  probability_not_in?: String[] | String
  probability_lt?: String
  probability_lte?: String
  probability_gt?: String
  probability_gte?: String
  probability_contains?: String
  probability_not_contains?: String
  probability_starts_with?: String
  probability_not_starts_with?: String
  probability_ends_with?: String
  probability_not_ends_with?: String
  owner?: UserWhereInput
  org?: OrganizationWhereInput
  participants_every?: PersonWhereInput
  participants_some?: PersonWhereInput
  participants_none?: PersonWhereInput
  products_every?: ProductWhereInput
  products_some?: ProductWhereInput
  products_none?: ProductWhereInput
  stage?: StageWhereInput
}

export interface DealCreateManyWithoutParticipantsInput {
  create?: DealCreateWithoutParticipantsInput[] | DealCreateWithoutParticipantsInput
  connect?: DealWhereUniqueInput[] | DealWhereUniqueInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface DealCreateWithoutParticipantsInput {
  title: String
  value: String
  currency: String
  status?: OrderStatus
  probability?: String
  owner?: UserCreateOneInput
  org?: OrganizationCreateOneInput
  products?: ProductCreateManyWithoutDealsInput
  stage?: StageCreateOneInput
}

export interface PictureWhereInput {
  AND?: PictureWhereInput[] | PictureWhereInput
  OR?: PictureWhereInput[] | PictureWhereInput
  NOT?: PictureWhereInput[] | PictureWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  file?: String
  file_not?: String
  file_in?: String[] | String
  file_not_in?: String[] | String
  file_lt?: String
  file_lte?: String
  file_gt?: String
  file_gte?: String
  file_contains?: String
  file_not_contains?: String
  file_starts_with?: String
  file_not_starts_with?: String
  file_ends_with?: String
  file_not_ends_with?: String
}

export interface OrganizationCreateOneInput {
  create?: OrganizationCreateInput
  connect?: OrganizationWhereUniqueInput
}

export interface OrganizationWhereInput {
  AND?: OrganizationWhereInput[] | OrganizationWhereInput
  OR?: OrganizationWhereInput[] | OrganizationWhereInput
  NOT?: OrganizationWhereInput[] | OrganizationWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  owner?: UserWhereInput
  persons_every?: PersonWhereInput
  persons_some?: PersonWhereInput
  persons_none?: PersonWhereInput
}

export interface OrganizationCreateInput {
  name: String
  owner?: UserCreateOneWithoutCompanyInput
  persons?: PersonCreateManyInput
}

export interface ProductWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface UserCreateOneWithoutCompanyInput {
  create?: UserCreateWithoutCompanyInput
  connect?: UserWhereUniqueInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  name?: String
  email?: String
}

export interface UserCreateWithoutCompanyInput {
  name: String
  email: String
  password: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
}

export interface PipelineWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface ProductCreateManyWithoutDealsInput {
  create?: ProductCreateWithoutDealsInput[] | ProductCreateWithoutDealsInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
}

export interface OrganizationWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface ProductCreateWithoutDealsInput {
  name: String
  unit?: String
  code?: String
  owner?: UserCreateOneInput
}

export interface ProductSubscriptionWhereInput {
  AND?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  OR?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  NOT?: ProductSubscriptionWhereInput[] | ProductSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProductWhereInput
}

export interface StageCreateOneInput {
  create?: StageCreateInput
  connect?: StageWhereUniqueInput
}

export interface OrganizationUpdateInput {
  name?: String
  owner?: UserUpdateOneWithoutCompanyInput
  persons?: PersonUpdateManyInput
}

export interface StageCreateInput {
  name: String
  order_nr?: String
  deal_probability?: Probability
  pipeline?: PipelineCreateOneInput
}

export interface PipelineUpdateInput {
  name?: String
  order_nr?: String
  deal_probability?: Probability
  deals?: DealUpdateManyInput
}

export interface PipelineCreateOneInput {
  create?: PipelineCreateInput
  connect?: PipelineWhereUniqueInput
}

export interface UserUpdateInput {
  name?: String
  email?: String
  password?: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
  company?: OrganizationUpdateOneWithoutOwnerInput
}

export interface PipelineCreateInput {
  name: String
  order_nr?: String
  deal_probability?: Probability
  deals?: DealCreateManyInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface DealCreateManyInput {
  create?: DealCreateInput[] | DealCreateInput
  connect?: DealWhereUniqueInput[] | DealWhereUniqueInput
}

export interface PersonUpsertWithWhereUniqueNestedInput {
  where: PersonWhereUniqueInput
  update: PersonUpdateDataInput
  create: PersonCreateInput
}

export interface DealUpdateManyInput {
  create?: DealCreateInput[] | DealCreateInput
  connect?: DealWhereUniqueInput[] | DealWhereUniqueInput
  disconnect?: DealWhereUniqueInput[] | DealWhereUniqueInput
  delete?: DealWhereUniqueInput[] | DealWhereUniqueInput
  update?: DealUpdateWithWhereUniqueNestedInput[] | DealUpdateWithWhereUniqueNestedInput
  upsert?: DealUpsertWithWhereUniqueNestedInput[] | DealUpsertWithWhereUniqueNestedInput
}

export interface DealUpdateWithoutParticipantsDataInput {
  title?: String
  value?: String
  currency?: String
  status?: OrderStatus
  probability?: String
  owner?: UserUpdateOneInput
  org?: OrganizationUpdateOneInput
  products?: ProductUpdateManyWithoutDealsInput
  stage?: StageUpdateOneInput
}

export interface PersonCreateManyWithoutDealsInput {
  create?: PersonCreateWithoutDealsInput[] | PersonCreateWithoutDealsInput
  connect?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
}

export interface DealUpdateManyWithoutParticipantsInput {
  create?: DealCreateWithoutParticipantsInput[] | DealCreateWithoutParticipantsInput
  connect?: DealWhereUniqueInput[] | DealWhereUniqueInput
  disconnect?: DealWhereUniqueInput[] | DealWhereUniqueInput
  delete?: DealWhereUniqueInput[] | DealWhereUniqueInput
  update?: DealUpdateWithWhereUniqueWithoutParticipantsInput[] | DealUpdateWithWhereUniqueWithoutParticipantsInput
  upsert?: DealUpsertWithWhereUniqueWithoutParticipantsInput[] | DealUpsertWithWhereUniqueWithoutParticipantsInput
}

export interface PersonCreateWithoutDealsInput {
  name: String
  email?: String
  phone?: String
  owner?: UserCreateOneInput
  pictures?: PictureCreateManyInput
  products?: ProductCreateManyInput
}

export interface DealUpsertWithWhereUniqueWithoutProductsInput {
  where: DealWhereUniqueInput
  update: DealUpdateWithoutProductsDataInput
  create: DealCreateWithoutProductsInput
}

export interface DealCreateManyWithoutProductsInput {
  create?: DealCreateWithoutProductsInput[] | DealCreateWithoutProductsInput
  connect?: DealWhereUniqueInput[] | DealWhereUniqueInput
}

export interface PipelineUpsertNestedInput {
  update: PipelineUpdateDataInput
  create: PipelineCreateInput
}

export interface DealCreateWithoutProductsInput {
  title: String
  value: String
  currency: String
  status?: OrderStatus
  probability?: String
  owner?: UserCreateOneInput
  org?: OrganizationCreateOneInput
  participants?: PersonCreateManyWithoutDealsInput
  stage?: StageCreateOneInput
}

export interface ProductUpsertWithWhereUniqueWithoutDealsInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateWithoutDealsDataInput
  create: ProductCreateWithoutDealsInput
}

export interface ProductUpdateInput {
  name?: String
  unit?: String
  code?: String
  owner?: UserUpdateOneInput
  deals?: DealUpdateManyWithoutProductsInput
}

export interface ProductUpdateWithWhereUniqueWithoutDealsInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateWithoutDealsDataInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface DealUpdateDataInput {
  title?: String
  value?: String
  currency?: String
  status?: OrderStatus
  probability?: String
  owner?: UserUpdateOneInput
  org?: OrganizationUpdateOneInput
  participants?: PersonUpdateManyWithoutDealsInput
  products?: ProductUpdateManyWithoutDealsInput
  stage?: StageUpdateOneInput
}

export interface UserUpdateDataInput {
  name?: String
  email?: String
  password?: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
  company?: OrganizationUpdateOneWithoutOwnerInput
}

export interface ProductCreateInput {
  name: String
  unit?: String
  code?: String
  owner?: UserCreateOneInput
  deals?: DealCreateManyWithoutProductsInput
}

export interface PipelineUpdateDataInput {
  name?: String
  order_nr?: String
  deal_probability?: Probability
  deals?: DealUpdateManyInput
}

export interface UserCreateInput {
  name: String
  email: String
  password: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
  company?: OrganizationCreateOneWithoutOwnerInput
}

export interface OrganizationUpdateWithoutOwnerDataInput {
  name?: String
  persons?: PersonUpdateManyInput
}

export interface PictureSubscriptionWhereInput {
  AND?: PictureSubscriptionWhereInput[] | PictureSubscriptionWhereInput
  OR?: PictureSubscriptionWhereInput[] | PictureSubscriptionWhereInput
  NOT?: PictureSubscriptionWhereInput[] | PictureSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PictureWhereInput
}

export interface PersonUpdateManyInput {
  create?: PersonCreateInput[] | PersonCreateInput
  connect?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
  disconnect?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
  delete?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
  update?: PersonUpdateWithWhereUniqueNestedInput[] | PersonUpdateWithWhereUniqueNestedInput
  upsert?: PersonUpsertWithWhereUniqueNestedInput[] | PersonUpsertWithWhereUniqueNestedInput
}

export interface PersonSubscriptionWhereInput {
  AND?: PersonSubscriptionWhereInput[] | PersonSubscriptionWhereInput
  OR?: PersonSubscriptionWhereInput[] | PersonSubscriptionWhereInput
  NOT?: PersonSubscriptionWhereInput[] | PersonSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PersonWhereInput
}

export interface PersonUpdateWithWhereUniqueNestedInput {
  where: PersonWhereUniqueInput
  data: PersonUpdateDataInput
}

export interface PersonWhereInput {
  AND?: PersonWhereInput[] | PersonWhereInput
  OR?: PersonWhereInput[] | PersonWhereInput
  NOT?: PersonWhereInput[] | PersonWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  phone?: String
  phone_not?: String
  phone_in?: String[] | String
  phone_not_in?: String[] | String
  phone_lt?: String
  phone_lte?: String
  phone_gt?: String
  phone_gte?: String
  phone_contains?: String
  phone_not_contains?: String
  phone_starts_with?: String
  phone_not_starts_with?: String
  phone_ends_with?: String
  phone_not_ends_with?: String
  owner?: UserWhereInput
  pictures_every?: PictureWhereInput
  pictures_some?: PictureWhereInput
  pictures_none?: PictureWhereInput
  products_every?: ProductWhereInput
  products_some?: ProductWhereInput
  products_none?: ProductWhereInput
  deals_every?: DealWhereInput
  deals_some?: DealWhereInput
  deals_none?: DealWhereInput
}

export interface PersonUpdateDataInput {
  name?: String
  email?: String
  phone?: String
  owner?: UserUpdateOneInput
  pictures?: PictureUpdateManyInput
  products?: ProductUpdateManyInput
  deals?: DealUpdateManyWithoutParticipantsInput
}

export interface DealWhereUniqueInput {
  id?: ID_Input
  title?: String
}

export interface PictureUpdateManyInput {
  create?: PictureCreateInput[] | PictureCreateInput
  connect?: PictureWhereUniqueInput[] | PictureWhereUniqueInput
  disconnect?: PictureWhereUniqueInput[] | PictureWhereUniqueInput
  delete?: PictureWhereUniqueInput[] | PictureWhereUniqueInput
  update?: PictureUpdateWithWhereUniqueNestedInput[] | PictureUpdateWithWhereUniqueNestedInput
  upsert?: PictureUpsertWithWhereUniqueNestedInput[] | PictureUpsertWithWhereUniqueNestedInput
}

export interface PictureWhereUniqueInput {
  id?: ID_Input
}

export interface PictureUpdateWithWhereUniqueNestedInput {
  where: PictureWhereUniqueInput
  data: PictureUpdateDataInput
}

export interface StageUpdateInput {
  name?: String
  order_nr?: String
  deal_probability?: Probability
  pipeline?: PipelineUpdateOneInput
}

export interface PictureUpdateDataInput {
  file?: String
}

export interface PersonUpdateInput {
  name?: String
  email?: String
  phone?: String
  owner?: UserUpdateOneInput
  pictures?: PictureUpdateManyInput
  products?: ProductUpdateManyInput
  deals?: DealUpdateManyWithoutParticipantsInput
}

export interface PictureUpsertWithWhereUniqueNestedInput {
  where: PictureWhereUniqueInput
  update: PictureUpdateDataInput
  create: PictureCreateInput
}

export interface OrganizationUpsertWithoutOwnerInput {
  update: OrganizationUpdateWithoutOwnerDataInput
  create: OrganizationCreateWithoutOwnerInput
}

export interface ProductUpdateManyInput {
  create?: ProductCreateInput[] | ProductCreateInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  update?: ProductUpdateWithWhereUniqueNestedInput[] | ProductUpdateWithWhereUniqueNestedInput
  upsert?: ProductUpsertWithWhereUniqueNestedInput[] | ProductUpsertWithWhereUniqueNestedInput
}

export interface DealUpdateWithWhereUniqueWithoutParticipantsInput {
  where: DealWhereUniqueInput
  data: DealUpdateWithoutParticipantsDataInput
}

export interface ProductUpdateWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput
  data: ProductUpdateDataInput
}

export interface StageUpsertNestedInput {
  update: StageUpdateDataInput
  create: StageCreateInput
}

export interface ProductUpdateDataInput {
  name?: String
  unit?: String
  code?: String
  owner?: UserUpdateOneInput
  deals?: DealUpdateManyWithoutProductsInput
}

export interface ProductUpdateWithoutDealsDataInput {
  name?: String
  unit?: String
  code?: String
  owner?: UserUpdateOneInput
}

export interface DealUpdateManyWithoutProductsInput {
  create?: DealCreateWithoutProductsInput[] | DealCreateWithoutProductsInput
  connect?: DealWhereUniqueInput[] | DealWhereUniqueInput
  disconnect?: DealWhereUniqueInput[] | DealWhereUniqueInput
  delete?: DealWhereUniqueInput[] | DealWhereUniqueInput
  update?: DealUpdateWithWhereUniqueWithoutProductsInput[] | DealUpdateWithWhereUniqueWithoutProductsInput
  upsert?: DealUpsertWithWhereUniqueWithoutProductsInput[] | DealUpsertWithWhereUniqueWithoutProductsInput
}

export interface DealUpdateWithWhereUniqueNestedInput {
  where: DealWhereUniqueInput
  data: DealUpdateDataInput
}

export interface DealUpdateWithWhereUniqueWithoutProductsInput {
  where: DealWhereUniqueInput
  data: DealUpdateWithoutProductsDataInput
}

export interface OrganizationCreateOneWithoutOwnerInput {
  create?: OrganizationCreateWithoutOwnerInput
  connect?: OrganizationWhereUniqueInput
}

export interface DealUpdateWithoutProductsDataInput {
  title?: String
  value?: String
  currency?: String
  status?: OrderStatus
  probability?: String
  owner?: UserUpdateOneInput
  org?: OrganizationUpdateOneInput
  participants?: PersonUpdateManyWithoutDealsInput
  stage?: StageUpdateOneInput
}

export interface PipelineSubscriptionWhereInput {
  AND?: PipelineSubscriptionWhereInput[] | PipelineSubscriptionWhereInput
  OR?: PipelineSubscriptionWhereInput[] | PipelineSubscriptionWhereInput
  NOT?: PipelineSubscriptionWhereInput[] | PipelineSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PipelineWhereInput
}

export interface OrganizationUpdateOneInput {
  create?: OrganizationCreateInput
  connect?: OrganizationWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: OrganizationUpdateDataInput
  upsert?: OrganizationUpsertNestedInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  firstName?: String
  firstName_not?: String
  firstName_in?: String[] | String
  firstName_not_in?: String[] | String
  firstName_lt?: String
  firstName_lte?: String
  firstName_gt?: String
  firstName_gte?: String
  firstName_contains?: String
  firstName_not_contains?: String
  firstName_starts_with?: String
  firstName_not_starts_with?: String
  firstName_ends_with?: String
  firstName_not_ends_with?: String
  lastName?: String
  lastName_not?: String
  lastName_in?: String[] | String
  lastName_not_in?: String[] | String
  lastName_lt?: String
  lastName_lte?: String
  lastName_gt?: String
  lastName_gte?: String
  lastName_contains?: String
  lastName_not_contains?: String
  lastName_starts_with?: String
  lastName_not_starts_with?: String
  lastName_ends_with?: String
  lastName_not_ends_with?: String
  active_flag?: Active
  active_flag_not?: Active
  active_flag_in?: Active[] | Active
  active_flag_not_in?: Active[] | Active
  role?: Role
  role_not?: Role
  role_in?: Role[] | Role
  role_not_in?: Role[] | Role
  company?: OrganizationWhereInput
}

export interface OrganizationUpdateDataInput {
  name?: String
  owner?: UserUpdateOneWithoutCompanyInput
  persons?: PersonUpdateManyInput
}

export interface StageWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface UserUpdateOneWithoutCompanyInput {
  create?: UserCreateWithoutCompanyInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutCompanyDataInput
  upsert?: UserUpsertWithoutCompanyInput
}

export interface DealUpdateInput {
  title?: String
  value?: String
  currency?: String
  status?: OrderStatus
  probability?: String
  owner?: UserUpdateOneInput
  org?: OrganizationUpdateOneInput
  participants?: PersonUpdateManyWithoutDealsInput
  products?: ProductUpdateManyWithoutDealsInput
  stage?: StageUpdateOneInput
}

export interface UserUpdateWithoutCompanyDataInput {
  name?: String
  email?: String
  password?: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
}

export interface ProductUpsertWithWhereUniqueNestedInput {
  where: ProductWhereUniqueInput
  update: ProductUpdateDataInput
  create: ProductCreateInput
}

export interface UserUpsertWithoutCompanyInput {
  update: UserUpdateWithoutCompanyDataInput
  create: UserCreateWithoutCompanyInput
}

export interface ProductUpdateManyWithoutDealsInput {
  create?: ProductCreateWithoutDealsInput[] | ProductCreateWithoutDealsInput
  connect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  disconnect?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  delete?: ProductWhereUniqueInput[] | ProductWhereUniqueInput
  update?: ProductUpdateWithWhereUniqueWithoutDealsInput[] | ProductUpdateWithWhereUniqueWithoutDealsInput
  upsert?: ProductUpsertWithWhereUniqueWithoutDealsInput[] | ProductUpsertWithWhereUniqueWithoutDealsInput
}

export interface OrganizationUpsertNestedInput {
  update: OrganizationUpdateDataInput
  create: OrganizationCreateInput
}

export interface OrganizationSubscriptionWhereInput {
  AND?: OrganizationSubscriptionWhereInput[] | OrganizationSubscriptionWhereInput
  OR?: OrganizationSubscriptionWhereInput[] | OrganizationSubscriptionWhereInput
  NOT?: OrganizationSubscriptionWhereInput[] | OrganizationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OrganizationWhereInput
}

export interface PersonUpdateManyWithoutDealsInput {
  create?: PersonCreateWithoutDealsInput[] | PersonCreateWithoutDealsInput
  connect?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
  disconnect?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
  delete?: PersonWhereUniqueInput[] | PersonWhereUniqueInput
  update?: PersonUpdateWithWhereUniqueWithoutDealsInput[] | PersonUpdateWithWhereUniqueWithoutDealsInput
  upsert?: PersonUpsertWithWhereUniqueWithoutDealsInput[] | PersonUpsertWithWhereUniqueWithoutDealsInput
}

export interface PersonWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface PersonUpdateWithWhereUniqueWithoutDealsInput {
  where: PersonWhereUniqueInput
  data: PersonUpdateWithoutDealsDataInput
}

export interface DealUpsertWithWhereUniqueWithoutParticipantsInput {
  where: DealWhereUniqueInput
  update: DealUpdateWithoutParticipantsDataInput
  create: DealCreateWithoutParticipantsInput
}

export interface StageUpdateDataInput {
  name?: String
  order_nr?: String
  deal_probability?: Probability
  pipeline?: PipelineUpdateOneInput
}

export interface StageUpdateOneInput {
  create?: StageCreateInput
  connect?: StageWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: StageUpdateDataInput
  upsert?: StageUpsertNestedInput
}

export interface PersonUpsertWithWhereUniqueWithoutDealsInput {
  where: PersonWhereUniqueInput
  update: PersonUpdateWithoutDealsDataInput
  create: PersonCreateWithoutDealsInput
}

export interface PersonUpdateWithoutDealsDataInput {
  name?: String
  email?: String
  phone?: String
  owner?: UserUpdateOneInput
  pictures?: PictureUpdateManyInput
  products?: ProductUpdateManyInput
}

export interface DealUpsertWithWhereUniqueNestedInput {
  where: DealWhereUniqueInput
  update: DealUpdateDataInput
  create: DealCreateInput
}

export interface PictureUpdateInput {
  file?: String
}

export interface DealSubscriptionWhereInput {
  AND?: DealSubscriptionWhereInput[] | DealSubscriptionWhereInput
  OR?: DealSubscriptionWhereInput[] | DealSubscriptionWhereInput
  NOT?: DealSubscriptionWhereInput[] | DealSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: DealWhereInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface StagePreviousValues {
  id: ID_Output
  name: String
  order_nr?: String
  deal_probability?: Probability
}

export interface BatchPayload {
  count: Long
}

export interface Product extends Node {
  id: ID_Output
  name: String
  unit?: String
  code?: String
  owner?: User
  deals?: Deal[]
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface OrganizationSubscriptionPayload {
  mutation: MutationType
  node?: Organization
  updatedFields?: String[]
  previousValues?: OrganizationPreviousValues
}

export interface User extends Node {
  id: ID_Output
  name: String
  email: String
  company?: Organization
  password: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
}

export interface AggregateStage {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface StageEdge {
  node: Stage
  cursor: String
}

export interface AggregateOrganization {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface ProductConnection {
  pageInfo: PageInfo
  edges: ProductEdge[]
  aggregate: AggregateProduct
}

/*
 * A connection to a list of items.

 */
export interface OrganizationConnection {
  pageInfo: PageInfo
  edges: OrganizationEdge[]
  aggregate: AggregateOrganization
}

export interface OrganizationPreviousValues {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface PictureEdge {
  node: Picture
  cursor: String
}

export interface ProductSubscriptionPayload {
  mutation: MutationType
  node?: Product
  updatedFields?: String[]
  previousValues?: ProductPreviousValues
}

export interface AggregatePipeline {
  count: Int
}

export interface ProductPreviousValues {
  id: ID_Output
  name: String
  unit?: String
  code?: String
}

/*
 * A connection to a list of items.

 */
export interface PipelineConnection {
  pageInfo: PageInfo
  edges: PipelineEdge[]
  aggregate: AggregatePipeline
}

export interface Pipeline extends Node {
  id: ID_Output
  name: String
  order_nr?: String
  deal_probability?: Probability
  deals?: Deal[]
}

/*
 * An edge in a connection.

 */
export interface PersonEdge {
  node: Person
  cursor: String
}

export interface DealSubscriptionPayload {
  mutation: MutationType
  node?: Deal
  updatedFields?: String[]
  previousValues?: DealPreviousValues
}

export interface AggregateUser {
  count: Int
}

export interface DealPreviousValues {
  id: ID_Output
  title: String
  value: String
  currency: String
  status?: OrderStatus
  probability?: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface Stage extends Node {
  id: ID_Output
  name: String
  pipeline?: Pipeline
  order_nr?: String
  deal_probability?: Probability
}

/*
 * An edge in a connection.

 */
export interface DealEdge {
  node: Deal
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateProduct {
  count: Int
}

export interface UserPreviousValues {
  id: ID_Output
  name: String
  email: String
  password: String
  firstName?: String
  lastName?: String
  active_flag?: Active
  role?: Role
}

export interface StageSubscriptionPayload {
  mutation: MutationType
  node?: Stage
  updatedFields?: String[]
  previousValues?: StagePreviousValues
}

export interface Deal extends Node {
  id: ID_Output
  title: String
  value: String
  currency: String
  owner?: User
  org?: Organization
  participants?: Person[]
  products?: Product[]
  stage?: Stage
  status?: OrderStatus
  probability?: String
}

/*
 * An edge in a connection.

 */
export interface OrganizationEdge {
  node: Organization
  cursor: String
}

export interface PersonSubscriptionPayload {
  mutation: MutationType
  node?: Person
  updatedFields?: String[]
  previousValues?: PersonPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface PictureConnection {
  pageInfo: PageInfo
  edges: PictureEdge[]
  aggregate: AggregatePicture
}

export interface PersonPreviousValues {
  id: ID_Output
  name: String
  email?: String
  phone?: String
}

export interface AggregatePerson {
  count: Int
}

export interface Picture extends Node {
  id: ID_Output
  file: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface PipelineSubscriptionPayload {
  mutation: MutationType
  node?: Pipeline
  updatedFields?: String[]
  previousValues?: PipelinePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface DealConnection {
  pageInfo: PageInfo
  edges: DealEdge[]
  aggregate: AggregateDeal
}

export interface PipelinePreviousValues {
  id: ID_Output
  name: String
  order_nr?: String
  deal_probability?: Probability
}

/*
 * A connection to a list of items.

 */
export interface StageConnection {
  pageInfo: PageInfo
  edges: StageEdge[]
  aggregate: AggregateStage
}

/*
 * An edge in a connection.

 */
export interface PipelineEdge {
  node: Pipeline
  cursor: String
}

export interface Organization extends Node {
  id: ID_Output
  name: String
  owner?: User
  persons?: Person[]
}

export interface PicturePreviousValues {
  id: ID_Output
  file: String
}

export interface PictureSubscriptionPayload {
  mutation: MutationType
  node?: Picture
  updatedFields?: String[]
  previousValues?: PicturePreviousValues
}

export interface Person extends Node {
  id: ID_Output
  name: String
  owner?: User
  email?: String
  phone?: String
  pictures?: Picture[]
  products?: Product[]
  deals?: Deal[]
}

/*
 * A connection to a list of items.

 */
export interface PersonConnection {
  pageInfo: PageInfo
  edges: PersonEdge[]
  aggregate: AggregatePerson
}

export interface AggregatePicture {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ProductEdge {
  node: Product
  cursor: String
}

export interface AggregateDeal {
  count: Int
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string