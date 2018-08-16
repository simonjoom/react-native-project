import React, { Component } from "react";
import { Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

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
      file: "String"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deletePicture,
      picture,
      upsertPicture,
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
    console.log("updatePicture", data.pictures, this.props);
    //  const pictures = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPictures;

    let datas = data.pictures;
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
            deleteQuery={deletePicture}
            selectQuery={picture}
            upsertQuery={upsertPicture}
            selectResultSelect="picture"
            mutateResultSelect="pictures"
            setModalVisible={setModalVisible}
            root="Picture"
            connected={connected}
            parent={parent}
            saveId={saveId}
            parentId={parentId}
            selectedId={selectedId}
            childrenTree={{}}
          />
        )}
      </KeyboardAwareCenteredView>
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
