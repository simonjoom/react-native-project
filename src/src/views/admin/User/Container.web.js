import { graphql, compose, withApollo } from "react-apollo";
import { upsertUser,  deleteUser,user, users, usersub } from "./query.gql";
import Comp from "./index";
import { loader } from "../loader";
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
          variables: { name },
          refetchQueries: [
            {
              query: users
            }
          ]
        })
    })
  }),
  graphql(upsertUser, {
    props: ({ mutate, ownProps }) => ({
      usersub: () =>
        ownProps.client.subscribe({
          query: usersub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
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
          },
          refetchQueries: [
            {
              query: users
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default UserOut;
