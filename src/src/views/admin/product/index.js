import React, { Component } from "react";
import { Text } from "react-native";
import Helper from "../helper/helper";
import Deal from "../Deal/Container";
import User from "../User/Container";
import KeyboardAwareCenteredView from "src/components/layout/KeyboardAwareCenteredView";

class Product extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: "",
        unit: "",
        code: "",
        owner: null,
        deals: []
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*",
      unit: "String",
      code: "String",
      owner: "User",
      deals: "[Deal]"
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
      navigation,
      connected,
      parent,
      saveId,
      parentId,
      selectedId,
      setModalVisible
    } = this.props;
    if (data && loading) {
      return null;
    }
    //  const products = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allProducts;

    let datas = data.products;
    console.log("ProductProps",this.props)
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
            selector="name"
            navigation={navigation}
            deleteQuery={deleteProduct}
            selectQuery={product}
            upsertQuery={upsertProduct}
            selectResultSelect="product"
            mutateResultSelect="products"
            setModalVisible={setModalVisible}
            root="Product"
            connected={connected}
            parent={parent}
            saveId={saveId}
            parentId={parentId}
            selectedId={selectedId}
            childrenTree={{User, Deal }}
          />
        )}
      </KeyboardAwareCenteredView>
    );
  }
}
//
Product.propTypes = {};
Product.defaultProps = {
  setModalVisible: () => {},
  connected: false,
  parent: "",
  parentId: 0,
  selectedId: false
};

export default Product;
