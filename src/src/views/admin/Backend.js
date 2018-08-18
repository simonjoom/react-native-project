import React, { Component } from "react";
import { TouchableHighlight, Modal, View, Text } from "react-native";
import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import { translate } from "src/i18n";

import OrganizationPicker from "./Organization/Container";
import ProductPicker from "./Product/Container";
import StagePicker from "./Stage/Container";
import PipelinePicker from "./Pipeline/Container";
import PicturePicker from "./Picture/Container";
import DealPicker from "./Deal/Container";
import PersonPicker from "./Person/Container";
import UserPicker from "./User/Container";

import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

import Gradient from "src/components/gradient/Gradient";
import Button from "src/components/button/Button";

class Backend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisibleOrganization: false,
      modalVisibleUser: false,
      modalVisiblePipeline: false,
      modalVisibleStage: false,
      modalVisibleDeal: false,
      modalVisibleProduct: false,
      modalVisiblePicture: false,
      modalVisiblePerson: false
    };
    this.renderModal = this.renderModal.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(type, visible, connected = false) {
    this.setState({ ["modalVisible" + type]: visible, connected });
  }

  renderModal(Comp, type) {
    if (this.state["modalVisible" + type])
      return (
        <Modal
          key={type}
          visible={this.state["modalVisible" + type]}
          animationType="slide"
          onRequestClose={() => this.setModalVisible(type, false)}
        >
          <Gradient>
            <Comp
              setModalVisible={this.setModalVisible}
              navigation={this.props.navigation}
            />
          </Gradient>
        </Modal>
      );
  }

  renderButton = type => (
    <Button
      style={{ marginBottom: 20 }}
      key={type}
      onPress={() => this.setModalVisible(type, true)}
      label={translate(type + "s")}
      fontSize={14}
    />
  );

  render() {
    const { data, error } = this.props;

    if (data && data.loading) {
      return null;
    }
    const Arr = [
      "Organization",
      "User",
      "Person",
      "Stage",
      "Product",
      "Pipeline",
      "Picture",
      "Deal"
    ].map(type => this.renderButton(type));
    return (
      <KeyboardAwareCenteredView>
        <Title size={14} color={Colors.text}>
          Back End
        </Title>
        {this.renderModal(OrganizationPicker, "Organization")}
        {this.renderModal(UserPicker, "User")}
        {this.renderModal(PersonPicker, "Person")}
        {this.renderModal(StagePicker, "Stage")}
        {this.renderModal(ProductPicker, "Product")}
        {this.renderModal(PipelinePicker, "Pipeline")}
        {this.renderModal(PicturePicker, "Picture")}
        {this.renderModal(DealPicker, "Deal")}
        {error &&
          error.graphQLErrors && (
            <Text>
              Bad:{" "}
              {error.graphQLErrors.map(({ message }, i) => (
                <Text key={i}>{message}</Text>
              ))}
            </Text>
          )}

        <View>{Arr}</View>
      </KeyboardAwareCenteredView>
    );
  }
}
//
Backend.propTypes = {};
Backend.defaultProps = {};

export default Backend;
