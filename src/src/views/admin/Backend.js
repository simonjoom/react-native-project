import React, { Component } from "react";
import { TouchableHighlight, Modal, View, Text } from "react-native";
import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import { translate } from "src/i18n";

import ResortPicker from "./resort/ResortContainer";
import ShopPicker from "./shop/ShopContainer";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

import Gradient from "src/components/gradient/Gradient";
import Button from "src/components/button/Button";

class Backend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisibleResort: false,
      modalVisibleShop: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(type,visible) {
    this.setState({ ["modalVisible"+type]: visible });
  }

  renderModal(Comp,type) {
    return (
      <Modal
      key={type}
        visible={this.state["modalVisible"+type]}
        animationType="slide"
        onRequestClose={() => this.setModalVisible(type,false)}
      >
        <Gradient>
          <Comp setModalVisible={this.setModalVisible} />
        </Gradient>
      </Modal>
    );
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
          <Title size={14} color={Colors.text}>
            Create Resort
          </Title>
          {this.renderModal(ResortPicker,"Resort")}
          {this.renderModal(ShopPicker,"Shop")}
          {error &&
            error.graphQLErrors && (
              <Text>
                Bad:{" "}
                {error.graphQLErrors.map(({ message }, i) => (
                  <Text key={i}>{message}</Text>
                ))}
              </Text>
            )}
          {!this.state.modalVisible && (
            <View>
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => this.setModalVisible("Resort",true)}
              label={translate("Create_resort")}
              fontSize={14}
            />
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => this.setModalVisible("Shop",true)}
              label={translate("Shop")}
              fontSize={14}
            />
           </View> 
          )}
      </KeyboardAwareCenteredView>
    );
  }
}
//
Backend.propTypes = {};
Backend.defaultProps = {};

export default Backend;
