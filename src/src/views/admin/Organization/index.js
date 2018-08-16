import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

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
      name: "String*",
      owner: "User",
      persons: "[Person]",
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteOrganization,
      organization,
      upsertOrganization,
      navigation,
      connected,
      parent,
      setModalVisible
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateOrganization", data.organizations, this.props);
    //  const organizations = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allOrganizations;

    let datas = data.organizations;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    //{organizations && organizations.map((organization, i) => (<Title key={"tt" + i}>{organization.name}</Title>))}
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
            selector="name"
            navigation={navigation}
            deleteQuery={deleteOrganization}
            selectQuery={organization}
            upsertQuery={upsertOrganization}
            select_result_select="organization"
            mutate_result_select="organizations"
            setModalVisible={setModalVisible}
            root="Organization"
            connected={connected}
            parent={parent}
            childrenTree={{ Person, User}}
          />
        )}
        <TouchableHighlight
          onPress={() => {
            setModalVisible("Organization",false);
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
//
Organization.propTypes = {};
Organization.defaultProps = {
  setModalVisible: () => {},
  connected:false,
  parent:false
};

export default Organization;
