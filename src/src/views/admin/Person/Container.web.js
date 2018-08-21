import { graphql, compose, withApollo } from "react-apollo";
import {
  upsertPerson,
  person,
  personsub,
  deletePerson,
  persons
} from "./query.gql";
import Comp from "./index";
import {loader} from "../loader";
//import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const PersonOut = compose(
  withApollo,
  graphql(persons),
  graphql(deletePerson, {
    props: ({ mutate, ownProps }) => ({
      deletePerson: ({ name }) =>
        mutate({
          variables: { name },
          refetchQueries: [
            {
              query: persons
            }
          ]
        })
    })
  }),
  graphql(upsertPerson, {
    props: ({ mutate, ownProps }) => ({
      personsub: () =>
        ownProps.client.subscribe({
          query: personsub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
      person: ({ name }) =>
        ownProps.client.query({
          query: person,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertPerson: ({
        namewhere,
        name,
        owner,
        email,
        phone,
        pictures,
        products,
        deals
      }) =>
        mutate({
          variables: {
            namewhere,
            name,
            owner,
            email,
            phone,
            pictures,
            products,
            deals
          },
          refetchQueries: [
            {
              query: persons
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default PersonOut;
