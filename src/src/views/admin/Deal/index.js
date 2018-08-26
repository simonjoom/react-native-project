import React, { Component } from "react";
import Helper from "../helper/helper";

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
        status: "OPEN",
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
      participants: "[Person]",
      products: "[Product]",
      stage: "Stage",
      status: "Enum:OPEN,WON,LOST,DELETED",
      probability: "String"
    };
  }

  render() {
    const {
      data,
      deleteDeal,
      upsertDeal,
      deal,
      dealsub,
      navigation,
      parentId,
      screenProps
    } = this.props; 
    //const selected = this.state.selected;
    console.log("updateDeal", data.deals, this.props);

    let datas = data.deals;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    const passProps = {
      ...this.props.navigation.state.params
    };

    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="title"
        navigation={navigation}
        deleteQuery={deleteDeal}
        upsertQuery={upsertDeal}
        subscribe={dealsub}
        selectQuery={deal}
        selectResultSelect="deal"
        root="Deal"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}

Deal.propTypes = {};
Deal.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: null
};

export default Deal;
