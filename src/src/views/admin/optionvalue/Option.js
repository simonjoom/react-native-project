import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Option extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: ""
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String" 
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteOptionValue,
      optionValue,
      upsertOptionValue,
      navigation
    } = this.props;
    if (data && loading) {
      return null;
    }

    //  const options = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allOptions;
    let datas = data.optionValues;
    if (!(datas && datas.length > 0)) datas = this.initfetch;

    //{options && options.map((option, i) => (<Title key={"tt" + i}>{option.name}</Title>))}
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
            selector="id"
            navigation={navigation}
            deleteQuery={deleteOptionValue}
            selectQuery={optionValue}
            upsertQuery={upsertOptionValue}
            select_result_select="optionValue"
            mutate_result_select="optionValues"
          />
        )}

        <TouchableHighlight
          onPress={() => {
            this.props.setModalVisible("OptionValue", false);
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
Option.propTypes = {};
Option.defaultProps = {
  setModalVisible: () => {}
};

export default Option;

//{!error && options && options.length > 0 ?this.renderPicker(options, selected, "name", deleteOption, option, 'option', 'allOptions', this.fetchState) : null}
