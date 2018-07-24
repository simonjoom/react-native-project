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
      modalVisible: false,
      modalVisibleShop: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setModalVisibleShop = this.setModalVisibleShop.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisibleShop(visible) {
    this.setState({ modalVisibleShop: visible });
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType="slide"
        onRequestClose={() => this.setModalVisible(false)}
      >
        <Gradient>
          <ResortPicker setModalVisible={this.setModalVisible} />
        </Gradient>
      </Modal>
    );
  }
  renderModalShop() {
    return (
      <Modal
        visible={this.state.modalVisibleShop}
        animationType="slide"
        onRequestClose={() => this.setModalVisibleShop(false)}
      >
        <Gradient>
          <ShopPicker navigation={this.props.navigation} />
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
          {this.renderModal()}
          {this.renderModalShop()}
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
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => this.setModalVisible(true)}
              label={translate("Create_resort")}
              fontSize={14}
            />
          )}
          {!this.state.modalVisibleShop && (
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => this.setModalVisibleShop(true)}
              label={translate("Shop")}
              fontSize={14}
            />
          )}
      </KeyboardAwareCenteredView>
    );
  }
}
//
Backend.propTypes = {};
Backend.defaultProps = {};

export default Backend;
