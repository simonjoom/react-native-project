#!/bin/bash
# deep copy script
cd ./packagespug
find . -type f -name "*" ! -name ".DS_Store" ! -name "*.txt" > file.txt
tar -c -T file.txt | tar -C ../node_modules -x 
cd ..
rm -Rf ./node_modules/graphql/
cp ./scripts/ApolloServer.js ./node_modules/apollo-server-express/dist/
echo "Succeed! The Server is ready to be run now"
echo "On root type: npm run server"
