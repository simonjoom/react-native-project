import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

import User from "../User/Container";
import Person from "../Person/Container";
import Product from "../Product/Container";
import Stage from "../Stage/Container";
import Organization from "../Organization/Container";

class Deal extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        title: "",
        value: "",
        currency: "",
        owner: null,
        org: null,
        participants: [],
        products: [],
        stage: null,
        status: ["OPEN", "WON", "LOST", "DELETED"],
        probability: ""
      }
    ];
    this.initplaceholder = {
      id: "ID",
      title: "String*",
      value: "String*",
      currency: "String*",
      owner: "User",
      org: "Organization",
      participants: "[Person]*",
      products: "[Product]*",
      stage: "Stage",
      status: "Enum",
      probability: "String*"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteDeal,
      deal,
      upsertDeal,
      navigation,
      connected,
      parent,
      setModalVisible
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateDeal", data.deals, this.props);

    let datas = data.deals;
    if (!(datas && datas.length > 0)) datas = this.initfetch;

    return (
      <KeyboardAwareCenteredView>
        {error &&
          error.graphQLErrors && (
            <Text>
              Bad:{" "}
              {error.graphQLErrors.map(({ message }, i) => (
                <Text key={i}>{message}</Text>
              ))}
            </Text>
          )}

        {!error && (
          <Helper
            tofetch={datas}
            placeholder={this.initplaceholder}
            selector="title"
            navigation={navigation}
            deleteQuery={deleteDeal}
            selectQuery={deal}
            upsertQuery={upsertDeal}
            select_result_select="deal"
            mutate_result_select="deals"
            setModalVisible={setModalVisible}
            root="Deals"
            connected={connected}
            parent={parent}
            childrenTree={{ User, Person, Product, Stage, Organization }}
          />
        )}

        <TouchableHighlight
          onPress={() => {
            setModalVisible("Deal", false);
          }}
        >
          <Title size={14} color={Colors.text}>
            X
          </Title>
        </TouchableHighlight>
      </KeyboardAwareCenteredView>
    );
  }
}

Deal.propTypes = {};
Deal.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: false
};

export default Deal;
