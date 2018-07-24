import { graphql, compose,withApollo } from 'react-apollo';
import { signUp} from './query.gql';
import SignUpComp from './SignUp';

//TODO: Faster mutation by invalidating cache instead of using refetchQueries

/*export default compose(withApollo,
  graphql(signUp, {
    props: ({ mutate }) => ({
      signUp: ({ email, password, firstName, lastName, shopId }) =>
        mutate({
          variables: { email, password, firstName, lastName, shopId },
        }),
    }),
  }),
)(SignUpComp);*/

export default SignUpComp