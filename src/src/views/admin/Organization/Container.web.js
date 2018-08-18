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
  /*graphql(organizationsub, {
    props: ({data,ownProps}) => {
      console.log("ownProps",data,ownProps)
      return organizationsub:() =>
      ownProps.client.subscribe({
        variables: {
          mutation_in: ["CREATED", "UPDATED"]
        }
      })
    }
  }),*/
  graphql(upsertOrganization, {
    props: ({ mutate, ownProps }) => ({
      organizationsub: () =>
        ownProps.client.subscribe({
          query: organizationsub,
          fetchPolicy: "network-only",
          variables: {
            where: { mutation_in: ["CREATED"] }
          }
        }),
      organization: ({ name }) =>
        ownProps.client.query({
          query: organization,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertOrganization: ({ namewhere, name, owner, persons }) =>
        mutate({
          variables: {
            namewhere,
            name,
            owner,
            persons
          },
          refetchQueries: [
            {
              query: organizations
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default OrganizationOut;
