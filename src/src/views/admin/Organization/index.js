import React, { Component } from "react"; 
import Helper from "../helper/helper";

import Person from "../Person/Container";
import User from "../User/Container";

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
      navigation,
      connected,
      parent,
      connectEntitie,
      parentId,
      selectedId,
      setModalVisible
    } = this.props;

    //const selected = this.state.selected;
    console.log("updateOrganization", data.organizations, this.props);
    //  const organizations = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allOrganizations;

    let datas = data.organizations;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
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
        setModalVisible={setModalVisible}
        root="Organization"
        connected={connected}
        parent={parent}
        connectEntitie={connectEntitie}
        selectedId={selectedId}
        parentId={parentId}
        childrenTree={{ Person, User }}
      />
    );
  }
}
//
Organization.propTypes = {};
Organization.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: null
};

export default Organization;
