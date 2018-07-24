This project was bootstrapped with [React scripts versus next](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts).

Guys i try here to describe my project to transform react-native to a cross-browser code.

I passed one night to test and compile many times for you to avoid trap in npm dependencies.


First you have to know , i started the project for a very nice one:
https://github.com/Weakky/prisma-ecommerce

It's as well a french guy, his code is fully complete e-commerce working.

The database is nearly the same, but i want something more simple. i kept lot of code but
For the backoffice i want a new one more simple. (see below)


I think it's much more efficient to work in full JS and compile for browser who is much faster that pass to a IOS simulator. 

Now react-native-web is well stable even if i did some mods to add some feature

--> added a modal with react-native-web-modal
--> fixed a bug with icon react-native-vector-icons


inside:
- Webpack 4(latest) / react-scripts modified to support react-native-web
- expo
- expo-web
 
Apollo2/prisma for backend

Resources:
https://www.apollographql.com/

https://docs.expo.io/versions/latest/


I think expo should be nice to use for this project. See the Api. Expo helped me first to support the react-native fonts for react-native-web.


The apollo and prisma is properly set up to have a super cool development coupled with hot-reload of react-scripts.

On the directory downloaded from my github

To install the project:

first go to ./prisma folder 
to install dependencies
> npm install
> 
> sh script.sh    # update pug package

go to the root folder test the install

> cd ../
> 
> npm run server

if error 
oops maybe some deps to add, don't hesitate to ask me.

if no error:
continu in root folder install dependencies

> npm install
> 
> sh installpreset.sh   # install new preset metro-react-native-babel-preset


to run backend
> npm run server

my output with no error:
```
[nodemon] 1.17.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: /Users/simon/react-native-project/prisma/**/*
[nodemon] starting `node -r ts-node/register -r @babel/register -r dotenv/config --inspect prisma/src/index.ts`
Debugger listening on ws://127.0.0.1:9229/d892b242-c88d-484b-a370-b8a090682b29
For help, see: https://nodejs.org/en/docs/inspector
Type "Node" is missing a "resolveType" resolver. Pass false into "resolverValidationOptions.requireResolversForResolveType" to disable this warning.
Server is running on http://localhost:4000
```

then
to run frontend
> npm run web

normally your application start on your browser
in http://localhost:3000/

### Warning i use a server online.  So if you work on the database you should to be online.

PRISMA_ENDPOINT="https://eu1.prisma.sh/public-greenslayer-136/my-app/dev"

see ./prisma/.env for my config

## Roadmap:
### First work on Backend

Click on backend button on main page and work on this feature:

I created a fast utility to display the fields of a graphql node to update/upsert/create data

The ui have to be changed , the interest is to have a utility working for all types of database running with prisma. So it could be work not only my database

in ./prisma/database/datamodel.graphql 
It's the database set up you should to know it.






### frontend
redux for route/ history push and pop


