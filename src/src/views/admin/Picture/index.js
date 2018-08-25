import React, { Component } from "react";

import Helper from "../helper/helper";

class Picture extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        file: ""
      }
    ];
    this.initplaceholder = {
      id: "ID",
      file: "[File]"
    };
  }

  render() {
    const {
      data,
      deletePicture,
      picturesub,
      upsertPicture,
      getInfo,
      picture,
      screenProps,
      navigation,
      parentId
    } = this.props;
    //const selected = this.state.selected;
    console.log("updatePicture", data.pictures, this.props);
    //  const pictures = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPictures;
    const passProps = {
      ...this.props.navigation.state.params,
    };

    let datas = data.pictures;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="id"
        navigation={navigation}
        getInfo={getInfo}
        subscribe={picturesub}
        upsertQuery={upsertPicture}
        deleteQuery={deletePicture}
        selectQuery={picture}
        selectResultSelect="picture"
        root="Picture"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
Picture.propTypes = {};
Picture.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: false
};

export default Picture;
