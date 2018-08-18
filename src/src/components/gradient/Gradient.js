import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import LinearGradient from "react-native-linear-gradient";

const propTypes = {
  colors: PropTypes.array
};

const defaultProps = {
  colors: ["#000000", "#937d76", "#9bb4c9"]
};

const Gradient = ({ children, colors }) => (
  <LinearGradient colors={colors} style={[styles.gradient]}>
    <View style={[styles.container]}>{children}</View>
  </LinearGradient>
);

Gradient.propTypes = propTypes;
Gradient.defaultProps = defaultProps;
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#2980b9"
  }
});
export default Gradient;
