import { graphql, compose, withApollo } from "react-apollo";
import { upsertProduct, product, deleteProduct, products } from "./query.gql";
import Comp from "./index";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const ProductOut = compose(
  withApollo,
  graphql(products),
  graphql(deleteProduct, {
    props: ({ mutate, ownProps }) => ({
      deleteProduct: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: products,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertProduct, {
    props: ({ mutate, ownProps }) => ({
      product: ({ name }) =>
        ownProps.client.query({
          query: product,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertProduct: ({ name, namewhere, unit, code, owner, deals }) =>
        mutate({
          variables: {
            namewhere,
            name,
            unit,
            code,
            owner,
            deals
          }
        }).then(() =>
          ownProps.client.query({
            query: products,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(Comp);
export default ProductOut;
