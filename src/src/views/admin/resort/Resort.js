import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';

import Colors from 'src/statics/colors';
import Title from 'src/components/title/Title';
import Helper from "../helper/helper";
import KeyboardAwareCenteredView from 'src/components/layout/KeyboardAwareCenteredView';

class Resort extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { data, data: { error }, loading, deleteResort, resort, upsertResort,navigation } = this.props;
    if (data && loading) {
      return null;
    }
    //const selected = this.state.selected;
    console.log("updateResort", data.resorts,this.props)
    //  const resorts = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allResorts;

    const resorts = data.resorts;
    //{resorts && resorts.map((resort, i) => (<Title key={"tt" + i}>{resort.name}</Title>))}
    return (
      <KeyboardAwareCenteredView>
        {error && error.graphQLErrors && <Text>Bad: {error.graphQLErrors.map(({ message }, i) => (
          <Text key={i}>{message}</Text>
        ))}
        </Text>}

         {!error && resorts && resorts.length > 0 && <Helper tofetch={resorts}
          selector="name" 
          navigation={navigation}
          deleteQuery={deleteResort} 
          selectQuery={resort}
          upsertQuery={upsertResort}
          select_result_select='resort' mutate_result_select='resorts'
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
Resort.propTypes = {};
Resort.defaultProps = {
  setModalVisible: () => { }
};

export default Resort;

//{!error && resorts && resorts.length > 0 ?this.renderPicker(resorts, selected, "name", deleteResort, resort, 'resort', 'allResorts', this.fetchState) : null}

