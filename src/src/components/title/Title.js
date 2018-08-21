import React from "react";
import PropTypes from "prop-types";

import { Text, Platform } from "react-native";

const propTypes = {
  style: Text.propTypes.style,
  position: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  weight: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  fontStyle: PropTypes.oneOf(["normal", "italic"])
};

const defaultProps = {
  size: 16,
  weight: "normal",
  position: "center",
  color: "black",
  ...Platform.select({
    ios: { font: "Futura" },
    android: { font: "Roboto" }
  }),
  fontStyle: "normal"
};

class Title extends React.Component {
  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };
  render() {
    const {
      children,
      style,
      size,
      weight,
      color,
      font,
      fontStyle,
      position
    } = this.props;
    return (
      <Text
        ref={component => (this._root = component)}
        style={{
          ...{
            fontFamily: font,
            fontSize: size,
            fontStyle,
            fontWeight: weight,
            color: color,
            backgroundColor: "transparent",
            alignSelf:
              position === "left"
                ? "flex-start"
                : position === "right"
                  ? "flex-end"
                  : position
          },
          ...style
        }}
      >
        {children}
      </Text>
    );
  }
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;

//const Title = ({ children, style, size, weight, color, font, fontStyle }) => (
