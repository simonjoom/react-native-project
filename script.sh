#!/bin/bash
# deep copy script
yarn add react-dev-utils@6.0.0-next.3e165448
cp -Rf ./react-native-vector-icons ./node_modules/
cp -Rf ./react-native-web-modal ./node_modules/
cp -Rf ./react-scipts ./node_modules/
rm -Rf ./node_modules/expo-web/node_modules/
cp -Rf ./babel-eslint ./node_modules/
