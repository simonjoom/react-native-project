import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 30,
    marginBottom: 5,
    zIndex: -1,
  },
  container: {
    backgroundColor: 'transparent',
  },
  icon: {
    zIndex: 10,
  },
});
