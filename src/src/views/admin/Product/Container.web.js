import { graphql, compose, withApollo } from "react-apollo";
import {
  upsertProduct,
  product,
  deleteProduct,
  products,
  productsub
} from "./query.gql";
import Comp from "./index";
import { loader } from "../loader";

import { createStackNavigator } from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries

const ProductOut = compose(
  withApollo,
  graphql(products),
  graphql(deleteProduct, {
    props: ({ mutate, ownProps }) => ({
      deleteProduct: ({ name }) =>
        mutate({
          variables: { name },
          refetchQueries: [
            {
              query: products
            }
          ]
        })
    })
  }),
  graphql(upsertProduct, {
    props: ({ mutate, ownProps }) => ({
      productsub: () =>
        ownProps.client.subscribe({
          query: productsub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"] 
          }
        }),
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
          },
          refetchQueries: [
            {
              query: products
            }
          ]
        })
    })
  }),
  loader
)(Comp);
export default ProductOut;
