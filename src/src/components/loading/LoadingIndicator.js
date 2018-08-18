import React from 'react';
import { View } from 'react-native';
//import styled from 'styled-components';
import {
  ActivityIndicator
} from 'react-native'

import Title from '../title/Title';

import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../statics/fonts';

export default () => (
  <>
    <Title color={Colors.text} font={font}>
      {translate('loading')}
    </Title>
    <ActivityIndicator size="large" color={Colors.text} style={{marginTop:"10px"}} />
  </>
);
/*
const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 10px;
`;
*/