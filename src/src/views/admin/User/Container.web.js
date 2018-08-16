import { graphql, compose, withApollo } from "react-apollo";
import { upsertUser, user, deleteUser, users } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const UserOut = compose(
  withApollo,
  graphql(users),
  graphql(deleteUser, {
    props: ({ mutate, ownProps }) => ({
      deleteUser: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: users,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertUser, {
    props: ({ mutate, ownProps }) => ({
      user: ({ name }) =>
        ownProps.client.query({
          query: user,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertUser: ({
        namewhere,
        name,
        email,
        password,
        company,
        firstName,
        lastName,
        active_flag,
        role
      }) =>
        mutate({
          variables: {
            namewhere,
            name,
            email,
            password,
            company,
            firstName,
            lastName,
            active_flag,
            role
          }
        }).then(() =>
          ownProps.client.query({
            query: users,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);

export default UserOut;
