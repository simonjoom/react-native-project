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
        id: "",
        title: "",
        value: "",
        currency: "",
        owner: null,
        org: null,
        participants: [],
        products: [],
        stage: null,
        status: "",
        probability: ""
      }
    ];
    this.initplaceholder = {
      id: "ID",
      title: "String*",
      value: "String*",
      currency: "String",
      owner: "User",
      org: "Organization",
      participants: "[Participant]*",
      products: "[Product]*",
      stage: "Stage",
      status: "OrderStatus",
      probability: "String*"
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

    let datas = data.products;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
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
            selector="title"
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
            this.props.setModalVisible("Product", false);
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
