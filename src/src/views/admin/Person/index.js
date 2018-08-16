import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";

import Picture from "../Picture/Container";
import Product from "../Product/Container";
import Deal from "../Deal/Container";

import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Person extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        email: "",
        phone: "",
        pictures: [],
        products: [],
        deals: []
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*",
      email: "String",
      phone: "String",
      pictures: "[Picture]*",
      products: "[Product]*",
      deals: "[Deal]*"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deletePerson,
      person,
      upsertPerson,
      navigation,
      connected,
      parent,
      setModalVisible
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updatePerson", data.persons, this.props);
    //  const persons = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPersons;

    let datas = data.persons;
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
            selector="name"
            navigation={navigation}
            deleteQuery={deletePerson}
            selectQuery={person}
            upsertQuery={upsertPerson}
            select_result_select="person"
            mutate_result_select="persons"
            setModalVisible={setModalVisible}
            root="Person"
            connected={connected}
            parent={parent}
            childrenTree={{ Picture: Picture, Product: Product, Deal: Deal }}
          />
        )}

        <TouchableHighlight
          onPress={() => {
            setModalVisible("Person", false);
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
Person.propTypes = {};
Person.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: false
};

export default Person;
