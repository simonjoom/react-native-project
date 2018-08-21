import React, { Component } from "react"; 

import Helper from "../helper/helper";

import Picture from "../Picture/Container";
import Product from "../Product/Container";
import Deal from "../Deal/Container";
import User from "../User/Container";
 

class Person extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        owner: null,
        email: "",
        phone: "",
        pictures: [],
        products: [],
        deals: []
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*@",
      owner: "User",
      email: "String",
      phone: "String",
      pictures: "[Picture]",
      products: "[Product]",
      deals: "[Deal]"
    };
  }

  render() {
    const {
      data,
      deletePerson,
      person,
      personsub,
      upsertPerson,
      navigation,
      connected,
      parent,
      saveId,
      parentId,
      selectedId,
      setModalVisible
    } = this.props; 
    //const selected = this.state.selected;
    console.log("updatePerson", data.persons, this.props);
    //  const persons = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPersons;

    let datas = data.persons;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        subscribe={personsub}
        deleteQuery={deletePerson}
        selectQuery={person}
        upsertQuery={upsertPerson}
        selectResultSelect="person"
        setModalVisible={setModalVisible}
        root="Person"
        connected={connected}
        parent={parent}
        saveId={saveId}
        parentId={parentId}
        selectedId={selectedId}
        childrenTree={{ Picture, Product, Deal, User }}
      />
    );
  }
}
//
Person.propTypes = {};
Person.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: null
};

export default Person;
