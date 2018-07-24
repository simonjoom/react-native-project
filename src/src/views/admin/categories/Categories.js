import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';

import Colors from 'src/statics/colors';
import Title from 'src/components/title/Title';
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from 'src/components/layout/KeyboardAwareCenteredView';

class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, data: { error }, loading, deleteCategory, option, upsertCategory,navigation } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateCategory", data.categories,this.props)
    //  const categories = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allCategories;

    const categories = data.categories;
    //{categories && categories.map((option, i) => (<Title key={"tt" + i}>{option.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        {error && error.graphQLErrors && <Text>Bad: {error.graphQLErrors.map(({ message }, i) => (
          <Text key={i}>{message}</Text>
        ))}
        </Text>}

         {!error && categories && categories.length > 0 && <Helper tofetch={categories}
          selector="name" 
          //navigation={navigation}
          deleteQuery={deleteCategory} 
          selectQuery={option}
          upsertQuery={upsertCategory}
          select_result_select='option' mutate_result_select='categories'
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
Category.propTypes = {};
Category.defaultProps = {
  setModalVisible: () => { }
};

export default Category;

//{!error && categories && categories.length > 0 ?this.renderPicker(categories, selected, "name", deleteCategory, option, 'option', 'allCategories', this.fetchState) : null}

