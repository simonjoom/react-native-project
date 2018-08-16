import React, { Component } from "react";
import { Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

import Organization from "../Organization/Container";
class User extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        email: "",
        company: null,
        password: "",
        firstName: "",
        lastName: "",
        active_flag: "NOTACTIVATED",
        role: "USER"
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*",
      email: "String*",
      company: "Organization",
      password: "String*",
      firstName: "String",
      lastName: "String",
      active_flag: "Enum:NOTACTIVATED,ACTIVATED",
      role: "Enum:USER,PERSON"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteUser,
      user,
      upsertUser,
      navigation,
      connected,
      parent,
      parentId,
      selectedId,
      saveId,
      setModalVisible
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateUser", data.users, this.props);
    //  const users = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allUsers;

    let datas = data.users;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    //{users && users.map((user, i) => (<Title key={"tt" + i}>{user.name}</Title>))}
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
            deleteQuery={deleteUser}
            selectQuery={user}
            upsertQuery={upsertUser}
            selectResultSelect="user"
            mutateResultSelect="users"
            setModalVisible={setModalVisible}
            root="User"
            parent={parent}
            saveId={saveId}
            selectedId={selectedId}
            parentId={parentId}
            connected={connected}
            childrenTree={{ Organization }}
          />
        )}
      </KeyboardAwareCenteredView>
    );
  }
}
//
User.propTypes = {};
User.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: false
};

export default User;
