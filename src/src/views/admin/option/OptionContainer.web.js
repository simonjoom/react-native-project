import { graphql, compose, withApollo } from 'react-apollo';
import { upsertOption, option, deleteOption, options } from './query.gql';
import OptionComp from './Option';


//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(withApollo,
  graphql(options),
  //}),
  graphql(deleteOption, {
    props: ({ mutate, ownProps }) => ({
      deleteOption: ({ name }) => mutate({
        variables: { name },
      })
      .then(() => ownProps.client.query({
        query: options,
        fetchPolicy: 'network-only'
      }))
    })
  }),
  graphql(upsertOption, {
    props: ({ mutate, ownProps }) => ({
      option: ({ name }) => ownProps.client.query({
        query: option,
        fetchPolicy: 'network-only',
        variables: { name },
      }),
      upsertOption: ({ name,
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
          query: options,
          fetchPolicy: 'network-only'
        }))
    }),
  })
)(OptionComp);
