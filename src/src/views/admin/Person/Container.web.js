import { graphql, compose, withApollo } from "react-apollo";
import { upsertPerson, person, deletePerson, persons } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import {
  createStackNavigator
} from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries


const PersonOut = compose(
  withApollo,
  graphql(persons),
  //}),
  graphql(deletePerson, {
    props: ({ mutate, ownProps }) => ({
      deletePerson: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: persons,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertPerson, {
    props: ({ mutate, ownProps }) => ({
      person: ({ name }) =>
        ownProps.client.query({
          query: person,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertPerson: ({
        name,
        ownerId,
        email,
        phone,
        pictureIds,
        productIds,
        dealIds
      }) =>
        mutate({
          variables: {
            name,
            ownerId,
            email,
            phone,
            pictureIds,
            productIds,
            dealIds
          }
        }).then(() =>
          ownProps.client.query({
            query: persons,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);

export default PersonOut;
