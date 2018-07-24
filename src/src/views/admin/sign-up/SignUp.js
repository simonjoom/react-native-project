import React, { Component } from "react";
import {  TouchableHighlight, Modal, View, Text } from "react-native";
import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import FinalStep from "./steps/FinalStep";
import { translate } from "src/i18n";

import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
 

class SignUp extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      isMajor: false,
      selectedShopId: "",
      email: "",
      password: ""
    };
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  nextStep(data) {
    this.setState({
      step: this.state.step + 1,
      ...data
    });
  }

  previousStep() {
    this.setState({ step: this.state.step - 1 });
  }
  
  renderCurrentStep() {
    switch (this.state.step) {
      case 1:
        return (
          <FirstStep
            navigation={this.props.navigation}
            previousStep={this.previousStep}
            nextStep={this.nextStep}
          />
        );
      case 2:
        return (
          <SecondStep
            previousStep={this.previousStep}
            nextStep={this.nextStep}
          />
        );
      case 3:
        return (
          <FinalStep
            {...this.state}
            signUp={this.props.signUp}
            navigation={this.props.navigation}
          />
        );
    }
  }

  render() {
    const { data, loading } = this.props;
    console.log("signup", this.props);
    if (data && loading) {
      return null;
    }
    const error = data ? data.error : null;

    return (
      <KeyboardAwareCenteredView>
        <View>
          {error &&
            error.graphQLErrors && (
              <Text>
                Bad:{" "}
                {error.graphQLErrors.map(({ message }, i) => (
                  <Text key={i}>{message}</Text>
                ))}
              </Text>
            )}
        </View>
        {this.renderCurrentStep()}
      </KeyboardAwareCenteredView>
    );
  }
}
//
SignUp.propTypes = {};
SignUp.defaultProps = {};

export default SignUp;
