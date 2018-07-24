import gql from 'graphql-tag';

export const signUp= {
  signUp: gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!, $shopId: ID!) {
      signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, shopId: $shopId) {
        token
      }
    }
  `
}

export const allShops= {
  allShops: gql`
  query allShops {
    id
    name
    address
    zipCode
    city
    phoneNumber
    openingHours
  }`
}