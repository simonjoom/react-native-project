import { graphql, compose, withApollo } from "react-apollo";
import {
  upsertPicture,
  picture,
  picturesub,
  deletePicture,
  pictures,
  getInfo
} from "./query.gql";
import Comp from "./index";
import { loader } from "../loader";
//import ResortComp from "../resort/ResortContainer";
 
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const PictureOut = compose(
  withApollo,
  graphql(pictures),
  graphql(deletePicture, {
    props: ({ mutate, ownProps }) => ({
      deletePicture: ({ id }) =>
        mutate({
          variables: { id },
          refetchQueries: [
            {
              query: pictures
            }
          ]
        })
    })
  }),
  graphql(upsertPicture, {
    props: ({ mutate, ownProps }) => ({ 
      picturesub: () =>
        ownProps.client.subscribe({
          query: picturesub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
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
          },
          refetchQueries: [
            {
              query: pictures
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default PictureOut;
