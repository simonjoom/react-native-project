import React, { Component } from "react";
import { TouchableOpacity, Modal, View, Text, StyleSheet } from "react-native";
import Input from "src/components/input/Input";
import { translate } from "src/i18n";
import NavigationButton from "src/components/navigation-button/NavigationButton";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Picker from "react-native-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "src/components/button/Button";
import Gradient from "src/components/gradient/Gradient";

function isEnum(str) {
  return str.indexOf("Enum") !== -1;
  //return obj.indexOf("[") !== -1 && obj.indexOf("]") !== -1;
  //it's a node like "[Product!]!","[OrderableProduct!]!","ENUM",
}
function getEnum(str) {
  return str.replace("Enum:", "").split(",");
  //return obj.indexOf("[") !== -1 && obj.indexOf("]") !== -1;
  //it's a node like "[Product!]!","[OrderableProduct!]!","ENUM",
}
function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

function isEntitie(key, obj) {
  return !(
    obj.indexOf("String") !== -1 ||
    obj.indexOf("ID") !== -1 ||
    obj.indexOf("Enum") !== -1
  );
  //return obj.indexOf("[") !== -1 && obj.indexOf("]") !== -1;
  //it's a node like "[Product!]!","[OrderableProduct!]!","ENUM",
}
function isRequired(string) {
  return string.indexOf("*") !== -1;
}
function isMany(string) {
  return string.indexOf("[") !== -1;
}
function getType(string) {
  return string
    .replace(/!/g, "")
    .replace("*", "")
    .replace("[", "")
    .replace("]", "");
}
function dup(obj) {
  return JSON.parse(JSON.stringify(obj)); // Clone source oect.
}

function removeEmpty(obj, showid) {
  const o = dup(obj); // Clone source oect.

  Object.keys(o).forEach(key => {
    if (key !== "__typename") {
      if (o[key] && isObject(o[key])) o[key] = removeEmpty(o[key]);
      // Recurse.
      else if (o[key] === undefined) delete o[key];
      // Delete undefined and null.
      //else o[key] = o[key]; // Copy value.
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
      labelid: null,
      fields: [],
      modal: [],
      root: props.root
    };
    Object.keys(props.childrenTree).forEach(key => {
      this.state.modal[key] = false;
    });
    this.index_current = 0;
    this.fetchState = this.fetchState.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);

    this.renderModal = this.renderModal.bind(this);
    // this.navigate = this.props.navigation.navigate;
    this.state.fields = dup(props.tofetch[0]);
    this.selectorName = this.state.fields["name"];
  }

  setModalVisible(type, visible) {
    console.log("setModalVisiblehelper", type);
    this.state.modal[type] = visible;
    this.forceUpdate();
  }

  renderModal(Comp, type) {
    console.log("helperrenderModal", this.state.modal[type]);
    if (this.state.modal[type])
      return (
        <Modal
          key={type}
          visible={this.state.modal[type]}
          animationType="slide"
          onRequestClose={() => this.setModalVisible(type, false)}
        >
          <Gradient>
            <Comp
              setModalVisible={this.setModalVisible}
              connected
              saveId={this.props.saveId}
              parent={this.props.root}
            />
          </Gradient>
        </Modal>
      );
  }

  validateFields() {
    console.log("validea", this.state.fields);
    //one field not filled || required  === not validated
    const array = Object.values(this.state.fields).slice(1); //delete id for validation (id is verytime the first element)
    const placeholder = Object.values(this.props.placeholder).slice(1); //delete id for validation (id is verytime the first element)
    return array.every((el, index) => !!el || !isRequired(placeholder[index]));
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

  //datas: ["USER", "PERSON"]
  renderPickerEnum(datas, selected, key) {
    console.log("fefe", datas, selected, key);
    return (
      <Picker
        showDuration={300}
        showMask={false}
        style={{
          width: 150
        }}
        selectedValue={selected}
        pickerTitleText={key}
        pickerConfirmBtnText="Ok"
        pickerData={datas}
        onValueChange={(el, index) =>
          this.setState(prevState => ({
            fields: { ...prevState.fields, [key]: el[0] }
          }))
        }
      />
    );
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
    mutate_result_select
  ) {
    const datapic = datas.map((data, i) => data[selector]);
    console.log(datapic);

    return (
      <Picker
        pickerTitleText={"currentRow"}
        showDuration={300}
        showMask={false}
        style={{
          width: 250,
          flex: 1,
          justifyContent: "space-around",
          flexDirection: "row",
          flexGrow: 0
        }}
        pickerConfirmBtnText="Remove"
        pickerData={datapic}
        index={selected}
        selectedValue={datapic ? datapic[selected] : ""}
        //onPickerConfirm={(el) => console.log(el)}
        onPickerConfirm={(el, index) => {
          this.index_current = index - 1;
          if (el) {
            this.fetchState(null, null, null, 0);
            deleteQuery({ [selector]: el[0] }).then(({ data }) => {
              const out = data[mutate_result_select];
              this.selectorName = out.name;
              // runfetch(out, out[0], out[0] ? out[0].id : "", 0)
              //this.setState({ [delete_result_select]: out, fields: out[0], labelid: out[0] ? out[0].id : "", selected: 0 })
            });
          }
        }}
        onValueChange={(el, index) => {
          this.index_current = index;
          console.log(index, el);
          if (el) {
            selectQuery({ [selector]: el[0] }).then(({ data }) => {
              const out = data[select_result_select];
              this.selectorName = out.name;

              //delete out.__typename;
              this.fetchState(null, out, out.id, index);
              //this.setState({ fields: out, labelid: out.id, selected: index })
            });
          } else {
            this.fetchState(null, null, null, index);
          }
        }}
      />
    );
  }
  renderFields(fields, placeholder, style, select_result_select, type) {
    if (fields)
      return Object.keys(fields).map((key, index) => {
        const val = fields[key];
        console.log("debug", val, placeholder, key);
        if (key !== "id" && isEntitie(key, placeholder[key])) {
          console.log("entitie:", placeholder[key]);
          const type = getType(placeholder[key]);
          const many = isMany(placeholder[key]);
          //  if (fields[key])
          return (
            <View
              style={[{ marginLeft: 10 }, stylesmall]}
              key={key + "_field_" + select_result_select + index}
            >
              <Text style={style}>{type.toUpperCase()}</Text>
              <Input
                type={"small"}
                editable={false}
                placeholder={type}
                placeholderTextColor="gray"
                style={style}
                key={key + "_field_" + select_result_select + index}
                ref={select_result_select + index}
                label={translate(key + "_" + select_result_select)}
                value={this.props.saveId[this.props.parent + "_" + type]}
                onSubmit={() =>
                  this.focusNextField(select_result_select + (index + 1))
                }
              />
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(type, true);
                }}
                style={{ alignSelf: "flex-start" }}
              >
                <Icon name="plus" size={30} style={{ padding: 10 }} />
              </TouchableOpacity>
            </View>
          );
        } else if (isEnum(placeholder[key])) {
          return (
            <>{this.renderPickerEnum(getEnum(placeholder[key]), val, key)}</>
          );
        } else {
          return (
            <Input
              autoFocus
              type={key !== "id" ? type : "small"}
              editable={key !== "id"}
              placeholder={placeholder[key]}
              placeholderTextColor="gray"
              style={style}
              key={key + "_field_" + select_result_select + index}
              ref={select_result_select + index}
              label={translate(key + "_" + select_result_select)}
              onChangeText={value =>
                this.setState(prevState => ({
                  fields: { ...prevState.fields, [key]: value }
                }))
              }
              value={val}
              onSubmit={() =>
                this.focusNextField(select_result_select + (index + 1))
              }
            />
          );
        }
      });
  }

  render() {
    const {
      tofetch,
      childrenTree,
      placeholder,
      selector,
      deleteQuery,
      selectQuery,
      upsertQuery,
      select_result_select,
      mutate_result_select
    } = this.props;
    const selected = this.state.selected;
    console.log("modalstate", this.state.modal);
    console.log("debug", this.state.fields, placeholder);
    //  const resorts = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allResorts;

    const Arr = Object.keys(childrenTree).map(key =>
      this.renderModal(childrenTree[key], key)
    );

    //{resorts && resorts.map((resort, i) => (<Title key={"tt" + i}>{resort.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        {Arr}
        {this.state.fields &&
          this.renderFields(
            this.state.fields,
            placeholder,
            styleb,
            select_result_select,
            "big"
          )}
        {this.renderPicker(
          tofetch,
          selected,
          selector,
          deleteQuery,
          selectQuery,
          select_result_select,
          mutate_result_select
        )}
        <NavigationButton
          enabled={this.validateFields()}
          text="Update"
          onPress={() => {
            if (this.validateFields())
              try {
                const toupd = { ...this.state.fields };
                toupd.namewhere = this.selectorName;
                selectQuery({ [selector]: toupd.name }).then(({ data }) => {
                  if (!data.organization)
                    upsertQuery(toupd).then(({ data }) => {
                      const out = data[mutate_result_select];
                      const item = out[this.index_current];
                      this.selectorName = item.name;
                      this.fetchState(null, item, item.id, this.index_current);
                      //  this.fetchState(null,out[out.length - 1],out[out.length - 1].id,out.length - 1 )
                      //  this.setState({ fetched_list: out, labelid: out[out.length - 1].id, selected: out.length - 1 })
                    });
                    else
                    alert("this name.exist")
                });
              } catch (err) {
                console.log(err);
              }
          }}
        />
        <NavigationButton
          enabled={this.validateFields()}
          text="Create"
          onPress={() => {
            if (this.validateFields())
              try {
                const toupd = { ...this.state.fields };
                toupd.namewhere = toupd.name;
                upsertQuery(toupd).then(({ data }) => {
                  const out = data[mutate_result_select];
                  const item = out[out.length - 1];
                  this.selectorName = item.name;
                  this.fetchState(null, item, item.id, out.length - 1);
                  //  this.fetchState(null,out[out.length - 1],out[out.length - 1].id,out.length - 1 )
                  //  this.setState({ fetched_list: out, labelid: out[out.length - 1].id, selected: out.length - 1 })
                });
              } catch (err) {
                console.log(err);
              }
          }}
        />
        {this.props.connected && (
          <Button
            style={{ marginBottom: 20 }}
            onPress={() => {
              //console.log(this.props.parent + "_" + this.props.root)
              //console.log(this.state.labelid)
              this.props.saveId[
                this.props.parent + "_" + this.props.root
              ] = this.state.labelid;
              this.props.setModalVisible(this.props.root, false);
            }}
            label={translate("Connect")}
            fontSize={14}
          />
        )}
      </KeyboardAwareCenteredView>
    );
  }
}
//
Helper.propTypes = {};
Helper.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  childrenTree: {},
  saveId: []
};

export default Helper;
