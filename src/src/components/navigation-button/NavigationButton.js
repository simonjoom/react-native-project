import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Dimensions,Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import color from "../../statics/colors/index";
import styles from "./NavigationButton.styles";

const propTypes = {
  back: PropTypes.bool,
  enabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  dark: PropTypes.bool
};

const defaultProps = {
  back: false,
  enabled: false,
  dark: false
};
 

const NavigationButton = ({ dark, back, enabled, onPress,text }) => {
  return (
    <View
      style={[styles.container, { alignSelf: "flex-end" }]}
    >
      {back ? (
        <TouchableOpacity
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 40,
            right: 40
          }}
          onPress={onPress}
        >
          <Icon
            name="md-arrow-back"
            size={22}
            color={dark ? color.text : color.white}
          />
          <Text>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.touchable,
            {
              backgroundColor: enabled
                ? color.white
                : "rgba(255, 255, 255, 0.1)"
            }
          ]}
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 40,
            right: 40
          }}
          onPress={onPress}
        >
          <Icon
            name="ios-arrow-forward"
            size={22}
            color={dark ? color.text : color.red}
            style={styles.icon}
          />
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

NavigationButton.propTypes = propTypes;
NavigationButton.defaultProps = defaultProps;

export default NavigationButton;
