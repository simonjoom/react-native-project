import React, { Component } from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Image
} from "react-native";
import Input from "src/components/input/Input";
import { translate } from "src/i18n";
import NavigationButton from "src/components/navigation-button/NavigationButton";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Picker from "react-native-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "src/components/button/Button";
import Gradient from "src/components/gradient/Gradient";
import CompUpload from "../Upload/Container";

const pathbase =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/static/media/"
    : "http://ns327841.ip-37-187-112.eu/static/media/";
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
    .replace("@", "")
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
      pictures: [],
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
    this.connectEntitie = this.connectEntitie.bind(this);
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
  getUniques = () => {
    const obj = Object.keys(this.props.placeholder);
    const o = obj.filter(
      key => this.props.placeholder[key].indexOf("@") !== -1
    );
    return o.map(k => translate(k + "_" + this.props.selectResultSelect));
  };
  updateDatabaseQ = toupd => {
    /*const error= 'Slot exist in DATABASE'
    const { selector, selectQuery, upsertQuery } = this.props;
    var ErrorP = reason => Promise.reject(new Error("fail " + reason));*/
    //toupd.namewhere = this.selectorVal;
    return this.props.upsertQuery(toupd).catch(reason => {
      console.log(reason);
      const un = this.getUniques();
      alert(
        "Fields already exist in database please change : " + un.join(" or ")
      );
    });
    /* if (selector === "id" || !toupd.id) return upsertQuery(toupd);
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
      );*/
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

  prepareFordtb = (object, iscreate, getkey = false, disconnectid = false) => {
    let outobj = {};
    console.log("prepareFordtb", object);
    Object.keys(object).map((key, index) => {
      const valps = object[key];
      const placehold = this.props.placeholder[key];
      if (isEntitie(placehold)) {
        const many = isMany(placehold);

        if (many) {
          let vals = valps.map(val => (val.id ? val.id : val));
          console.log(vals);
          let idtoconnect =
            getkey === getType(placehold)
              ? vals.filter(val => val !== disconnectid)
              : vals;
          let idtodisconnect =
            getkey === getType(placehold)
              ? vals.find(val => val === disconnectid)
              : undefined;
          idtoconnect = idtoconnect.map(val => ({
            id: val
          }));
          console.log(idtodisconnect);
          idtodisconnect = idtodisconnect
            ? new Array({ id: idtodisconnect })
            : undefined;
          outobj[key] =
            Array.isArray(vals) && !vals.length
              ? {}
              : removeEmpty({
                  connect: idtoconnect,
                  disconnect: idtodisconnect
                });
          console.log("tarce", outobj[key]);
        } else {
          if (valps == null) outobj[key] = {};
          else {
            const conn = { id: valps.id ? valps.id : valps };
            let idtoconnect = valps.id !== disconnectid ? conn : undefined;
            let idtodisconnect = valps.id === disconnectid ? conn : undefined;
            outobj[key] = removeEmpty({
              connect: idtoconnect,
              disconnect: idtodisconnect
            });
          }
        }
      } else
        outobj[key] =
          isRequired(placehold) && valps === "" ? "dummy_" + key : valps;
    });
    if (this.props.selector === "id" && iscreate) outobj.id = 0; //to create in case no id (where is set only in iscreate)
    if (outobj.id === "") {
      delete outobj.id;
    }
    if (!iscreate) outobj.namewhere = this.selectorVal;
    //on update where defined on old
    else outobj.namewhere = iscreate; // on create we check that the slot not exist

    console.log("trace", this.selectorVal, iscreate, outobj);
    return outobj;
  };

  saveId = iscreate => {
    let getkey, vals, valout;
    const { filename } = this.state.FileOut;
    getkey = filename ? "file" : "id";
    vals = this.state.fields[getkey];
    const selector = filename
      ? filename
      : this.state.fields.id
        ? this.state.fields.id
        : 0;

    if (filename) {
      if (!iscreate) {
        valout = selector ? selector : "";
      } else {
        // add file at the list :
        // input string "file1,file2" output "file1,file2,file3"
        valout = vals === "" ? [] : vals.split(",");
        if (valout.indexOf(selector) !== -1) return;
        valout.push(selector);
        valout = valout.join();
      }
    } else {
      valout = selector;
    }
    let toupd = {
      ...this.state.fields,
      [getkey]: valout
    };
    toupd = this.prepareFordtb(toupd, iscreate);
    return this.updateDatabaseQ(toupd);
  };

  removeId(entitie, out, selectorId) {
    let toupd = { ...this.state.fields };
    toupd = this.prepareFordtb(toupd, false, entitie, selectorId);
    return this.updateDatabaseQ(toupd);
  }

  connectEntitie(entitie, out, iscreate) {
    console.log("saveID", entitie, out, this);
    const selector = out.filename ? out.filename : out.id ? out.id : false;

    const obj = Object.keys(this.state.fields);
    let getkey, vals, valout;
    // if (entitie) {
    getkey = obj.find(key => {
      console.log(getType(this.props.placeholder[key]), entitie);
      if (getType(this.props.placeholder[key]) === entitie) {
        return true;
      }
    });
    if (!getkey) {
      console.log("traceerrorfin", getkey);
      return;
    }
    //   } else {
    //   getkey = out.filename ? "file" : "id";
    // }
    vals = this.state.fields[getkey];
    //if (!out.filename) {
    var cp;
    //find if vals already have got this data in collection (find id and add in)
    if (Array.isArray(vals)) {
      cp = vals.slice();
      cp = cp.map(o => o.id);
    }
    valout = Array.isArray(cp)
      ? (!cp.includes(selector) && cp.push(out.id) && cp) || cp
      : selector;
    // }
    let toupd = { ...this.state.fields, [getkey]: valout };
    toupd = this.prepareFordtb(toupd, iscreate);
    return this.updateDatabaseQ(toupd);
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
              connectEntitie={this.connectEntitie}
              selectedId={this.selectedId[type]}
              parent={this.props.root}
              parentId={this.state.fields.id}
            />
          </Gradient>
        </Modal>
      );
  }

  validateFields(testmore) {
    //one field not filled || required  === not validated
    if (this.state.fields) {
      const array = Object.keys(this.state.fields).slice(1); //delete id for validation (id is verytime the first element)
      console.log("debgvalidate", array, this.state.fields);
      const bool = array.every(key => {
        return (
          !!this.state.fields[key] || !isRequired(this.props.placeholder[key])
        );
      });
      return bool && testmore;
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
        const vals = fields[key];
        const placehold = placeholder[key];
        if (key !== "id" && isEntitie(placehold)) {
          console.log("entitie:", placehold);
          const type = getType(placehold);
          const many = isMany(placehold);
          const isSameEntitieParent = this.props.parent === type;

          this.selectedId[type] = vals && vals.id ? vals.id : false;
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
                      <>
                        <Input
                          type={"small"}
                          widthAuto
                          noborder
                          editable={false}
                          placeholder={type}
                          placeholderTextColor="gray"
                          style={styleInput}
                          key={
                            key +
                            "_field_" +
                            selectResultSelect +
                            index +
                            "" +
                            i
                          }
                          ref={selectResultSelect + index}
                          value={val.id}
                          onSubmit={() =>
                            this.focusNextField(
                              selectResultSelect + (index + 1)
                            )
                          }
                        />
                        <TouchableOpacity
                          onPress={() => {
                            this.removeId(type, vals, val.id);
                          }}
                          style={{ alignSelf: "flex-start" }}
                        >
                          <Icon
                            name={"minus"}
                            size={30}
                            style={{ padding: 10 }}
                          />
                        </TouchableOpacity>
                      </>
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
                      value={vals && vals.id ? vals.id : vals}
                      onSubmit={() =>
                        this.focusNextField(selectResultSelect + (index + 1))
                      }
                    />
                  )}

                  {(!this.state.fields[type] || (vals && vals.id) || many) && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(type, true);
                      }}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <Icon
                        name={
                          vals && vals.id && !many ? "tooltip-edit" : "plus"
                        }
                        size={30}
                        style={{ padding: 10 }}
                      />
                    </TouchableOpacity>
                  )}
                  {vals &&
                    vals.id && (
                      <TouchableOpacity
                        onPress={() => {
                          this.removeId(type, vals, vals.id);
                        }}
                        style={{ alignSelf: "flex-start" }}
                      >
                        <Icon
                          name={"minus"}
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
                  value={vals && vals.file ? vals.file : vals}
                />
              }
              preview={this.state.FileOut}
              saveUp={(out, allpictures) => {
                const obj = removeEmpty({
                  ...this.state,
                  FileOut: out,
                  pictures: allpictures
                });
                console.log("saveUp", obj);
                return this.setState(obj);
              }}
            />
          );
        } else if (isEnum(placehold)) {
          return <>{this.renderPickerEnum(getEnum(placehold), vals, key)}</>;
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
              value={vals && vals.id ? vals.id : vals}
              onSubmit={() =>
                this.focusNextField(selectResultSelect + (index + 1))
              }
            />
          );
        }
      });
  }

  updateButton = ({ text, validator, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      onPress={() => {
        if (validator) return this.saveId();
      }}
    />
  );

  createButton = ({ text, selector, validator, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      onPress={() => {
        if (validator) {
          return this.saveId(
            this.state.fields[selector] ? this.state.fields[selector] : -1
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
      connected,
      getInfo,
      root
    } = this.props;
    const selected = this.state.selected;
    console.log("DEBUGS", this.state.row, this.props.selectedId);
    console.log("debugstate.fields", this.state.fields, connected);
    //  const resorts = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allResorts;
    let mapPictures = [];
    console.log("trace", this.state);
    console.log("updateHelper");
    /* if (!!this.state.fields["file"]) {
      console.log("trace",this.state.fields["file"])
      this.state.fields["file"].split(",").map(file => {
        getInfo({ file }).then(data => console.log("getInfo ", data)).catch(err=>console.log(err));
      });
    }*/
    const Arr = Object.keys(childrenTree).map(key =>
      this.renderModal(childrenTree[key], key)
    );
    //{resorts && resorts.map((resort, i) => (<Title key={"tt" + i}>{resort.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(root, false);
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
          validator={this.validateFields(
            root !== "Picture" ||
              (root === "Picture" && this.state.FileOut.filename)
          )}
          error="Error Exist"
        />
        <this.createButton
          text="Create"
          validator={this.validateFields(
            root !== "Picture" ||
              (root === "Picture" && this.state.FileOut.filename)
          )}
          upsertQuery={upsertQuery}
          selector={selector}
          mutateResultSelect={mutateResultSelect}
        />

        {connected &&
          this.state.fields &&
          this.state.fields.id && (
            <Button
              onPress={() => {
                this.props.connectEntitie(
                  this.props.root,
                  this.props.tofetch[this.index_current]
                );
                setModalVisible(this.props.root, false);
              }}
              label={translate("Connect")}
              fontSize={14}
            />
          )}
        {root === "Picture" && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              width: 400,
              flexGrow: 0.4
            }}
          >
            {this.state.pictures.map(pic => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    const obj = removeEmpty({
                      ...this.state,
                      FileOut: pic
                    });
                    console.log("saveUp", obj);
                    return this.setState(obj);
                  }}
                >
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: Image.resizeMode.contain,
                      borderWidth: 1,
                      borderColor: "blue"
                    }}
                    key={pic.filename + "gl"}
                    source={{ uri: pathbase + pic.path }}
                  />
                </TouchableHighlight>
              );
            })}
          </View>
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
