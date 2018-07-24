import { graphql, compose, withApollo } from 'react-apollo';
import {userOrders,addOrderToCart} from './query.gql';
import userInformation from 'src/graphql/userInfo.graphql';
import Orders from './Orders';

//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  graphql(userOrders, { options: { fetchPolicy: 'cache-and-network' } }),
  graphql(addOrderToCart, {
    props: ({ mutate }) => ({
      addOrderToCart: ({ orderId, replace }) =>
        mutate({
          variables: { orderId, replace },
          refetchQueries: [{ query: userInformation }],
        }),
    }),
  }),
  withApollo,
)(Orders);
