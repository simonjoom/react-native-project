import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  Dimensions,
  Text,
  ScrollView,
  StatusBar,
  AppRegistry,
  View
} from "react-native";
import { ApolloProvider } from "react-apollo";
import Colors from "./statics/colors";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  SafeAreaView,
  createDrawerNavigator
} from "react-navigation";
import { withBrowserHistory } from "./browserhistory";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FullLoading from "./components/loading/FullLoading";
//import HybridApp from "./App";
import HomeContainer from "./views/home/HomeContainer";
import NavigationService from "./NavigationService";
//import Settings from "./views/settings/Settings";

import AskPasswordReset from "./views/password-reset/AskPasswordResetContainer";
import { setupApolloClient } from "./graphql/setupApollo";
import StorageKeys from "./statics/storage-keys";

import { MainStackAdmin, MainStack } from "./config";

const admin = true;

/*

const SettingsNavigator = createStackNavigator(
  {
    Settings: { screen: Settings }
  },
  {
    headerMode: "none"
  }
);
*/
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
    }
    /*,  ProfileTab: {
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
    }*/
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
const SwitchStack = createSwitchNavigator(
  {
    AuthLoadingScreen: AuthLoadingScreen,
    Auth: admin ? MainStackAdmin : MainStack,
    App: MainView
  },
  {
    useNativeAnimations: false
  }
);

export const Drawer = createDrawerNavigator(
  {
    Inbox: {
      path: "",
      screen: MainStackAdmin
    },
    Main: {
      path: "sent",
      screen: MainStack
    }
  },
  {
    initialRouteName: "Inbox",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    useNativeAnimations: false
  }
);
const apolloClient = setupApolloClient();

const HistoryNavigator = withBrowserHistory(Drawer);
//AppRegistry.registerComponent('pipedrive', () => Drawer);

const HOST = true ? "http://localhost:3000" : "https://jekiwijaya.github.io";
//const BASE_PATH = true ? "/" : "/react-navigation-browser-history-helpers/";
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <HistoryNavigator uriPrefix={HOST} />
      </ApolloProvider>
    );
  }
}

/*ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}*/
