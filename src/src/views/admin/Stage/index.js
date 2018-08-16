import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Stage extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        pipeline: null,
        order_nr: "",
        deal_probability: ["ENABLE", "DISABLE"]
      }
    ];
    this.initplaceholder = {
      id: "ID",
      pipeline: "Pipeline",
      order_nr: "String",
      deal_probability: "Enum"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteStage,
      stage,
      upsertStage,
      navigation
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateStage", data.stages, this.props);
    //  const stages = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allStages;

    let datas = data.stages;
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
            deleteQuery={deleteStage}
            selectQuery={stage}
            upsertQuery={upsertStage}
            select_result_select="stage"
            mutate_result_select="stages"
          />
        )}

        <TouchableHighlight
          onPress={() => {
            this.props.setModalVisible("Stage", false);
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
Stage.propTypes = {};
Stage.defaultProps = {
  setModalVisible: () => {}
};

export default Stage;
