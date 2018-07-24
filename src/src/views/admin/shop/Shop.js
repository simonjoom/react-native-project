import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        name: "",
        address: "",
        zipCode: "",
        city: "",
        phoneNumber: "",
        openingHours: "",
        MOTD: "",
        products: "",
        newProducts: "",
        bestSellerProducts: ""
      }
    ];
    this.initplaceholder = {
      name: "String!", //use the first as unique key
      address: "String!",
      zipCode: "String!",
      city: "String!",
      phoneNumber: "String!",
      openingHours: "String!",
      MOTD: "String",
      products: "[Product!]!",
      newProducts: "[OrderableProduct!]!",
      bestSellerProducts: "[OrderableProduct!]!"
    };
  }

  render() {
    const {
      data,
      data: { error },
      loading,
      deleteShop,
      shop,
      upsertShop,
      navigation
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateShop", data.shops, this.props);
    //  const shops = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allShops;

    let datas = data.shops;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    const selector = Object.keys(this.initplaceholder)[0];
    //{shops && shops.map((shop, i) => (<Title key={"tt" + i}>{shop.name}</Title>))}
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
            selector={selector}
            navigation={navigation}
            deleteQuery={deleteShop}
            selectQuery={shop}
            upsertQuery={upsertShop}
            select_result_select="shop"
            mutate_result_select="shops"
          />
        )}

        <TouchableHighlight
          onPress={() => {
            this.props.setModalVisible(false);
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
Shop.propTypes = {};
Shop.defaultProps = {
  setModalVisible: () => {}
};

export default Shop;

//{!error && shops && shops.length > 0 ?this.renderPicker(shops, selected, "name", deleteShop, shop, 'shop', 'allShops', this.fetchState) : null}
