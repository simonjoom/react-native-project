import React, { Component } from "react";
import Helper from "../helper/helper";
import { createSwitchNavigator } from "react-navigation";

//import { mRoute } from "src/config/AdminStack";
//import Person from "../Person/Container";
//import User from "../User/Container";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        owner: null,
        persons: []
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*@",
      owner: "User",
      persons: "[Person]"
    };
  }

  render() {
    const {
      data,
      deleteOrganization,
      upsertOrganization,
      organization,
      organizationsub,
      screenProps,
      navigation,
      parentId,
    } = this.props;

    //const selected = this.state.selected;
    console.log("updateOrganization", data.organizations, this.props);
    //  const organizations = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allOrganizations;

    let datas = data.organizations;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    const passProps = {
      ...this.props.navigation.state.params
    };
/*
    const SwitchChildren = createSwitchNavigator({
      Person: mRoute.Routes["Person"],
      User: mRoute.Routes["User"]
    });*/
    
    //{organizations && organizations.map((organization, i) => (<Title key={"tt" + i}>{organization.name}</Title>))}
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        subscribe={organizationsub}
        navigation={navigation}
        deleteQuery={deleteOrganization}
        upsertQuery={upsertOrganization}
        selectQuery={organization}
        selectResultSelect="organization"
        root="Organization"
        parentId={parentId} 
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
Organization.propTypes = {};
Organization.defaultProps = {
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: null
};

export default Organization;
