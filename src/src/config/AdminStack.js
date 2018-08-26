import React from "react";
import { createStackNavigator } from "react-navigation";
import SignUpAdmin from "src/views/admin/sign-up/SignUpContainer";
import RoutesBackend, { RunBackend } from "src/views/admin/Backend";
import SignInAdmin from "src/views/admin/sign-in/SignInContainer";
import LoginAdmin from "src/views/admin/login/Login";
import { Hamburger, Plus } from "src/components/icons";
import Colors from "src/statics/colors";
import dismissableStackNavigator from "src/helpers";
import { MainScreen } from "./Layout";
import Transition from "./Transition";

export const LoginAdminScreen = ({ navigation,screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: LoginAdmin,
    title: "Login"
  });
export const SignUpAdminScreen = ({ navigation }) =>
  MainScreen({
    asScroll: false,
    navigation: navigation,
    ChildrenComp: SignUpAdmin,
    title: "SignUp"
  });
export const SignInAdminScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: SignInAdmin,
    title: "SignIn"
  });

const navigationOptions = ({ navigation }) => ({
  headerTitle: "Main",
  headerRight: <Hamburger navigation={navigation} />,
  headerLeft: <Plus navigation={navigation} route="Login" />,
  headerTitleStyle: {
    color: Colors.$white
  }
});

SignInAdminScreen.navigationOptions = SignUpAdminScreen.navigationOptions = LoginAdminScreen.navigationOptions = navigationOptions;

const arr = {
  Organization: ["User", "Person"],
  User: ["Organization"],
  Person: ["User", "Picture", "Product", "Deal"],
  Product: ["User", "Deal"],
  Deal: ["User", "Person", "Product", "Stage", "Organization"],
  Picture: [],
  Stage: ["Pipeline"],
  Pipeline: ["Deal"],  
  APIREADME: []
};

const newScene = new RoutesBackend(arr);
const ta = Object.keys(arr);
ta.push("APIREADME");
const Backend = ({ navigation }) => (
  <RunBackend Routes={ta} navigation={navigation} />
);

Backend.navigationOptions = navigationOptions;

export const BackendScreen = ({ navigation,screenProps }) =>
  MainScreen({
    screenProps,
    navigation,
    ChildrenComp: Backend,
    title: "SignIn"
  });

export const mRoute = newScene.createRouteScene();

const ModalNavigator = dismissableStackNavigator(mRoute, {
  headerMode: "none"
});

const ModalStack = dismissableStackNavigator(
  {
    Backend: {
      path:"",
      screen: BackendScreen
    },
    Modal: { screen: ModalNavigator }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
console.log("mRoute", ModalNavigator);

const MainStackAdmin = createStackNavigator(
  {
    // Main: { screen: MainScreen },
    Login: {
      path:"",
      screen: LoginAdminScreen
    },
    SignUp: {
      screen: SignUpAdminScreen
    },
    SignIn: {
      screen: SignInAdminScreen
    },
    Backend: {
      screen: ModalStack
    }
  },
  {
    initialRouteName: "Login",
    transitionConfig: Transition,
    useNativeAnimations: false,
    //mode: 'modal',
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Main",
      headerRight: <Hamburger navigation={navigation} />,
      headerLeft: <Plus navigation={navigation} route="Login" />,
      headerStyle: {
        backgroundColor: Colors.$green
      }
    })
  }
);

export default MainStackAdmin;
