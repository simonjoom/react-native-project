import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { TouchableOpacity, Modal, View, Text } from "react-native";
import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import { translate } from "src/i18n";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import OrganizationPicker from "./Organization/Container";
import ProductPicker from "./Product/Container";
import StagePicker from "./Stage/Container";
import PipelinePicker from "./Pipeline/Container";
import PicturePicker from "./Picture/Container";
import DealPicker from "./Deal/Container";
import PersonPicker from "./Person/Container";
import UserPicker from "./User/Container";
import sourceReadme from "./Readme.md";

import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Gradient from "src/components/gradient/Gradient";
import Button from "src/components/button/Button";
const buttonStyle = { marginBottom: 20 };
const Readme = () => <ReactMarkdown source={sourceReadme} />;

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
      modalVisiblePerson: false,
      modalVisibleAPIREADME: false
    };
    this.renderModal = this.renderModal.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(type, visible, connected = false) {
    console.log("modalVisible" + type, visible);
    this.setState({ ["modalVisible" + type]: visible, connected });
  }

  renderModal(Comp, type, scroll) {
    const style = scroll ? { position: "absolute", display: "block" } : {};
    const closestyle = { padding: 10, alignSelf: "flex-end" };
    const Gradientstyle = scroll
      ? { padding: 10, backgroundColor: "#ffffff" }
      : { padding: 10 };
    console.log("renderModal" + type, this.state["modalVisible" + type]);
    if (this.state["modalVisible" + type])
      return (
        <Modal
          key={type}
          visible={this.state["modalVisible" + type]}
          style={style}
          onRequestClose={() => this.setModalVisible(type, false)}
        >
          <Gradient scroll={scroll} style={Gradientstyle}>
            {scroll && (
              <TouchableOpacity
                key={type + "c"}
                onPress={() => {
                  this.setModalVisible(type, false);
                }}
              >
                <Icon name="window-close" size={30} style={closestyle} />
              </TouchableOpacity>
            )}
            <Comp
              navigation={this.props.navigation}
              key={type + "cp"}
              setModalVisible={this.setModalVisible}
            />
          </Gradient>
        </Modal>
      );
  }

  renderButton = (type, pos, plural = true) => (
    <Button
      style={buttonStyle}
      position={pos}
      key={type + "but"}
      onPress={() => this.setModalVisible(type, true)}
      label={translate(plural ? type + "s" : type)}
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
    ].map(type => this.renderButton(type, "center"));
    return (
      <KeyboardAwareCenteredView>
        <Title size={18} color={Colors.text} fontStyle="italic" weight="800">
          Graphql Dynamic Backend
        </Title>
        {this.renderModal(Readme, "APIREADME", true)}
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
        {this.renderButton("APIREADME", "right", false)}
        <View>{Arr}</View>
      </KeyboardAwareCenteredView>
    );
  }
}
//
Backend.propTypes = {};
Backend.defaultProps = {};

export default Backend;
