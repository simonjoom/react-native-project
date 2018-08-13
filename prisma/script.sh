#!/bin/bash
# deep copy script
cd ./packagespug
find . -type f -name "*" ! -name ".DS_Store" ! -name "*.txt" > file.txt
tar -c -T file.txt | tar -C ../node_modules -x
rm -Rf ./node_modules/@type/graphql/
