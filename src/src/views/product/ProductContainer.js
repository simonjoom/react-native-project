import { compose, graphql, withApollo } from 'react-apollo';

import queries from './queries.gql';
import userInformation from '../../graphql/userInfo.graphql';
import Product from './Product';

// TODO: Speed up mutation by updating the store manually instead of refetchQueries
export default compose(
  withApollo,
  graphql(queries.addItemToCart, {
    props: ({ mutate }) => ({
      addItemToCart: ({ variantId, quantity }) =>
        mutate({
          variables: { variantId, quantity },
          refetchQueries: [
            {
              query: userInformation,
            },
          ],
        }),
    }),
  }),
)(Product);
