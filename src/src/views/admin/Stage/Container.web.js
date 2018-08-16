import { graphql, compose, withApollo } from "react-apollo";
import { upsertStage, stage, deleteStage, stages } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import {
  createStackNavigator
} from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const StageOut = compose(
  withApollo,
  graphql(stages),
  //}),
  graphql(deleteStage, {
    props: ({ mutate, ownProps }) => ({
      deleteStage: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: stages,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertStage, {
    props: ({ mutate, ownProps }) => ({
      stage: ({ name }) =>
        ownProps.client.query({
          query: stage,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertStage: ({
        name,
        pipeline,
        order_nr,
        deal_probability
      }) =>
        mutate({
          variables: {
            name,
            pipeline,
            order_nr,
            deal_probability
          }
        }).then(() =>
          ownProps.client.query({
            query: stages,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);

export default StageOut;
