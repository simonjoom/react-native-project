import React from "react";
import { 
    Button
  } from "react-native";
import LayoutScreen from "../components/layout/Container";
import Gradient from "../components/gradient/Gradient";


export const MainScreen = ({ navigation,screenProps, ChildrenComp, title }) => {
    return (
      <Gradient>
      <LayoutScreen title={title + " Screen"} navigation={navigation} screenProps={screenProps}>
        <ChildrenComp navigation={navigation} />
        <Button onPress={() => navigation.navigate("Login")} title="Login" />
      </LayoutScreen>
      </Gradient>
    );
  };
