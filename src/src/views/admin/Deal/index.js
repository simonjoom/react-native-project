import React, { Component } from "react";
import Helper from "../helper/helper";

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
      probability: "String*"
    };
  }

  render() {
    const {
      data,
      deleteDeal,
      deal,
      dealsub,
      navigation,
      connected,
      parent,
      saveId,
      parentId,
      selectedId,
      setModalVisible
    } = this.props; 
    //const selected = this.state.selected;
    console.log("updateDeal", data.deals, this.props);

    let datas = data.deals;
    if (!(datas && datas.length > 0)) datas = this.initfetch;

    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="title"
        navigation={navigation}
        deleteQuery={deleteDeal}
        subscribe={dealsub}
        selectQuery={deal}
        selectResultSelect="deal"
        setModalVisible={setModalVisible}
        root="Deal"
        connected={connected}
        parent={parent}
        saveId={saveId}
        selectedId={selectedId}
        parentId={parentId}
        childrenTree={{ User, Person, Product, Stage, Organization }}
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
