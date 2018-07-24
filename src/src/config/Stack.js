import React from "react";
import { createStackNavigator } from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import SignUp from "src/views/sign-up/SignUpContainer";
import SignIn from "src/views/sign-in/SignInContainer";
import Login from "src/views/login/Login";
import { Hamburger, Plus } from "src/components/icons";
import Colors from "src/statics/colors";
import { MainScreen } from "./Layout";

const LoginScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: Login,
    title: "Login"
  });
const SignUpScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: SignUp,
    title: "SignUp"
  });
const SignInScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: SignIn,
    title: "SignIn"
  });


const MainStack = createStackNavigator({
  // Main: { screen: MainScreen },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  SignIn: {
    screen: SignInScreen
  }
});

MainStack.navigationOptions= ({ navigation }) => ({
  headerTitle: "Main",
  headerRight: <Hamburger navigation={navigation} />,
  headerLeft: <Plus navigation={navigation} route="Login" />,
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  ),
  useNativeAnimations: false,
    headerStyle: {
      backgroundColor: Colors.$green
    }
  })

export default MainStack;
