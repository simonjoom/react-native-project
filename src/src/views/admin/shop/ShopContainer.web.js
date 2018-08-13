import { graphql, compose, withApollo } from "react-apollo";
import { upsertShop,upsertShopTest, shop, deleteShop, shops } from "./query.gql";
import ShopComp from "./Shop";
//import ResortComp from "../resort/ResortContainer";

import {
  createStackNavigator
} from "react-navigation";
//TODO: Faster mutation by invalidating cache instead of using refetchQueries



const ShopOut = compose(
  withApollo,
  graphql(shops),
  //}),
  graphql(deleteShop, {
    props: ({ mutate, ownProps }) => ({
      deleteShop: ({ name }) =>
        mutate({
          variables: { name }
        }).then(() =>
          ownProps.client.query({
            query: shops,
            fetchPolicy: "network-only"
          })
        )
    })
  }),
  graphql(upsertShopTest, {
    props: ({ mutate, ownProps }) => ({
      shop: ({ name }) =>
        ownProps.client.query({
          query: shop,
          fetchPolicy: "network-only",
          variables: { name }
        }),
      upsertShop: ({
        name,
        description,
        address,
        openingHours,
        zipCode,
        phoneNumber
      }) =>
        mutate({
          variables: {
            name,
            description,
            address,
            openingHours,
            zipCode,
            phoneNumber
          }
        }).then(() =>
          ownProps.client.query({
            query: shops,
            fetchPolicy: "network-only"
          })
        )
    })
  })
)(ShopComp);
/*const ShopNavigator = createStackNavigator(
  {
    shop: { screen: ShopOut },
    resort: { screen: ResortComp }
    // Orders: { screen: Orders },
    // Shops: { screen: Shops }
  },
  {
    headerMode: "none"
  }
);
const navigationOptions = ({ navigation }) => ({
  headerTitle: "shop",
});
ShopNavigator.ShopNavigator=navigationOptions;*/

//console.log(ShopNavigator)
//ShopOut.router = ShopNavigator.router;
export default ShopOut;
