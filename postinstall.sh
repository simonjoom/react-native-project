#!/bin/bash
# deep copy script
export NOYARNPOSTINSTALL="yes"
# yarn add react-dev-utils@6.0.0-next.3e165448
cp -Rf ./babel-preset-react-app ./node_modules/
cp -Rf ./metro-react-native-babel-preset ./node_modules/
cp -Rf ./react-native-vector-icons ./node_modules/
cp -Rf ./react-native-web ./node_modules/
cp -Rf ./eslint-config-react-app ./node_modules/
cp -Rf ./react-dev-utils ./node_modules/
cp -Rf ./react-scripts ./node_modules/
rm -Rf ./node_modules/expo-web/node_modules/
cp -Rf ./babel-eslint ./node_modules/
echo "Succeed! The Web-App is ready to be run now"
echo "On root type: npm run web"
export NOYARNPOSTINSTALL=