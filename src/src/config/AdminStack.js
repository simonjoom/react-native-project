import React from "react";
import { createStackNavigator } from "react-navigation";
import SignUpAdmin from "src/views/admin/sign-up/SignUpContainer";
import Backend from "src/views/admin/Backend";
import SignInAdmin from "src/views/admin/sign-in/SignInContainer";
import LoginAdmin from "src/views/admin/login/Login";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Hamburger, Plus } from "src/components/icons";
import Colors from "src/statics/colors";
import { MainScreen } from "./Layout";

export const LoginAdminScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
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
  export const BackendScreen = ({ navigation }) =>
  MainScreen({
    navigation: navigation,
    ChildrenComp: Backend,
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

BackendScreen.navigationOptions =SignInAdminScreen.navigationOptions = SignUpAdminScreen.navigationOptions = LoginAdminScreen.navigationOptions = navigationOptions;

const MainStackAdmin = createStackNavigator(
  {
    // Main: { screen: MainScreen },
    Login: {
      screen: LoginAdminScreen
    },
    SignUp: {
      screen: SignUpAdminScreen
    },
    SignIn: {
      screen: SignInAdminScreen
    },
    Backend: {
      screen: BackendScreen
    }
  },
  {
    initialRouteName: "Login",
    /*transitionConfig: () => {
      return {
        transitionSpec: {
          duration: 2750,
          easing: Easing.inOut(Easing.ease),
          //easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: false
        },
        screenInterpolator: sceneProps => {
          const { position, layout, scene, index, scenes } = sceneProps;
          const toIndex = index;
          const thisSceneIndex = scene.index;
          const height = layout.initHeight;
          const width = layout.initWidth;

          const translateX = position.interpolate({
            inputRange: [
              thisSceneIndex - 1,
              thisSceneIndex,
              thisSceneIndex + 1
            ],
            outputRange: [width, 0, width]
          });

          // Since we want the card to take the same amount of time
          // to animate downwards no matter if it's 3rd on the stack
          // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
          const resetY = position.interpolate({
            inputRange: [0, thisSceneIndex],
            outputRange: [height, 0]
          });

          const translateY = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [height, 0]
          });

          const slideFromRight = { transform: [{ translateX }] };
          const resetFromBottom = { transform: [{ resetY }] };
          const slideFromBottom = { transform: [{ translateY }] };

          const lastSceneIndex = scenes[scenes.length - 1].index;

          // Test whether we're skipping back more than one screen
          if (lastSceneIndex - toIndex > 1) {
            // Do not transoform the screen being navigated to
            if (scene.index === toIndex) return;
            // Hide all screens in between
            if (scene.index !== lastSceneIndex) return { opacity: 0 };
            // Slide top screen down
            return resetFromBottom;
          }

          // Animate downwards if screen has been dismissed via swipe gesture
          if (scene.route.params && scene.route.params.swiped) {
            return slideFromBottom;
          }

          return slideFromRight;
        }
      };
    },*/
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
