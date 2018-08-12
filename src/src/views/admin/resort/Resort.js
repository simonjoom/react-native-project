import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Resort extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        name: "",
        address: "",
        zipCode: "",
        city: "",
        description: ""
      }
    ];
    this.initplaceholder = {
      name: "String!", //use the first as unique key
      address: "String!",
      zipCode: "String!",
      city: "String!",
      description: "String"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteResort,
      resort,
      upsertResort,
      navigation
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateResort", data.resorts, this.props);
    //  const resorts = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allResorts;

    let datas = data.resorts;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    const selector = Object.keys(this.initplaceholder)[0];
    //{resorts && resorts.map((resort, i) => (<Title key={"tt" + i}>{resort.name}</Title>))}
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
            selector={selector}
            navigation={navigation}
            deleteQuery={deleteResort}
            selectQuery={resort}
            upsertQuery={upsertResort}
            select_result_select="resort"
            mutate_result_select="resorts"
          />
        )}

        <TouchableHighlight
          onPress={() => {
            this.props.setModalVisible("Resort",false);
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
Resort.propTypes = {};
Resort.defaultProps = {
  setModalVisible: () => {}
};

export default Resort;

//{!error && resorts && resorts.length > 0 ?this.renderPicker(resorts, selected, "name", deleteResort, resort, 'resort', 'allResorts', this.fetchState) : null}
