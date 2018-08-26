import React, { Component } from "react"; 
import Helper from "../helper/helper"; 
 
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
      name: "String*@",
      email: "String*@",
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
      deleteUser,
      user,
      usersub,
      navigation,
      upsertUser,
      parentId,
      screenProps
    } = this.props;
    //const selected = this.state.selected;
    console.log("updateUser", data.users, this.props);
    //  const users = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allUsers;
    const passProps = {
      ...this.props.navigation.state.params,
    };
    let datas = data.users;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    //{users && users.map((user, i) => (<Title key={"tt" + i}>{user.name}</Title>))}
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        deleteQuery={deleteUser}
        upsertQuery={upsertUser}
        selectQuery={user}
        subscribe={usersub}
        selectResultSelect="user" 
        root="User"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
User.propTypes = {};
User.defaultProps = {
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: false
};

export default User;
