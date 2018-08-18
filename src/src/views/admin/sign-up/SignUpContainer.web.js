import { graphql, compose, withApollo } from 'react-apollo';
//import { signUp, userAdmins, users,allUsers } from './query.gql';
import SignUpComp from './SignUp';

export default SignUpComp
/*
//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(withApollo,
  //graphql(userAdmins, { name: 'admins' }),
  //graphql(users, { name: 'users' }),
  graphql(allUsers),
  graphql(signUp, {
    props: ({ mutate }) => ({
      signUp: ({ email, password, firstName, lastName, shopId }) =>
        mutate({
          variables: { email, password, firstName, lastName, shopId },
        })
    })
  })
)(SignUpComp);*/
