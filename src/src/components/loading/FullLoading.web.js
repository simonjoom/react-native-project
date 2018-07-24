import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from './LoadingIndicator';

import Colors from '../../statics/colors';

export default () => (
  <LoadingContainer>
    <LoadingIndicator />
  </LoadingContainer>
);

const LoadingContainer = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
`;
