import React, { PureComponent } from 'react';
//import {allShops} from '../query.gql';

import { graphql } from 'react-apollo';
//import Banner from 'src/components/banner/Banner';
import { View } from 'react-native';
import styles from '../SignUp.styles';
import Colors from 'src/statics/colors';
import Title from 'src/components/title/Title';
import Input from 'src/components/input/Input';
//import Button from 'src/components/button/Button';
import NavigationButton from 'src/components/navigation-button/NavigationButton';
import { translate } from 'src/i18n';

class SecondStep extends PureComponent {
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

  validateFields() {
    return !!this.state.selectedShopId;
  }

  render() {
    if (this.props.data.loading) {
      return null;
    } 
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
          <Input
            autoFocus
            style={{ marginBottom: 20 }}
            label={translate('choose_your_store')}
            autoCapitalize="words"
            onChangeText={selectedShopId => this.setState({ selectedShopId })}
            value={this.state.selectedShopId}
          />
          <Title size={14} color={Colors.white} style={{ marginBottom: 30 }}>
            {translate('change_your_store_later')}
          </Title>
        </View>
        <View style={styles.nextButton}>
          <NavigationButton
            enabled={this.validateFields()}
            onPress={() => this.validateFields() && this.props.nextStep(this.state)}
          />
        </View>
        
      </View>
    );
  }
}

SecondStep.propTypes = {};
SecondStep.defaultProps = {};
export default SecondStep;
 

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
}
{this.state.selectedShopId && (
          <Button
            style={{ marginLeft: 20, marginTop: 40, marginBottom: 10 }}
            label={translate('finish_sign_up')}
            onPress={() => this.props.nextStep(this.state)}
            backgroundColor={Colors.white}
            labelColor={Colors.red}
          />
        )}*/