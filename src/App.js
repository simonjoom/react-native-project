import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  Dimensions,
  Text,
  Platform,
  ScrollView,
  StatusBar,
  View
} from "react-native";
import { ApolloProvider } from "react-apollo";
import Colors from "./src/statics/colors";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  SafeAreaView,
  createDrawerNavigator
} from "react-navigation";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FullLoading from "./src/components/loading/FullLoading";
//import HybridApp from "./src/App";
import HomeContainer from "./src/views/home/HomeContainer";
import NavigationService from "./src/NavigationService";
import Settings from "./src/views/settings/Settings";
import Orders from "./src/views/settings/views/orders/OrdersContainer";
import Shops from "./src/views/settings/views/shops/ShopsContainer";

import AskPasswordReset from "./src/views/password-reset/AskPasswordResetContainer";

import Product from "./src/views/product/ProductContainer";

import { setupApolloClient } from "./src/graphql/setupApollo";
import StorageKeys from "./src/statics/storage-keys";

import { MainStackAdmin, MainStack } from "./src/config";



const admin = true;



const SettingsNavigator = createStackNavigator(
  {
    Settings: { screen: Settings }
    // Orders: { screen: Orders },
    // Shops: { screen: Shops }
  },
  {
    headerMode: "none"
  }
);

const MainView = createBottomTabNavigator(
  {
    WelcomeTab: {
      screen: HomeContainer,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-home-outline"
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    },
    ProfileTab: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-person-outline"
            size={22}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.red,
      inactiveTintColor: Colors.text,
      style: {
        borderTopColor: Colors.grey,
        height: 40
      },
      tabStyle: {
        backgroundColor: Colors.white
      },
      showLabel: false
    }
  }
); 

class AuthLoadingScreen extends React.PureComponent {
  constructor() {
    super();

    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem(StorageKeys.GC_TOKEN);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return <FullLoading />;
  }
}
const SwitchStack = createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: admin ? MainStackAdmin : MainStack,
  App: MainView,
},{ 
    useNativeAnimations: false
  });
/*
SwitchStack.navigationOptions = {
  drawerLabel: "Home",
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="home" size={24} style={{ color: tintColor }} />
  )
};*/

const Drawer = createDrawerNavigator(
  {
    Inbox: {
      path: "/",
      screen: MainStackAdmin
    },
    Main: {
      path: "/sent",
      screen: MainStackAdmin
    }
  },
  {
    initialRouteName: "Main",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    useNativeAnimations: false
  }
); 
const apolloClient = setupApolloClient();

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Drawer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>
      </ApolloProvider>
    );
  }
}

/*
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        <SwitchStack
        />*/
