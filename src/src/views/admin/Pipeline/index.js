import React, { Component } from "react";

import Helper from "../helper/helper";
import Deal from "../Deal/Container";

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
      deletePipeline,
      pipeline,
      pipelinesub,
      navigation,
      upsertPipeline,
      connected,
      parent,
      saveId,
      parentId,
      selectedId,
      setModalVisible
    } = this.props;
    //const selected = this.state.selected;
    console.log("updatePipeline", data.pipelines, this.props);
    //  const pipelines = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPipelines;

    let datas = data.pipelines;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        subscribe={pipelinesub}
        upsertQuery={upsertPipeline}
        deleteQuery={deletePipeline}
        selectQuery={pipeline}
        selectResultSelect="pipeline"
        setModalVisible={setModalVisible}
        root="Pipeline"
        connected={connected}
        parent={parent}
        saveId={saveId}
        parentId={parentId}
        selectedId={selectedId}
        childrenTree={{ Deal }}
      />
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
