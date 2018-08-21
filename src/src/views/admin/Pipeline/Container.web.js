import { graphql, compose, withApollo } from "react-apollo";
import {
  upsertPipeline,
  pipeline,
  pipelinesub,
  deletePipeline,
  pipelines
} from "./query.gql";
import Comp from "./index";
import { loader } from "../loader";
//import ResortComp from "../resort/ResortContainer";
 
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const PipelineOut = compose(
  withApollo,
  graphql(pipelines),
  graphql(deletePipeline, {
    props: ({ mutate, ownProps }) => ({
      deletePipeline: ({ name }) =>
        mutate({
          variables: { name },
          refetchQueries: [
            {
              query: pipelines
            }
          ]
        })
    })
  }),
  graphql(upsertPipeline, {
    props: ({ mutate, ownProps }) => ({
      pipelinesub: () =>
        ownProps.client.subscribe({
          query: pipelinesub,
          fetchPolicy: "network-only",
          variables: {
            where: { mutation_in: ["CREATED", "UPDATED", "DELETED"] }
          }
        }),
      pipeline: ({ name }) =>
        ownProps.client.query({
          query: pipeline,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertPipeline: ({
        name,
        namewhere,
        deals,
        order_nr,
        deal_probability
      }) =>
        mutate({
          variables: {
            name,
            namewhere,
            deals,
            order_nr,
            deal_probability
          },
          refetchQueries: [
            {
              query: pipelines
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default PipelineOut;
