import { graphql, compose } from 'react-apollo';
import {signUp} from './query.gql';
import SignUpComp from './SignUp';

//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  graphql(signUp, {
    props: ({ mutate }) => ({
      signUp: ({ email, password, firstName, lastName }) =>
        mutate({
          variables: { email, password, firstName, lastName },
        }),
    }),
  }),
)(SignUpComp);
