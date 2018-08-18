import React from "react";
import styled from "styled-components/native";

import LoadingIndicator from "./LoadingIndicator";

export default () => (
  <LoadingContainer>
    <LoadingIndicator />
  </LoadingContainer>
);

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
