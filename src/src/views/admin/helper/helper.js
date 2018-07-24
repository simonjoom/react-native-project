import React, { Component } from "react";

import { View, Text } from "react-native";
import Input from "src/components/input/Input";
import { translate } from "src/i18n";

import NavigationButton from "src/components/navigation-button/NavigationButton";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Picker from "react-native-picker";
import { Plus } from "src/components/icons";

function isEntitie(obj) {
  return obj.indexOf("[") !== -1 && obj.indexOf("]") !== -1;
  //it's a node like "[Product!]!","[OrderableProduct!]!",
}

function removeEmpty(obj) {
  const o = JSON.parse(JSON.stringify(obj)); // Clone source oect.

  Object.keys(o).forEach(key => {
    if (key !== "__typename" && key !== "id") {
      if (o[key] && typeof o[key] === "object") o[key] = removeEmpty(o[key]);
      // Recurse.
      else if (o[key] === undefined || o[key] === null) delete o[key];
      // Delete undefined and null.
      else o[key] = o[key]; // Copy value.
    } else {
      delete o[key];
    }
  });
  return o; // Return new object.
}
const styleb = { marginBottom: 20 };
const stylesmall = { marginBottom: 8 };
class Helper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      labelid: null
    };
    this.fetchState = this.fetchState.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.renderFields = this.renderFields.bind(this);

    // this.navigate = this.props.navigation.navigate;
    this.state.fields = removeEmpty(this.props.tofetch[0]);
  }

  validateFields() {
    //one field not fulled not validated
    const array = Object.values(this.state.fields);
    return array.every(el => !!el);
  }
  focusNextField(nextField) {
    if (this.refs[nextField]) this.refs[nextField].input._node.focus();
    //else
  }

  fetchState(fetched_list, fields, labelid, selected) {
    const tomod = {
      fetched_list: fetched_list,
      fields: fields,
      labelid: labelid,
      selected: selected
    };
    console.log(removeEmpty(tomod));
    this.setState(removeEmpty(tomod));
  }
  //datas: [{name:"courchevel",id:"dazdz",...},]
  //selected:0|1|data.length-1
  //selector: 'name'
  //deleteQuery: this.props.deleteResort
  //selectQuery: this.props.resort
  //select_result_select:resort
  //delete_result_select:allResorts
  renderPicker(
    datas,
    selected,
    selector,
    deleteQuery,
    selectQuery,
    select_result_select,
    mutate_result_select,
    runfetch
  ) {
    console.log(datas, selected);
    const datapic = datas.map((data, i) => data[selector]);
    console.log(datapic);
    return (
      <Picker
        showDuration={300}
        showMask={false}
        pickerConfirmBtnText="Remove"
        pickerData={datapic}
        index={selected}
        selectedValue={datapic ? datapic[selected] : ""}
        //onPickerConfirm={(el) => console.log(el)}
        onPickerConfirm={(el, index) => {
          if (el) {
            runfetch(null, null, null, 0);
            deleteQuery({ [selector]: el[0] }).then(({ data }) => {
              const out = data[mutate_result_select];
              // runfetch(out, out[0], out[0] ? out[0].id : "", 0)
              //this.setState({ [delete_result_select]: out, fields: out[0], labelid: out[0] ? out[0].id : "", selected: 0 })
            });
          } else {
            //this.setState({ selected: index })
          }
        }}
        onValueChange={(el, index) => {
          console.log(index, el);
          if (el) {
            selectQuery({ [selector]: el[0] }).then(({ data }) => {
              const out = data[select_result_select];
              //delete out.__typename;
              runfetch(null, out, out.id, index);
              //this.setState({ fields: out, labelid: out.id, selected: index })
            });
          } else {
            runfetch(null, null, null, index);
          }
        }}
      />
    );
  }
  /*{fields[key].map(item =>
                this.renderFields(item, stylesmall, key, "small")
              )}*/
  renderFields(fields, placeholder, style, skey, type) {
    if (fields)
      return Object.keys(fields).map((key, index) => {
        if (typeof fields[key] === "object" || isEntitie(placeholder[key])) {
          console.log("array:", fields[key]);
          if (fields[key])
            return (
              <View style={[{ marginLeft: 10 }, stylesmall]} key={key + "_field_" + skey + index}>
                <Text style={style}>{key.toUpperCase()}</Text>
                <Plus navigation={this.props.navigation} route={key} />
              </View>
            );
          else return <Text key={key + "_field_" + skey + index} style={style}>{key.toUpperCase()}</Text>;
        } else {
          console.log(fields,placeholder[key]);

          return (
            <Input
              autoFocus
              type={type}
              placeholder={placeholder[key]}
              placeholderTextColor="gray"
              style={style}
              key={key + "_field_" + skey + index}
              ref={skey + index}
              label={translate(
                skey +
                  (skey !== "" ? "_" : "") +
                  key +
                  "_" +
                  this.props.select_result_select
              )}
              onChangeText={value =>
                this.setState(prevState => ({
                  fields: { ...prevState.fields, [key]: value }
                }))
              }
              value={fields[key]}
              onSubmit={() => this.focusNextField(skey + (index + 1))}
            />
          );
        }
      });
  }

  render() {
    const {
      tofetch,
      placeholder,
      selector,
      deleteQuery,
      selectQuery,
      upsertQuery,
      select_result_select,
      mutate_result_select
    } = this.props;
    const selected = this.state.selected;
    console.log("selector", tofetch);
    //  const resorts = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allResorts;

    //{resorts && resorts.map((resort, i) => (<Title key={"tt" + i}>{resort.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        {this.state.fields &&
          this.renderFields(this.state.fields,placeholder, styleb, "", "big")}
        {this.renderPicker(
          tofetch,
          selected,
          selector,
          deleteQuery,
          selectQuery,
          select_result_select,
          mutate_result_select,
          this.fetchState
        )}
        <NavigationButton
          enabled={this.validateFields()}
          onPress={() => {
            if (this.validateFields())
              try {
                upsertQuery(this.state.fields).then(({ data }) => {
                  const out = data[mutate_result_select];
                  this.fetchState(
                    null,
                    null,
                    out[out.length - 1].id,
                    out.length - 1
                  );
                  //  this.fetchState(null,out[out.length - 1],out[out.length - 1].id,out.length - 1 )
                  //  this.setState({ fetched_list: out, labelid: out[out.length - 1].id, selected: out.length - 1 })
                });
              } catch (err) {
                console.log(err);
              }
          }}
        />
      </KeyboardAwareCenteredView>
    );
  }
}
//
Helper.propTypes = {};
Helper.defaultProps = {};

export default Helper;
