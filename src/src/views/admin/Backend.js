import React, { Component } from "react";
import { TouchableHighlight, Modal, View, Text } from "react-native";
import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import { translate } from "src/i18n";

import OrganizationPicker from "./Organization/Container";
/*import ProductPicker from "./Product/Container";
import PipelinePicker from "./Pipeline/Container";
import StagePicker from "./Stage/Container";*/
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
      modalVisiblePerson: false
    };
    this.renderModal=this.renderModal.bind(this);
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

  render() {
    const { data, loading } = this.props;
    if (data && loading) {
      return null;
    }
    const error = data ? data.error : null;

    return (
      <KeyboardAwareCenteredView>
        <Title size={14} color={Colors.text}>
          Back End
        </Title>
        {this.renderModal(
          OrganizationPicker,
          "Organization"
        )}
        {this.renderModal(
          UserPicker,
          "User"
        )}
        {this.renderModal(
          PersonPicker,
          "Person"
        )}
        {this.renderModal(
          DealPicker,
          "Deal"
        )}
        {error &&
          error.graphQLErrors && (
            <Text>
              Bad:{" "}
              {error.graphQLErrors.map(({ message }, i) => (
                <Text key={i}>{message}</Text>
              ))}
            </Text>
          )}

        <View>
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => this.setModalVisible("Organization", true)}
            label={translate("Create_Organization")}
            fontSize={14}
          />
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => this.setModalVisible("User", true)}
            label={translate("User")}
            fontSize={14}
          />
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => this.setModalVisible("Person", true)}
            label={translate("Person")}
            fontSize={14}
          />
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => this.setModalVisible("Deal", true)}
            label={translate("Deal")}
            fontSize={14}
          />
        </View>
      </KeyboardAwareCenteredView>
    );
  }
}
//
Backend.propTypes = {};
Backend.defaultProps = {};

export default Backend;
