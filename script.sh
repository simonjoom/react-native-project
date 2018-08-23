#!/bin/bash
# deep copy script
npm install react-dev-utils@6.0.0-next.3e165448
rm -Rf ./node_modules/expo-web/node_modules/
cp -Rf ./babel-eslint ./node_modules/
