import { graphql, compose, withApollo } from "react-apollo";
import { upsertStage, deleteStage, stage, stages, stagesub } from "./query.gql";
import Comp from "./index";
import { loader } from "../loader";
//import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const StageOut = compose(
  withApollo,
  graphql(stages),
  graphql(deleteStage, {
    props: ({ mutate, ownProps }) => ({
      deleteStage: ({ name }) =>
        mutate({
          variables: { name },
          refetchQueries: [
            {
              query: stages
            }
          ]
        })
    })
  }),
  graphql(upsertStage, {
    props: ({ mutate, ownProps }) => ({
      stagesub: () =>
        ownProps.client.subscribe({
          query: stagesub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
      stage: ({ name }) =>
        ownProps.client.query({
          query: stage,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertStage: ({
        name,
        namewhere,
        pipeline,
        order_nr,
        deal_probability
      }) =>
        mutate({
          variables: {
            name,
            namewhere,
            pipeline,
            order_nr,
            deal_probability
          },
          refetchQueries: [
            {
              query: stages
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default StageOut;
