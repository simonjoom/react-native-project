import { graphql, compose, withApollo } from 'react-apollo';

import userInformation from '../../graphql/userInfo.graphql';

import Basket from './Basket';
import queries from './query.gql';

export default compose(
  withApollo,
  graphql(queries.removeItemFromCart, {
    props: ({ mutate }) => ({
      removeItemFromBasket: ({ lineItemId }) =>
        mutate({
          variables: { lineItemId },
          update: store => {
            const data = store.readQuery({ query: userInformation });

            data.me.cart = data.me.cart.filter(lineItem => {
              return lineItem.id !== lineItemId;
            });

            store.writeQuery({ query: userInformation, data });
          },
        }),
    }),
  }),
  graphql(queries.updateLineItemQuantity, {
    props: ({ mutate }) => ({
      updateLineItemQuantity: ({ variantId, quantity }) => (
        mutate({ variables: { variantId, quantity } })
      )
    })
  })
)(Basket);
