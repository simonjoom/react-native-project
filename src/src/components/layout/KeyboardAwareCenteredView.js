import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import styles from './KeyboardAwareCenteredView.styles';

const KeyboardAwareCenteredView = props => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {props.children}
    </KeyboardAvoidingView>
);

export default KeyboardAwareCenteredView;
