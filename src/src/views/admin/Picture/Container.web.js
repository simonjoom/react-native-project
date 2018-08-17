import { graphql, compose, withApollo } from "react-apollo";
import { upsertPicture, picture, deletePicture, pictures } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const PictureOut = compose(
  withApollo,
  graphql(pictures),
  //}),
  graphql(deletePicture, {
    props: ({ mutate, ownProps }) => ({
      deletePicture: ({ id }) =>
        mutate({
          variables: { id }
        }).then(() =>
          ownProps.client.query({
            query: pictures,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertPicture, {
    props: ({ mutate, ownProps }) => ({
      picture: ({ id }) =>
        ownProps.client.query({
          query: picture,
          fetchPolicy: "network-only",
          variables: { id }
        }),
      upsertPicture: ({ id, file }) =>
        mutate({
          variables: {
            id,
            file
          }
        }).then(() =>
          ownProps.client.query({
            query: pictures,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);

export default PictureOut;
