import React, { Component } from "react";
import { TouchableOpacity, Modal, View, Text } from "react-native";
import Input from "src/components/input/Input";
import { translate } from "src/i18n";
import NavigationButton from "src/components/navigation-button/NavigationButton";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Picker from "react-native-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "src/components/button/Button";
import Gradient from "src/components/gradient/Gradient";
import CompUpload from "../Upload/Container";

function isFile(str) {
  return str.indexOf("File") !== -1;
}
function isEnum(str) {
  return str.indexOf("Enum") !== -1;
}
function getEnum(str) {
  return str.replace("Enum:", "").split(",");
}
function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

function isEntitie(str) {
  return !(
    isFile(str) ||
    str.indexOf("String") !== -1 ||
    str.indexOf("ID") !== -1 ||
    str.indexOf("Enum") !== -1
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
function removeEmpty(obj, showid) {
  if (Array.isArray(obj)) return obj.map(o => removeEmpty(o));
  const o = Object.assign({}, obj);
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
const styleInput = { flexGrow: 5, marginTop: 5, marginLeft: 10 };
const stylerow = { marginLeft: 10, flexDirection: "row" };
const rowMargin = { marginBottom: 10, alignSelf: "flex-start" };

class Helper extends Component {
  constructor(props) {
    super(props);
    const datas = props.tofetch;
    this.index_current = 0;
    if (props.selectedId)
      datas.forEach((data, i) => {
        if (data.id === props.selectedId) this.index_current = i;
      });
    this.state = {
      FileOut: {},
      tofetch: [...datas],
      selected: this.index_current,
      row: datas[this.index_current],
      fields: removeEmpty(datas[this.index_current]),
      modal: [],
      root: props.root,
      subscription: null
    };
    console.log("datas", this.state.tofetch);
    Object.keys(props.childrenTree).forEach(key => {
      this.state.modal[key] = false;
    });
    this.selectedId = [];
    this.fetchState = this.fetchState.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.saveId = this.saveId.bind(this);
    this.prepareFordtb = this.prepareFordtb.bind(this);
    this.addInCollection = this.addInCollection.bind(this);
    this.removeInCollection = this.removeInCollection.bind(this);
    this.updateInCollection = this.updateInCollection.bind(this);
    this.renderModal = this.renderModal.bind(this);
    // this.navigate = this.props.navigation.navigate;
    this.selectorVal = this.state.fields[props.selector];
  }

  componentDidMount() {
    const that = this;
    this.handle = this.props.subscribe().subscribe({
      next({ data }) {
        console.log("Received key command: ", data);
        console.log("that.index_current", that.index_current);
        if (data) {
          const el = data[that.props.selectResultSelect];
          if (el.mutation === "CREATED") {
            const out = el.node;
            that.index_current = that.state.tofetch.length;
            const res = that.addInCollection(out);
            that.fetchState(out, that.index_current, res);
          } else if (el.mutation === "DELETED") {
            const out = el.previousValues;
            that.index_current = that.index_current - 1;
            const collec = that.removeInCollection(out);
            const curr = collec[0];
            that.selectorVal = curr ? curr[that.props.selector] : "";
            that.fetchState(curr, 0, collec);
          } else if (el.mutation === "UPDATED") {
            const out = el.node;
            that.selectorVal = out[that.props.selector];
            that.fetchState(
              out,
              that.index_current,
              that.updateInCollection(out)
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
    //toupd.namewhere = this.selectorVal;
    if (selector === "id" || !toupd.id) return upsertQuery(toupd);
    else
      return selectQuery({ [selector]: toupd[selector] }).then(
        ({ data }) => {
          const te = data[this.props.selectResultSelect];
          if (te && te.id !== toupd.id) return ErrorP(error);
          else return upsertQuery(toupd);
        },
        reason => {
          return ErrorP(reason);
        }
      );
  };
  updateInCollection = object => {
    const collection = this.state.tofetch;
    return collection.reduce(function(tally, el) {
      var pick = el.id === object.id ? object : el;
      tally.push(pick);
      return tally;
    }, []);
  };
  addInCollection = object => {
    const collection = this.state.tofetch;
    return [...collection, object];
  };
  removeInCollection = object => {
    const collection = this.state.tofetch;
    return collection.filter(tally => tally.id !== object.id);
  };

  prepareFordtb = (object, wherecheck) => {
    let outobj = {};
    Object.keys(object).map((key, index) => {
      const vals = object[key];
      const placehold = this.props.placeholder[key];
      if (isEntitie(placehold)) {
        const many = isMany(placehold);

        if (many) {
          const mapids = vals.map(val => ({
            id: val.id ? val.id : val
          }));
          outobj[key] =
            Array.isArray(vals) && !vals.length
              ? { connect: [] }
              : { connect: mapids };
        } else {
          outobj[key] =
            vals == null ? {} : { connect: { id: vals.id ? vals.id : vals } };
        }
      } else
        outobj[key] =
          isRequired(placehold) && vals === "" ? "dummy_" + key : vals;
    });
    if (this.props.selector === "id" && wherecheck) outobj.id = 0; //to create in case no id (where is set only in create)
    if (outobj.id === "") {
      delete outobj.id;
    }
    if (!wherecheck) outobj.namewhere = outobj[this.props.selector];
    //on update where defined on old
    else outobj.namewhere = wherecheck; // on create we check that the slot not exist
    console.log("debugfefef", outobj);
    return outobj;
  };
  saveId(entitie, out, wherecheck) {
    console.log("saveID", entitie, out, this);

    const selector = out.filename ? out.filename : out.id ? out.id : false;

    const obj = Object.keys(this.state.fields);
    let many = false;
    let getkey, vals, valout;
    if (entitie) {
      getkey = obj.find(key => {
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
    } else {
      getkey = out.filename ? "file" : "id";
    }
    vals = this.state.fields[getkey];
    if (!out.filename) {
      var cp;
      //find if vals already have got this data in collection (find id and add in)
      if (Array.isArray(vals)) {
        cp = vals.slice();
        cp = cp.map(o => o.id);
      }
      valout = Array.isArray(cp)
        ? (!cp.includes(selector) && cp.push(out.id) && cp) || cp
        : selector;
    } else {
      if (wherecheck) {
        valout = selector ? selector : "";
      } else {
        valout = vals === "" ? [] : vals.split(",");
        if (valout.indexOf(selector) !== -1) return;
        valout.push(selector);
        valout = valout.join();
      }
    }
    console.log("valout", valout);
    let toupd = { ...this.state.fields, [getkey]: valout };
    toupd = this.prepareFordtb(toupd, wherecheck);
    console.log("toupd", toupd);
    return this.updateDatabaseQ(toupd, "Something happend not good");
    /*.then(() =>
      this.setState(prevState => ({
        fields: { ...prevState.fields, [getkey]: connect }
      }))
    );**/
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
              parentId={this.state.fields.id}
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

  fetchState(fields, selected, tofetch) {
    const tomod = {
      fields,
      selected,
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
    console.log(datas);
    const datapic = datas.map((data, i) => data[selector]);

    if (selectedId && !this.eventpicker) {
      datas.forEach((data, i) => {
        if (data.id === selectedId) index = i;
      });
      this.index_current = index;
    }

    console.log("dataselectQuery", datapic, index);
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
        onPickerConfirm={el => {
          if (el) {
            // this.fetchState(null, null, 0);
            return deleteQuery({ [selector]: el[0] });
          }
        }}
        onValueChange={(el, index) => {
          console.log("valchange", index);
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
                    this.selectorVal = out[selector];
                    //delete out.__typename;
                    this.fetchState(out, index);
                  }
                }
                //this.setState({ fields: out, row: out.id, selected: index })
              });
            } else {
              this.fetchState(null, index);
            }
          }
        }}
      />
    );
  }
  renderFields(fields, placeholder, style, selectResultSelect, type) {
    if (fields)
      return Object.keys(placeholder).map((key, index) => {
        const val = fields[key];
        const placehold = placeholder[key];
        if (key !== "id" && isEntitie(placehold)) {
          console.log("entitie:", placehold);
          const type = getType(placehold);
          const many = isMany(placehold);
          let vals;
          if (many) vals = val.map(o => o.id);
          const isSameEntitieParent = this.props.parent === type;

          this.selectedId[type] = val && val.id ? val.id : false;
          console.log("trans", key + "_" + selectResultSelect);
          //  if (fields[key])
          return (
            <View
              style={[stylerow, rowMargin]}
              key={key + "_" + selectResultSelect + index}
            >
              {<Text style={style}>{type.toUpperCase()}</Text>}
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
                  value={this.props.parentId}
                />
              )}
              {!isSameEntitieParent && (
                <>
                  {many ? (
                    vals.map((val, i) => (
                      <Input
                        type={"small"}
                        widthAuto
                        noborder
                        editable={false}
                        placeholder={type}
                        placeholderTextColor="gray"
                        style={styleInput}
                        key={
                          key + "_field_" + selectResultSelect + index + "" + i
                        }
                        ref={selectResultSelect + index}
                        value={val}
                        onSubmit={() =>
                          this.focusNextField(selectResultSelect + (index + 1))
                        }
                      />
                    ))
                  ) : (
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
                      value={val && val.id ? val.id : val}
                      onSubmit={() =>
                        this.focusNextField(selectResultSelect + (index + 1))
                      }
                    />
                  )}

                  {(!this.state.fields[type] || (val && val.id) || many) && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(type, true);
                      }}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <Icon
                        name={val && val.id && !many ? "tooltip-edit" : "plus"}
                        size={30}
                        style={{ padding: 10 }}
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          );
        } else if (isFile(placehold)) {
          return (
            <CompUpload
              content={
                <Input
                  autoFocus
                  widthAuto
                  type={type}
                  editable={false}
                  placeholder={placeholder[key]}
                  placeholderTextColor="gray"
                  key={key + "_field_" + selectResultSelect + index}
                  ref={selectResultSelect + index}
                  label={translate(key + "_" + selectResultSelect)}
                  value={val && val.file ? val.file : val}
                />
              }
              saveUp={out => {
                return this.setState({ FileOut: out });
              }}
            />
          );
        } else if (isEnum(placehold)) {
          return <>{this.renderPickerEnum(getEnum(placehold), val, key)}</>;
        } else {
          console.log(key + "_" + selectResultSelect);
          return (
            <Input
              autoFocus
              widthAuto
              style={rowMargin}
              type={key !== "id" ? type : "small"}
              editable={key !== "id"}
              noborder={key === "id"}
              placeholder={placehold}
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
          return this.saveId(false, {
            ...this.state.fields,
            ...this.state.FileOut
          });
      }}
    />
  );
  createButton = ({ text, selector, validator, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      onPress={() => {
        if (validator) {
          console.log("create", this.state.FileOut, {
            ...this.state.fields,
            ...this.state.FileOut
          });
          return this.saveId(
            false,
            { ...this.state.fields, ...this.state.FileOut },
            this.state.fields[selector]
          );
          //let toupd = { ...this.state.fields };
          // toupd = this.prepareFordtb(toupd, toupd[selector]);
          // return upsertQuery(toupd);
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
    console.log("DEBUGS", this.state.row, this.props.selectedId);
    console.log("debugstate.fields", this.state.fields, connected);
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
        {this.props.root === "Picture" ? (
          <this.createButton
            text="Create"
            validator={this.validateFields() && this.state.FileOut.filename}
            upsertQuery={upsertQuery}
            selector={selector}
            mutateResultSelect={mutateResultSelect}
          />
        ) : (
          <this.createButton
            text="Create"
            validator={this.validateFields()}
            upsertQuery={upsertQuery}
            selector={selector}
            mutateResultSelect={mutateResultSelect}
          />
        )}

        {connected &&
          this.state.fields &&
          this.state.fields.id && (
            <Button
              onPress={() => {
                this.props.saveId(
                  this.props.root,
                  this.props.tofetch[this.index_current]
                );
                setModalVisible(this.props.root, false);
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
  watchQuery: null,
  setModalVisible: () => {},
  connected: false,
  childrenTree: {},
  parentId: 0
};

export default Helper;
