import { StyleSheet } from 'react-native';

import color from 'src/statics/colors';
import font from 'src/statics/fonts';

export default StyleSheet.create({
  input: {
    height: 20,
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    fontFamily: font,
  },
  inputsmall: {
    height: 10,
    fontSize: 10,
    color: color.white,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    fontFamily: font,
  },
  inputIcon: {
    position: 'absolute',
    right: 5,
    top: 25,
  },
  label: {
    color: color.white,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: font,
    backgroundColor: 'transparent',
  },
  labelsmall: {
    color: color.white,
    fontSize: 8,
    fontWeight: 'bold',
    fontFamily: font,
    backgroundColor: 'transparent',
  },
  helper: {
    fontSize: 12,
    color: color.white,
    fontWeight: '400',
    fontStyle: 'italic',
    fontFamily: font,
    paddingTop: 8,
  },
});
