import { graphql, compose, withApollo } from 'react-apollo';
import { upsertResort, resort, deleteResort, resorts } from './query.gql';
import ResortComp from './Resort';


//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(withApollo,
  graphql(resorts),
  //}),
  graphql(deleteResort, {
    props: ({ mutate, ownProps }) => ({
      deleteResort: ({ name }) => mutate({
        variables: { name },
      })
      .then(() => ownProps.client.query({
        query: resorts,
        fetchPolicy: 'network-only'
      }))
    })
  }),
  graphql(upsertResort, {
    props: ({ mutate, ownProps }) => ({
      resort: ({ name }) => ownProps.client.query({
        query: resort,
        fetchPolicy: 'network-only',
        variables: { name },
      }),
      upsertResort: ({ name,
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
          query: resorts,
          fetchPolicy: 'network-only'
        }))
    }),
  })
)(ResortComp);
