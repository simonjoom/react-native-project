#!/bin/bash
# deep copy script
export NOYARNPOSTINSTALL="yes"
yarn add react-dev-utils@6.0.0-next.3e165448
cd babel-eslint
yarn install
cd ..
cp -Rf ./react-native-vector-icons ./node_modules/
cp -Rf ./react-native-web-modal ./node_modules/
cp -Rf ./react-scripts ./node_modules/
rm -Rf ./node_modules/expo-web/node_modules/
cp -Rf ./babel-eslint ./node_modules/
echo "Succeed! The Web-App is ready to be run now"
echo "On root type: npm run web"
export NOYARNPOSTINSTALL=