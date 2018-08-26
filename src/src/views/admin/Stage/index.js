import React, { Component } from "react"; 

import Helper from "../helper/helper";

class Stage extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        pipeline: null,
        order_nr: "",
        deal_probability: "ENABLE"
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String",
      pipeline: "Pipeline",
      order_nr: "String",
      deal_probability: "Enum:ENABLE,DISABLE"
    };
  }

  render() {
    const {
      data,
      deleteStage,
      stage,
      stagesub,
      upsertStage,
      navigation,
      parentId,
      screenProps
    } = this.props;
    //const selected = this.state.selected;
    console.log("updateStage", data.stages, this.props);
    //  const stages = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allStages;
    const passProps = {
      ...this.props.navigation.state.params,
    };
    let datas = data.stages;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        upsertQuery={upsertStage}
        deleteQuery={deleteStage}
        selectQuery={stage}
        subscribe={stagesub}
        selectResultSelect="stage"
        root="Stage"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
Stage.propTypes = {};
Stage.defaultProps = {
  parent: "",
  parentId: 0,
  selectedId: false
};

export default Stage;
