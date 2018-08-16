import { graphql, compose, withApollo } from "react-apollo";
import { upsertDeal, deal, deleteDeal, deals } from "./query.gql";
import Comp from "./index";
//import ResortComp from "../resort/ResortContainer";

import {
  createStackNavigator
} from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const DealOut = compose(
  withApollo,
  graphql(deals),
  //}),
  graphql(deleteDeal, {
    props: ({ mutate, ownProps }) => ({
      deleteDeal: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: deals,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertDeal, {
    props: ({ mutate, ownProps }) => ({
      Deal: ({ name }) =>
        ownProps.client.query({
          query: deal,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertDeal: ({
        title,
        value,
        currency,
        owner_id,
        person_id,
        org_id,
        participants_ids,
        products_ids,
        stage_id,
        status,
        probability
      }) =>
        mutate({
          variables: {
            title,
            value,
            currency,
            owner_id,
            org_id,
            person_id,
            stage_id,
            participants_ids,
            products_ids,
            status,
            probability
          }
        }).then(() =>
          ownProps.client.query({
            query: deals,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);
export default DealOut;
