import { graphql, compose, withApollo } from "react-apollo";
import { upsertOrganization, organization, deleteOrganization, organizations } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import {
  createStackNavigator
} from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const OrganizationOut = compose(
  withApollo,
  graphql(organizations),
  //}),
  graphql(deleteOrganization, {
    props: ({ mutate, ownProps }) => ({
      deleteOrganization: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: organizations,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertOrganization, {
    props: ({ mutate, ownProps }) => ({
      organization: ({ name }) =>
        ownProps.client.query({
          query: organization,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertOrganization: ({
        namewhere,
        name,
        owner,
        person_ids
      }) =>
        mutate({
          variables: {
            namewhere,
            name,
            owner,
            person_ids
          }
        }).then(() =>
          ownProps.client.query({
            query: organizations,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);

export default OrganizationOut;
