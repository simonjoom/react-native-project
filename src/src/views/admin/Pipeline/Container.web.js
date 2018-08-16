import { graphql, compose, withApollo } from "react-apollo";
import { upsertPipeline, pipeline, deletePipeline, pipelines } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const PipelineOut = compose(
  withApollo,
  graphql(pipelines),
  graphql(deletePipeline, {
    props: ({ mutate, ownProps }) => ({
      deletePipeline: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: pipelines,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertPipeline, {
    props: ({ mutate, ownProps }) => ({
      pipeline: ({ name }) =>
        ownProps.client.query({
          query: pipeline,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertPipeline: ({ name,namewhere, deals, order_nr, deal_probability }) =>
        mutate({
          variables: {
            name,
            namewhere,
            deals,
            order_nr,
            deal_probability
          }
        }).then(() =>
          ownProps.client.query({
            query: pipelines,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);

export default PipelineOut;
