import { graphql, compose, withApollo } from 'react-apollo';
import { upsertCategory, option, deleteCategory, categories } from './query.gql';
import CategoryComp from './Category';


//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(withApollo,
  graphql(categories),
  //}),
  graphql(deleteCategory, {
    props: ({ mutate, ownProps }) => ({
      deleteCategory: ({ name }) => mutate({
        variables: { name },
      })
      .then(() => ownProps.client.query({
        query: categories,
        fetchPolicy: 'network-only'
      }))
    })
  }),
  graphql(upsertCategory, {
    props: ({ mutate, ownProps }) => ({
      option: ({ name }) => ownProps.client.query({
        query: option,
        fetchPolicy: 'network-only',
        variables: { name },
      }),
      upsertCategory: ({ name,
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
          query: categories,
          fetchPolicy: 'network-only'
        }))
    }),
  })
)(CategoryComp);
