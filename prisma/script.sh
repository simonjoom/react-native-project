#!/bin/bash
# deep copy script
cd ./packagespug
find . -type f -name "*" ! -name ".DS_Store" ! -name "*.txt" > file.txt
tar -c -T file.txt | tar -C ../node_modules -x
rm -Rf ./node_modules/@type/graphql/
rm -Rf ./node_modules/@type/graphql/
rm -Rf ./node_modules/graphql/
rm -Rf ./node_modules/graphql-tag/
cd ../apollo-server
npm run clean && npm i
cd ..
npm link --only=production apollo-server/packages/apollo-server-express
npm link --only=production apollo-server/packages/apollo-server-core
rm -Rf ./apollo-server/node_modules/graphql/
rm -Rf ./apollo-server/node_modules/graphql-tag/
