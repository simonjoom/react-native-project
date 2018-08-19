#!/bin/bash
# deep copy script
cd ./packagespug
find . -type f -name "*" ! -name ".DS_Store" ! -name "*.txt" > file.txt
tar -c -T file.txt | tar -C ../node_modules -x 
rm -Rf ./node_modules/graphql/
npm link apollo-server-express
npm link apollo-server-core
cp ./scripts/ApolloServer.js ./node_modules//apollo-server-express/dist/