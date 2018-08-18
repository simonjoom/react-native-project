import React, { PureComponent } from 'react';
//import {allShops} from '../query.gql';

import { graphql } from 'react-apollo';
import Banner from 'src/components/banner/Banner';
import { View } from 'react-native';

import Colors from 'src/statics/colors';
import Title from 'src/components/title/Title';
import Button from 'src/components/button/Button';
import NavigationButton from 'src/components/navigation-button/NavigationButton';
import { translate } from 'src/i18n';

class ThirdStep extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedShopId: null,
    };

    this.onBannerSelected = this.onBannerSelected.bind(this);
  }

  onBannerSelected({ shopId }) {
    this.setState({ selectedShopId: shopId });
  }

  render() {
    if (this.props.data.loading) {
      return null;
    }
console.log(this.props.data.allShops)
    return (
      <View>
        <View style={{ marginLeft: 20 }}>
          <NavigationButton onPress={() => this.props.previousStep()} back />
          <Title
            style={{ marginBottom: 20, marginTop: 10 }}
            color={Colors.white}
            size={22}
          >
            {translate('choose_your_store')}
          </Title>
          <Title size={14} color={Colors.white} style={{ marginBottom: 30 }}>
            {translate('change_your_store_later')}
          </Title>
        </View>
        {this.state.selectedShopId && (
          <Button
            style={{ marginLeft: 20, marginTop: 40, marginBottom: 10 }}
            label={translate('finish_sign_up')}
            onPress={() => this.props.nextStep(this.state)}
            backgroundColor={Colors.white}
            labelColor={Colors.red}
          />
        )}
      </View>
    );
  }
}

ThirdStep.propTypes = {};
ThirdStep.defaultProps = {};

export default ThirdStep;


        /*
        {
          this.props.data.allShops&&this.props.data.allShops.map(shop => (
            <Banner
              key={shop.id}
              {...shop}
              shopId={shop.id}
              selected={this.state.selectedShopId === shop.id}
              onBannerSelected={this.onBannerSelected}
            />
          ))
        }*/