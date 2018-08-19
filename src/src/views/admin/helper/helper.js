import React, { Component } from "react";
import { TouchableOpacity, Modal, View, Text, Image } from "react-native";
import Input from "src/components/input/Input";
import { translate } from "src/i18n";
import NavigationButton from "src/components/navigation-button/NavigationButton";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Picker from "react-native-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "src/components/button/Button";
import Gradient from "src/components/gradient/Gradient";
import CompUpload from "../Upload/Container";

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

function isEntitie(obj) {
  return !(
    obj.indexOf("String") !== -1 ||
    obj.indexOf("ID") !== -1 ||
    obj.indexOf("Enum") !== -1
  );
  //return obj.indexOf("[") !== -1 && obj.indexOf("]") !== -1;
  //it's a node like "[Product!]!","[OrderableProduct!]!","ENUM",
}
function updateInCollection(collection, object) {
  return collection.reduce(function(tally, el) {
    var pick = el.id === object.id ? object : el;
    tally.push(pick);
    return tally;
  }, []);
}
function addInCollection(collection, object) {
  return [...collection, object];
}
function removeInCollection(collection, object) {
  return collection.filter(tally => tally.id !== object.id);
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
      if (o[key] && typeof o[key] === "object") o[key] = removeEmpty(o[key]);
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
function removeField(fields, id) {
  return fields.filter(field => field.id !== id);
}
const styleb = { flexGrow: 1 };
const styleInput = { flexGrow: 5 };
const stylerow = { marginLeft: 10, flexDirection: "row" };
const rowMargin = { marginBottom: 10, alignSelf: "flex-start" };

class Helper extends Component {
  constructor(props) {
    super(props);
    const datas = props.tofetch;
    this.index = 0;
    if (props.selectedId)
      datas.forEach((data, i) => {
        if (data.id === props.selectedId) this.index = i;
      });
    this.state = {
      tofetch: [...datas],
      selected: this.index,
      labelid: null,
      fields: removeEmpty(datas[this.index]),
      modal: [],
      root: props.root,
      subscription: null
    };
    console.log("datas", this.state.tofetch);
    Object.keys(props.childrenTree).forEach(key => {
      this.state.modal[key] = false;
    });
    this.selectedId = [];
    this.index_current = -1;
    this.fetchState = this.fetchState.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.saveId = this.saveId.bind(this);

    this.renderModal = this.renderModal.bind(this);
    // this.navigate = this.props.navigation.navigate;
    this.selectorName = this.state.fields[props.selector];
  }

  /*
  componentWillReceiveProps(newProps, newstate) {
    const { tofetch, selectedId } = newProps;
    if (this.state.tofetch.length !== tofetch.length) {
      if (selectedId)
        tofetch.forEach((data, i) => {
          if (data.id === selectedId) this.index = i;
        });
      this.setState({
        tofetch: [...tofetch],
        selected: this.index,
        labelid: null,
        fields: removeEmpty(tofetch[this.index])
      });
    }
  }*/

  componentDidMount() {
    const that = this;
    this.handle = this.props.subscribe().subscribe({
      next({ data }) {
        console.log("Received key command: ", data);
        if (data) {
          const el = data[that.props.selectResultSelect];
          if (el.mutation === "CREATED") {
            const out = el.node;
            const res = addInCollection(that.state.tofetch, out);
            that.fetchState(out, out.id, res.length - 1, res);
          } else if (el.mutation === "DELETED") {
            const out = el.previousValues;
            that.selectorName = out[that.props.selector];
            that.fetchState(
              null,
              null,
              that.index,
              removeInCollection(that.state.tofetch, out)
            );
          }
        }
      },
      error(err) {
        console.log("error", err);
      },
      complete() {
        console.log("Stream complete");
      }
    });
  }
  componentWillUnmount() {
    this.handle.unsubscribe();
  }
  updateDatabaseQ = (toupd, error) => {
    const { selector, selectQuery, upsertQuery } = this.props;
    var ErrorP = reason => Promise.reject(new Error("fail " + reason));
    toupd.namewhere = this.selectorName;
    return selectQuery({ [selector]: toupd[selector] }).then(
      ({ data }) => {
        if (!data.organization) return upsertQuery(toupd);
        else return ErrorP(error);
      },
      reason => {
        return ErrorP(reason);
      }
    );
  };

  saveId(entitie, id) {
    const obj = Object.keys(this.state.fields);
    let many = false;
    const getkey = obj.find(key => {
      console.log(getType(this.props.placeholder[key]), entitie);
      if (getType(this.props.placeholder[key]) === entitie) {
        many = isMany(this.props.placeholder[key]);
        return true;
      }
    });
    if (!getkey) {
      console.log("traceerrorfin", getkey);
      return;
    }
    var cp;
    var field = this.state.fields[getkey];
    if (Array.isArray(field)) {
      cp = field.slice();
      cp = cp.map(o => o.id);
    }
    let outids = Array.isArray(cp)
      ? (!cp.includes(id) && cp.push(id) && cp) || cp
      : id;
    let out;
    if (many)
      out = outids.map(val => ({
        id: val
      }));
    else out = { id };
    const toupd = { ...this.state.fields, [getkey]: out };
    this.updateDatabaseQ(toupd, "Something happend not good").then(() =>
      this.setState(prevState => ({
        fields: { ...prevState.fields, [getkey]: out }
      }))
    );
  }

  setModalVisible(type, visible) {
    console.log("setModalVisiblehelper", type);
    this.state.modal[type] = visible;
    this.forceUpdate();
  }

  renderModal(Comp, type) {
    console.log("helperrenderModal", this.selectedId, type);
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
              saveId={this.saveId}
              selectedId={this.selectedId[type]}
              parent={this.props.root}
              parentId={this.state.labelid}
            />
          </Gradient>
        </Modal>
      );
  }

  validateFields() {
    //one field not filled || required  === not validated
    if (this.state.fields) {
      const array = Object.keys(this.state.fields).slice(1); //delete id for validation (id is verytime the first element)
      console.log("debgvalidate", array, this.state.fields);
      const bool = array.every(key => {
        return (
          !!this.state.fields[key] || !isRequired(this.props.placeholder[key])
        );
      });
      return bool;
    }
  }

  focusNextField(nextField) {
    if (this.refs[nextField]) this.refs[nextField].input._node.focus();
    //else
  }

  fetchState(fields, labelid, selected, tofetch) {
    const tomod = {
      fields: fields,
      labelid: labelid,
      selected: selected,
      tofetch: tofetch ? tofetch : undefined
    };
    console.log("rebuildHelper", removeEmpty(tomod));
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
  //selectResultSelect:resort
  //delete_result_select:allResorts
  renderPicker(
    datas,
    selected,
    selectedId,
    selector,
    deleteQuery,
    selectQuery,
    selectResultSelect
  ) {
    //console.log("renderPicker",datas.length - 1)
    var index = selected == -1 ? datas.length - 1 : selected;
    const datapic = datas.map((data, i) => data[selector]);

    if (selectedId && !this.eventpicker)
      datas.forEach((data, i) => {
        if (data.id === selectedId) index = i;
      });
    console.log("dataselectQuery", selectedId, index);
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
        index={index}
        selectedValue={datapic ? datapic[index] : ""}
        //onPickerConfirm={(el) => console.log(el)}
        onPickerConfirm={(el, index) => {
          this.index_current = index;
          if (el) {
            // this.fetchState(null, null, 0);
            deleteQuery({ [selector]: el[0] }).then(({ data }) => {
              /* const out = data["delete" + this.props.root];
              this.selectorName = out[selector];
              this.fetchState(
                null,
                null,
                0,
                removeInCollection(this.state.tofetch, out)
              );*/
              // runfetch(out, out[0], out[0] ? out[0].id : "", 0)
              //this.setState({ [delete_result_select]: out, fields: out[0], labelid: out[0] ? out[0].id : "", selected: 0 })
            });
          }
        }}
        onValueChange={(el, index) => {
          if (this.index_current != index) {
            //prevent bug onpropschangepicker
            this.index_current = index;
            this.eventpicker = true;
            if (el) {
              console.log(el[0]);
              selectQuery({ [selector]: el[0] }).then(({ data }) => {
                console.log(data, selectResultSelect);
                if (data) {
                  const out = data[selectResultSelect];
                  if (out) {
                    this.selectorName = out[selector];
                    //delete out.__typename;
                    this.fetchState(out, out.id, index);
                  }
                }
                //this.setState({ fields: out, labelid: out.id, selected: index })
              });
            } else {
              this.fetchState(null, null, index);
            }
          }
        }}
      />
    );
  }
  renderFields(fields, placeholder, style, selectResultSelect, type) {
    if (fields)
      return Object.keys(fields).map((key, index) => {
        const val = fields[key];
        console.log("debug", val, placeholder, key);
        if (key !== "id" && isEntitie(placeholder[key])) {
          console.log("entitie:", placeholder[key]);
          const type = getType(placeholder[key]);
          const many = isMany(placeholder[key]);
          let vals;
          if (many) vals = val.map(o => o.id);
          const isSameEntitieParent = this.props.parent === type;

          this.selectedId[type] = val && val.id ? val.id : false;
          console.log("isSameEntitieParent", isSameEntitieParent, type);
          console.log("renderFields.ids", this.state.fields);
          //  if (fields[key])
          return (
            <View
              style={[stylerow, rowMargin]}
              key={key + "_" + selectResultSelect + index}
            >
              <Text style={style}>{type.toUpperCase()}</Text>
              {isSameEntitieParent && (
                <Input
                  type={"small"}
                  widthAuto
                  noborder
                  editable={false}
                  placeholder={type}
                  placeholderTextColor="gray"
                  key={key + "_field_" + selectResultSelect + index}
                  style={styleInput}
                  label={translate(key + "_" + selectResultSelect)}
                  value={this.props.parentId}
                />
              )}
              {!isSameEntitieParent && (
                <>
                  <Input
                    type={"small"}
                    widthAuto
                    noborder
                    editable={false}
                    placeholder={type}
                    placeholderTextColor="gray"
                    style={styleInput}
                    key={key + "_field_" + selectResultSelect + index}
                    ref={selectResultSelect + index}
                    label={translate(key + "_" + selectResultSelect)}
                    value={
                      val && val.id
                        ? val.id
                        : !many
                          ? this.state.fields[type]
                          : vals
                    }
                    onSubmit={() =>
                      this.focusNextField(selectResultSelect + (index + 1))
                    }
                  />
                  {(!this.state.fields[type] || (val && val.id) || many) && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(type, true);
                      }}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <Icon
                        name={
                          val && val.id && !many
                            ? "square-edit-outline"
                            : "plus"
                        }
                        size={30}
                        style={{ padding: 10 }}
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
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
              widthAuto
              style={rowMargin}
              type={key !== "id" ? type : "small"}
              editable={key !== "id"}
              noborder={key === "id"}
              placeholder={placeholder[key]}
              placeholderTextColor="gray"
              key={key + "_field_" + selectResultSelect + index}
              ref={selectResultSelect + index}
              label={translate(key + "_" + selectResultSelect)}
              onChangeText={value =>
                this.setState(prevState => ({
                  fields: { ...prevState.fields, [key]: value }
                }))
              }
              value={val}
              onSubmit={() =>
                this.focusNextField(selectResultSelect + (index + 1))
              }
            />
          );
        }
      });
  }

  updateButton = ({ text, selector, mutateResultSelect, validator, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      onPress={() => {
        if (validator)
          try {
            const toupd = { ...this.state.fields };
            console.log("beforeUpdated", toupd);
            this.updateDatabaseQ(toupd, error).then(({ data }) => {
              const out = data["upsert" + this.props.root];
              console.log("afteUpdated", out);
              // const item = out[this.index_current];
              this.selectorName = out[selector];
              this.fetchState(
                out,
                out.id,
                this.index_current,
                updateInCollection(this.state.tofetch, out)
              );
            });
          } catch (err) {
            console.log(err);
          }
      }}
    />
  );
  createButton = ({
    text,
    upsertQuery,
    selector,
    mutateResultSelect,
    validator,
    error
  }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      onPress={() => {
        if (validator)
          try {
            const toupd = { ...this.state.fields, id: 0 };
            toupd.namewhere = toupd[selector];
            upsertQuery(toupd).then(({ data }) => {
              const out = data["upsert" + this.props.root];
              // const item = out[out.length - 1];
              this.selectorName = out[selector];
              this.fetchState(out, out.id, -1);
            });
          } catch (err) {
            console.log(err);
          }
      }}
    />
  );
  /*
  componentWillReceiveProps(newProps) { 
    if (newProps.tofetch.length != this.props.tofetch.length)
    this.tofetch=newProps.tofetch;
 
  }*/

  render() {
    const {
      childrenTree,
      placeholder,
      selector,
      deleteQuery,
      selectQuery,
      upsertQuery,
      selectResultSelect,
      mutateResultSelect,
      selectedId,
      setModalVisible,
      connected
    } = this.props;
    const selected = this.state.selected;
    console.log("DEBUGS", this.state.labelid, this.props.selectedId);
    console.log("debugstate.fields", this.state.fields, placeholder);
    //  const resorts = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allResorts;

    const Arr = Object.keys(childrenTree).map(key =>
      this.renderModal(childrenTree[key], key)
    );
    //{resorts && resorts.map((resort, i) => (<Title key={"tt" + i}>{resort.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(this.props.root, false);
          }}
        >
          <Icon
            name="window-close"
            size={30}
            style={{ padding: 10, alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
        {Arr}
        {this.state.fields &&
          this.renderFields(
            this.state.fields,
            placeholder,
            styleb,
            selectResultSelect,
            "big"
          )}
        {this.renderPicker(
          this.state.tofetch,
          selected,
          selectedId,
          selector,
          deleteQuery,
          selectQuery,
          selectResultSelect,
          mutateResultSelect
        )}
        <this.updateButton
          text="Update"
          validator={this.validateFields()}
          selector={selector}
          mutateResultSelect={mutateResultSelect}
          error="Error Exist"
        />
        <this.createButton
          text="Create"
          validator={this.validateFields()}
          upsertQuery={upsertQuery}
          selector={selector}
          mutateResultSelect={mutateResultSelect}
        />

        {connected &&
          (this.state.labelid || selectedId) && (
            <Button
              style={{ marginBottom: 20 }}
              onPress={() => {
                this.props.saveId(
                  this.props.root,
                  this.state.labelid || selectedId
                );
                setModalVisible(this.props.root, false);
              }}
              label={translate("Connect")}
              fontSize={14}
            />
          )}
        {this.props.root === "Picture" && <CompUpload />}
      </KeyboardAwareCenteredView>
    );
  }
}

//
Helper.propTypes = {};
Helper.defaultProps = {
  watchQuery: null,
  setModalVisible: () => {},
  connected: false,
  childrenTree: {},
  parentId: 0
};

export default Helper;
