import React, { Component } from "react";
import { Text } from "react-native";

import Helper from "../helper/helper";
import Deal from "../Deal/Container";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Pipeline extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        order_nr: "",
        deals: [],
        deal_probability: "ENABLE"
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String",
      order_nr: "String",
      deals: "[Deal]",
      deal_probability: "Enum:ENABLE,DISABLE"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deletePipeline,
      pipeline,
      upsertPipeline,
      navigation,
      connected,
      parent,
      saveId,
      parentId,
      selectedId,
      setModalVisible
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updatePipeline", data.pipelines, this.props);
    //  const pipelines = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPipelines;

    let datas = data.pipelines;
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
            deleteQuery={deletePipeline}
            selectQuery={pipeline}
            upsertQuery={upsertPipeline}
            selectResultSelect="pipeline"
            mutateResultSelect="pipelines"
            setModalVisible={setModalVisible}
            root="Pipeline"
            connected={connected}
            parent={parent}
            saveId={saveId}
            parentId={parentId}
            selectedId={selectedId}
            childrenTree={{ Deal }}
          />
        )}
      </KeyboardAwareCenteredView>
    );
  }
}
//
Pipeline.propTypes = {};
Pipeline.defaultProps = {
  setModalVisible: () => {},
  parent: "",
  parentId: 0,
  selectedId: false
};

export default Pipeline;
