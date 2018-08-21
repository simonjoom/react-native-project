import { graphql, compose, withApollo } from "react-apollo";
import { upsertDeal, deal, dealsub, deleteDeal, deals } from "./query.gql";
import Comp from "./index";
import { loader } from "../loader";

const DealOut = compose(
  withApollo,
  graphql(deals),
  graphql(deleteDeal, {
    props: ({ mutate, ownProps }) => ({
      deleteDeal: ({ title }) =>
        mutate({
          variables: { title },
          refetchQueries: [
            {
              query: deals
            }
          ]
        })
    })
  }),
  graphql(upsertDeal, {
    props: ({ mutate, ownProps }) => ({
      dealsub: () =>
        ownProps.client.subscribe({
          query: dealsub,
          fetchPolicy: "network-only",
          variables: {
            where: { mutation_in: ["CREATED", "UPDATED", "DELETED"] }
          }
        }),
      deal: ({ title }) =>
        ownProps.client.query({
          query: deal,
          fetchPolicy: "network-only",
          variables: { title }
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
          },
          refetchQueries: [
            {
              query: deals
            }
          ]
        })
    })
  }),
  loader
)(Comp);
export default DealOut;
