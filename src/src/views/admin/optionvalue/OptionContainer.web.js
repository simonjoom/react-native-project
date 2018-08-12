import { graphql, compose, withApollo } from "react-apollo";
import {
  upsertOptionValue,
  optionValue,
  deleteOptionValue,
  optionValues
} from "./query.gql";
import OptionComp from "./Option";

//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  withApollo,
  graphql(optionValues),
  //}),
  graphql(deleteOptionValue, {
    props: ({ mutate, ownProps }) => ({
      deleteOptionValue: ({ id }) =>
        mutate({
          variables: { id }
        }).then(() =>
          ownProps.client.query({
            query: optionValues,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertOptionValue, {
    props: ({ mutate, ownProps }) => ({
      optionValue: ({ id }) =>
        ownProps.client.query({
          query: optionValue,
          fetchPolicy: "network-only",
          variables: { id }
        }),
      upsertOptionValue: ({ name,id }) =>
        mutate({
          variables: {
            id,
            name
          }
        }).then(() =>
          ownProps.client.query({
            query: optionValues,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(OptionComp);
