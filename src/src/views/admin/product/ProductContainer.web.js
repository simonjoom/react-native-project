import { graphql, compose, withApollo } from 'react-apollo';
import { upsertProduct, product, deleteProduct, products } from './query.gql';
import ProductComp from './Product';
import { withNavigation } from "react-navigation";



//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  withNavigation,
  withApollo,
  graphql(products),
  //}),
  graphql(deleteProduct, {
    props: ({ mutate, ownProps }) => ({
      deleteProduct: ({ name }) => mutate({
        variables: { name },
      })
      .then(() => ownProps.client.query({
        query: products,
        fetchPolicy: 'network-only'
      }))
    })
  }),
  graphql(upsertProduct, {
    props: ({ mutate, ownProps }) => ({
      product: ({ name }) => ownProps.client.query({
        query: product,
        fetchPolicy: 'network-only',
        variables: { name },
      }),
      upsertProduct: ({ name,
        description,
        address,
        zipCode,
        city,
        phoneNumber }) =>
        mutate({
          variables: {
            name,
            description,
            address,
            zipCode,
            city,
            phoneNumber
          }
        }).then(() => ownProps.client.query({
          query: products,
          fetchPolicy: 'network-only'
        }))
    }),
  })
)(ProductComp);
