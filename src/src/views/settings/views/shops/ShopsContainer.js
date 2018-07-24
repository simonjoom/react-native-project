import { graphql, compose, withApollo } from 'react-apollo';

import Shops from './Shops';

import {allShopsQuery,updateSelectedShopMutation} from './queries.gql';

export default compose(
  graphql(allShopsQuery),
  graphql(updateSelectedShopMutation, {
    props: ({ mutate }) => ({
      updateSelectedShop: ({ selectedShopId }) =>
        mutate({
          variables: { selectedShopId },
          refetchQueries: [
            'dataForBrowsing',
            'filersForCategory'
          ],
        }),
    }),
  }),
  withApollo
)(Shops);
