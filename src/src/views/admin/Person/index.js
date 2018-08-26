import React, { Component } from "react"; 

import Helper from "../helper/helper";
 

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
      screenProps,
      parentId
    } = this.props; 
    //const selected = this.state.selected;
    console.log("updatePerson", data.persons, this.props);
    //  const persons = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPersons;
    const passProps = {
      ...this.props.navigation.state.params,

    };
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
        root="Person" 
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
Person.propTypes = {};
Person.defaultProps = {
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: null
};
//childrenTree={{ Picture, Product, Deal, User }}
export default Person;
