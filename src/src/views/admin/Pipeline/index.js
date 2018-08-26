import React, { Component } from "react";

import Helper from "../helper/helper";

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
      parentId,
      screenProps
    } = this.props;
    //const selected = this.state.selected;
    console.log("updatePipeline", data.pipelines, this.props);
    //  const pipelines = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPipelines;
    const passProps = {
      ...this.props.navigation.state.params,
    };
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
        root="Pipeline"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
Pipeline.propTypes = {};
Pipeline.defaultProps = {
  parent: "",
  parentId: 0,
  selectedId: false
};

export default Pipeline;
