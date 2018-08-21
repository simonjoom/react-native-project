import React, { Component } from "react"; 
import Helper from "../helper/helper";
import Deal from "../Deal/Container";
import User from "../User/Container";  

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
      name: "String*@",
      unit: "String",
      code: "String",
      owner: "User",
      deals: "[Deal]"
    };
  }

  render() {
    const {
      data,
      deleteProduct,
      product,
      navigation,
      connected,
      upsertProduct,
      parent,
      saveId,
      parentId,
      selectedId,
      productsub,
      setModalVisible
    } = this.props;

    //  const products = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allProducts;

    let datas = data.products;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    //{products && products.map((product, i) => (<Title key={"tt" + i}>{product.name}</Title>))}
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        deleteQuery={deleteProduct}
        upsertQuery={upsertProduct}
        selectQuery={product}
        subscribe={productsub}
        selectResultSelect="product"
        setModalVisible={setModalVisible}
        root="Product"
        connected={connected}
        parent={parent}
        saveId={saveId}
        parentId={parentId}
        selectedId={selectedId}
        childrenTree={{ User, Deal }}
      />
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
