import gql from 'graphql-tag';

export default {
  authenticateUser: gql`
    mutation authenticatedUser($email: String!, $password: String!) {
      loginAdmin(email: $email, password: $password) {
        token
      }
    }
  `,
};
