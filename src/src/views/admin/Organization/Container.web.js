import { graphql, compose, withApollo } from "react-apollo";

import {
  upsertOrganization,
  organization,
  deleteOrganization,
  organizations,
  organizationsub
} from "./query.gql";
import { loader } from "../loader";
import Comp from "./index";
// import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
// TODO: Faster mutation by invalidating cache instead of using refetchQueries

const OrganizationOut = compose(
  withApollo,
  graphql(organizations),
  graphql(deleteOrganization, {
    props: ({ mutate, ownProps }) => ({
      deleteOrganization: ({ name }) =>
        mutate({
          variables: { name },
          refetchQueries: [
            {
              query: organizations
            }
          ]
        })
    })
  }),
  graphql(upsertOrganization, {
    props: ({ mutate, ownProps }) => ({
      organizationsub: () =>
        ownProps.client.subscribe({
          query: organizationsub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
      organization: ({ name }) =>
        ownProps.client.query({
          query: organization,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertOrganization: ({ namewhere, name, owner, persons }) => {
        const variables = {
          namewhere,
          name,
          owner,
          persons
        };
        return mutate({
          variables,
          refetchQueries: [
            {
              query: organizations
            }
          ]
        });
      }
    })
  }),
  loader
)(Comp);

export default OrganizationOut;
