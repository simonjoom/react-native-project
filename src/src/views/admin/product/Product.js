import React, { Component } from "react";
import { TouchableHighlight, Text } from "react-native";

import Colors from "src/statics/colors";
import Title from "src/components/title/Title";
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Product extends Component {
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
      deleteProduct,
      product,
      upsertProduct,
      navigation
    } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateProduct", data.products, this.props);
    //  const products = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allProducts;

    let datas = data.shops;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    const selector = Object.keys(this.initplaceholder)[0];
    //{products && products.map((product, i) => (<Title key={"tt" + i}>{product.name}</Title>))}
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
            deleteQuery={deleteProduct}
            selectQuery={product}
            upsertQuery={upsertProduct}
            select_result_select="product"
            mutate_result_select="products"
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
Product.propTypes = {};
Product.defaultProps = {
  setModalVisible: () => {}
};

export default Product;

//{!error && products && products.length > 0 ?this.renderPicker(products, selected, "name", deleteProduct, product, 'product', 'allProducts', this.fetchState) : null}
