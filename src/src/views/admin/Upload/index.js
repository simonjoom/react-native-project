import React, { Component } from "react";
import { View, Image } from "react-native";
import NavigationButton from "src/components/navigation-button/NavigationButton";

class Uploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: null
    };
  }
  openImagePicker = e => {
    this.props.handleUpload(this.state.file).then(({ data }) => {
      if (data) return this.props.saveUp(data.singleUpload);
    });
  };
  onChangeFile = e => {
    // generate a new FileReader object
    var reader = new FileReader();
    if (e.target.validity.valid) {
      const file = e.target.files[0];
      console.log("handleUploadfile", file);
      // inject an image with the src url
      reader.onload = event => {
        console.log("handleUploadurl", event.target);
        this.setState({ url: event.target.result, file });
      };
      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { data } = this.props;
    let datas;
    //const selected = this.state.selected;
    if (data) {
      console.log("uploads", data.uploads, this.props);
      //  const pictures = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allPictures;
      datas = data.uploads;
      if (!(datas && datas.length > 0)) datas = this.initfetch;
    }

    return (
      <View>
        {this.props.content}
        <NavigationButton
          enabled={this.state.file}
          text="Upload"
          onPress={this.openImagePicker}
        />
        <input type="file" onChange={this.onChangeFile} />
        {this.state.url && (
          <Image
            style={{
              width: 300,
              height: 300,
              resizeMode: Image.resizeMode.contain,
              borderWidth: 1,
              borderColor: "red"
            }}
            source={{ uri: this.state.url }}
            alt="input"
          />
        )}
      </View>
    );
  }
}
//
Uploads.propTypes = {};
Uploads.defaultProps = {};

export default Uploads;
