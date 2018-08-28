import React, { Component } from "react";

import Helper from "../helper/helper";

class Picture extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        file: "",
        upload: []
      }
    ];
    this.initplaceholder = {
      id: "ID",
      file: "NoDisplay",
      upload: "[File]"
    };
  }

  render() {
    const {
      data,
      deletePicture,
      picturesub,
      upsertPicture, 
      picture,
      screenProps,
      navigation,
      parentId
    } = this.props;
    //const selected = this.state.selected;
    console.log("updatePicture", data.bigpictures, this.props);
    //  const pictures = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPictures;
    const passProps = {
      ...this.props.navigation.state.params,
    };

    let datas = data.bigpictures;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="id"
        navigation={navigation} 
        subscribe={picturesub}
        upsertQuery={upsertPicture}
        deleteQuery={deletePicture}
        selectQuery={picture}
        selectResultSelect="bigpicture"
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
  connected: false, 
  parentId: 0
};

export default Picture;
