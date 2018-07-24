import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';

import Colors from 'src/statics/colors';
import Title from 'src/components/title/Title';
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from 'src/components/layout/KeyboardAwareCenteredView';

class Product extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { data, data: { error }, loading, deleteProduct, product, upsertProduct,navigation } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateProduct", data.products,this.props)
    //  const products = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allProducts;

    const products = data.products;
    //{products && products.map((product, i) => (<Title key={"tt" + i}>{product.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        {error && error.graphQLErrors && <Text>Bad: {error.graphQLErrors.map(({ message }, i) => (
          <Text key={i}>{message}</Text>
        ))}
        </Text>}

         {!error && products && products.length > 0 && <Helper tofetch={products}
          selector="name" 
          navigation={navigation}
          deleteQuery={deleteProduct} 
          selectQuery={product}
          upsertQuery={upsertProduct}
          select_result_select='product' mutate_result_select='products'
        />}

        <TouchableHighlight
          onPress={() => {
            this.props.setModalVisible(false);
          }}><Title size={14} color={Colors.text}>X</Title>
        </TouchableHighlight>
      </KeyboardAwareCenteredView>
    );
  }
}
//
Product.propTypes = {};
Product.defaultProps = {
  setModalVisible: () => { }
};

export default Product;

//{!error && products && products.length > 0 ?this.renderPicker(products, selected, "name", deleteProduct, product, 'product', 'allProducts', this.fetchState) : null}

