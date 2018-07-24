import React from "react";
import { 
    Button
  } from "react-native";
import LayoutScreen from "../components/layout/Container";
import Gradient from "../components/gradient/Gradient";


export const MainScreen = ({ navigation, ChildrenComp, title }) => {
    return (
      <Gradient>
      <LayoutScreen title={title + " Screen"} navigation={navigation}>
        <ChildrenComp navigation={navigation} />
        <Button onPress={() => navigation.navigate("Login")} title="Login" />
      </LayoutScreen>
      </Gradient>
    );
  };
