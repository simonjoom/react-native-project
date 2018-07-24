import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Colors from 'src/statics/colors';

import Title from 'src/components/title/Title';
import Button from 'src/components/button/Button';
import NavigationButton from 'src/components/navigation-button/NavigationButton';
import { translate } from 'src/i18n';

const lawSubtitle = {
  firstPart: "Bienvenu a SkiScool"
};

//TODO: Handle 'No' case
class SecondStep extends PureComponent {
  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <NavigationButton onPress={() => this.props.previousStep()} back />
        <Title style={{ marginBottom: 20, marginTop: 10 }} color={Colors.white} size={22}>
          {translate('are_you_instructor')}
        </Title>
        <Title size={14} color={Colors.white} style={{ marginBottom: 30 }}>
          {lawSubtitle.firstPart}
        </Title>
        <Button
          style={{ marginBottom: 20 }}
          onPress={() => this.props.nextStep({ isMajor: true })}
          label={translate('yes')}
          backgroundColor={Colors.white}
          labelColor={Colors.red}
          fontSize={14}
        />
        <Button onPress={() => {}} label={translate('cancel_sign_up')} fontSize={14} />
      </View>
    );
  }
}

SecondStep.propTypes = {};
SecondStep.defaultProps = {};

export default SecondStep;
