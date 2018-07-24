import React from "react";
import { 
    Button
  } from "react-native";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";

  import { LoginAdminScreen, SignUpAdminScreen } from "./src/config";

const InboxStack = createStackNavigator({
  Inbox: { screen: InboxScreen },
  Email: { screen: EmailScreen },
});

InboxStack.navigationOptions = {
  drawerLabel: 'Inbox',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name="move-to-inbox"
      size={24}
      style={{ color: tintColor }}
    />
  ),
};

const DraftsStack = createStackNavigator({
  Drafts: { screen: DraftsScreen },
  Email: { screen: EmailScreen },
});

DraftsStack.navigationOptions = {
  drawerLabel: 'Drafts',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  ),
};

