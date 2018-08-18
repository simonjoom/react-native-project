import React, { Component } from "react"; 

import Helper from "../helper/helper";
import Pipeline from "../Pipeline/Container"; 

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
      navigation,
      connected,
      parent,
      saveId,
      parentId,
      selectedId,
      setModalVisible
    } = this.props;
    //const selected = this.state.selected;
    console.log("updateStage", data.stages, this.props);
    //  const stages = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allStages;

    let datas = data.stages;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        deleteQuery={deleteStage}
        selectQuery={stage}
        subscribe={stagesub}
        selectResultSelect="stage"
        setModalVisible={setModalVisible}
        root="Stage"
        connected={connected}
        parent={parent}
        saveId={saveId}
        parentId={parentId}
        selectedId={selectedId}
        childrenTree={{ Pipeline }}
      />
    );
  }
}
//
Stage.propTypes = {};
Stage.defaultProps = {
  setModalVisible: () => {},
  parent: "",
  parentId: 0,
  selectedId: false
};

export default Stage;
