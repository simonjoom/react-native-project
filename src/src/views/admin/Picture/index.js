import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

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
            select_result_select="picture"
            mutate_result_select="pictures"
            root="Picture"
            connected={connected}
            parent={parent}
            childrenTree={{ }}
          />
        )}

        <TouchableHighlight
          onPress={() => {
            setModalVisible("Picture", false);
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
Picture.propTypes = {};
Picture.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: false
};

export default Picture;
