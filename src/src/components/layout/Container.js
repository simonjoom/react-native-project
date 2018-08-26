import React from "react";
import PropTypes from "prop-types";
import {
  View,
  StatusBar,
  Platform,
  StyleSheet,
  ViewPropTypes,
  ScrollView,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Colors from "src/statics/colors";
import Title from "../title/Title";
import NavigationButton from "../navigation-button/NavigationButton";

const TopBar = props => {
  console.log(props);
  return (
    <View
      style={[
        styles.containerTitle,
        {
          //flex:"auto",
          paddingLeft: props.asScroll ? 0 : 16,
          paddingTop: props.asScroll ? 0 : 16
        }
      ]}
    >
      {props.navigation && (
        <NavigationButton
          onPress={() => props.screenProps.dismiss()}
          back
          dark
        />
      )}
      {props.title && (
        <Title
          size={22}
          color={Colors.text}
          style={{
            right: "0",
            position: "relative"
          }}
        >
          {props.title}
        </Title>
      )}
    </View>
  );
};

const Container = props => {
  console.log(props);
  if (props.asScroll) {
    return (
      <View style={[styles.container, props.containerStyle]}>
        <ScrollView
          contentContainerStyle={[styles.subContainer, props.innerStyle]}
        >
          <SafeAreaView forceInset={{ top: "always" }}>
            <TopBar {...props} />
            {props.children}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={[styles.container, props.containerStyle]}>
      <TopBar {...props} />
      <View style={[styles.subContainer, props.innerStyle]}>
        {props.children}
      </View>
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  screenProps: PropTypes.any,
  title: PropTypes.string,
  leftButton: PropTypes.node,
  asScroll: PropTypes.bool,
  innerStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight
    })
  },
  subContainer: {
    padding: 0
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    paddingRight: 0
  }
});

export default Container;

//
//backgroundColor: Colors.white,
