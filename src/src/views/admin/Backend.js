import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import {
  TouchableOpacity,
  BackHandler,
  View,
  Text,
  Platform
} from "react-native";
import dismissableStackNavigator from "src/helpers";
import { createStackNavigator } from "react-navigation";
import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import { translate } from "src/i18n";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Drawer } from "src/App";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";
import Gradient from "src/components/gradient/Gradient";
import Button from "src/components/button/Button";
const buttonStyle = { marginBottom: 20 };
//const Readme = () => <ReactMarkdown source={sourceReadme} />;

const WrappLayout = WrappedComponent => {
  return class wrapp extends Component {
    constructor(props) {
      super(props);
      this.backButtonListener = null;
    }
    callback = event => {
      if (event.key === "Escape" || event.keyCode === 27) {
        this.dismiss();
      }
    };
    componentWillMount() {
      if (Platform.OS == "android") {
        this.backButtonListener = BackHandler.addEventListener(
          "hardwareBackPress",
          this.dismiss
        );
      }
      if (Platform.OS == "web" && window) {
        this.backButtonListener = window.addEventListener.apply(
          window,
          ["keydown", this.callback],
          false
        );
      }
    }

    componentWillUnmount() {
      if (Platform.OS == "android" && this.backButtonListener) {
        this.backButtonListener.remove();
      } else if (Platform.OS == "web")
        window.removeEventListener.apply(
          window,
          ["keydown", this.callback],
          false
        );
    }

    dismiss = () => {
      console.log(this.props);
      this.props.screenProps.dismiss();
      return true;
    };

    render() {
      const { scroll } = this.props.screenProps;
      const style = scroll ? { position: "absolute", display: "block" } : {};
      const closestyle = { padding: 10, alignSelf: "flex-end" };
      const Gradientstyle = scroll
        ? { padding: 10, backgroundColor: "#ffffff" }
        : { padding: 10 };
      return (
        <KeyboardAwareCenteredView style={style}>
          <Gradient scroll={scroll} style={Gradientstyle}>
            <TouchableOpacity
              onPress={() => {
                this.dismiss();
              }}
            >
              <Icon name="window-close" size={30} style={closestyle} />
            </TouchableOpacity>
            <WrappedComponent {...this.props} />
          </Gradient>
        </KeyboardAwareCenteredView>
      );
    }
  };
};

class TestAsync extends Component {
  state = {
    AsyncComponent: () => <View />
  };
  WrappMarkdown = md => <ReactMarkdown source={md} />;
  async componentDidMount() {
    const { navigation } = this.props;
    let routeName = navigation.state.routeName;

    //find last User_Organisation_Product ==> Product
    var pos = routeName.lastIndexOf("_") + 1;
    routeName = routeName.slice(pos);

    this.scroll = routeName === "APIREADME";
    const module =
      routeName === "APIREADME"
        ? await import(`./Readme.md`)
        : await import(`./${routeName}/Container`);
    let md = module.default;
    const modulef =
      routeName === "APIREADME" ? () => this.WrappMarkdown(md) : md;
    this.setState({ AsyncComponent: WrappLayout(modulef) });
  }

  render() {
    const { navigation, screenProps } = this.props;
    screenProps.scroll = this.scroll;
    const { AsyncComponent } = this.state;
    return (
      <AsyncComponent
        banner={navigation.state.routeName}
        navigation={navigation}
        screenProps={screenProps}
      />
    );
  }
}
/*
function createRouteScene(routes) {
  const Routes = {};
  routes.forEach(element => {
    Routes[element] = {};
    Routes[element].path = element;
    Routes[element].screen = TestAsync;
  });
  return Routes;
}
export const Routes = array => createRouteScene(array);*/
//Routes["Organization"].screen.setParams({ folder: "Organization" });

//export const runBackend = Routes =>
export class RunBackend extends Component {
  renderButton = (type, pos, plural = true) => (
    <Button
      style={buttonStyle}
      position={pos}
      key={type + "but"}
      onPress={() => {
        //this.setModalVisible(type, true)
        //    const { path, params, screen } = Routes[type];
        const action = Drawer.router.getActionForPathAndParams(type, {});
        this.props.navigation.navigate(type, {}, action);
      }}
      label={translate(plural ? type + "s" : type)}
      fontSize={14}
    />
  );

  render() {
    const { data, error, navigation } = this.props;
    console.log(this.props);
    if (data && data.loading) {
      return null;
    }

    return (
      <KeyboardAwareCenteredView>
        <Title size={18} color={Colors.text} fontStyle="italic" weight="800">
          Graphql Dynamic Backend
        </Title>

        {this.renderButton("APIREADME", "right", navigation, false)}
        {error &&
          error.graphQLErrors && (
            <Text>
              Bad:{" "}
              {error.graphQLErrors.map(({ message }, i) => (
                <Text key={i}>{message}</Text>
              ))}
            </Text>
          )}
        <View>
          {this.props.Routes.filter(a => a !== "APIREADME").map(routeName =>
            this.renderButton(routeName, "center", navigation)
          )}
        </View>
      </KeyboardAwareCenteredView>
    );
  }
}

export default class BackendFoo {
  constructor(obj) {
    this.routes = obj;
    this.Routes = {};
    this.arr_child = {};
  }
  createRouteScene() {
    Object.keys(this.routes).map(key => {
      this.arr_child[key] = {};
      //this.Routes[el].path = el;
      this.arr_child[key] = { [key]: TestAsync };
      this.routes[key].map(elc => { 
        this.arr_child[key][key + "_" + elc] = dismissableStackNavigator(
          { [key + "_" + elc]: TestAsync },
          {
            headerMode: "none"
          }
        );
      });
      this.Routes[key] = createStackNavigator(this.arr_child[key], {
        headerMode: "none"
      });
    });
    console.log(this.routes);
    /*   this.routes.forEach(element => {
  //    this.Routes[element] = {};
    //  this.Routes[element].path = element + "p";
 

      this.Routes[element] = TestAsync;
    }); */
    console.log(this.Routes);
    return this.Routes;
  }
}
