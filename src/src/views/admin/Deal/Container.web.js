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
        namewhere,
        title,
        value,
        currency,
        owner,
        org,
        person,
        stage,
        participants,
        products,
        status,
        probability
      }) =>
        mutate({
          variables: {
            namewhere,
            title,
            value,
            currency,
            owner,
            org,
            person,
            stage,
            participants,
            products,
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
