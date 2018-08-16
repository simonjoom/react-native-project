import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import styles from "./Login.styles";
import color from "src/statics/colors";
import { translate } from "src/i18n";
import Logo from 'src/svgcomp';

import NavigationButton from "src/components/navigation-button/NavigationButton";
import Title from "src/components/title/Title";
import Button from "src/components/button/Button";
//import { SimpleLineIcons as Icon } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { NavigationActions } from "react-navigation"; 
const Login = props => (
  <View style={styles.container}>
  
    <Logo id="feature-svg-component" />
    <Title style={{ marginBottom: 120 }} color={color.white} size={32}>
      SkiScool
    </Title>
    <Button
      onPress={() => props.navigation.navigate('Backend')}
      label={translate('Backend')}
      backgroundColor={color.white}
      labelColor={color.red}
      fontSize={14}
    />
    <View
      style={{
        width: 250,
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <Icon name="social-google" size={22} color={color.white} />
      <Icon name="social-facebook" size={22} color={color.white} />
      <Icon name="social-instagram" size={22} color={color.white} />
    </View>
  </View>
);

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
