This project was bootstrapped with [React scripts versus next](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts).

Guys i try here to describe my project to transform react-native to a cross-browser code.

I passed one night to test and compile many times for you to avoid trap in npm dependencies.


It's as well a french guy, his code is fully complete e-commerce working.

The database is nearly the same, but i want something more simple. i kept lot of code but
For the backoffice i want a new one more simple. (see below)


I think it's much more efficient to work in full JS and compile for browser who is much faster that pass to a IOS simulator. 

Now react-native-web is well stable even if i did some mods to add some feature

- --> added a modal with react-native-web-modal
- --> fixed a bug with icon react-native-vector-icons

The repo better work with **VSCode**

I recommand to install extension VSCode GraphQL PRisma
install the one prisma.vscode-graphql Version 0.0.10 
the others are not from prisma and won't work the same (do not install the one from kumar Harsh)

Add extension as well Prettier code formatter 1.5.0


Inside this project already well set up:
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


Ok let's go to have a taste: 

To install the project:

Use yarn
npm install -g yarn

first go to ./prisma folder 
to install dependencies


> yarn install

In postinstall some hack will applied too
-> update pug package and fix dependencies

go to the root folder to test this install

> cd ../
> 
> npm run server

no error you ve got:

Server is running on http://localhost:4000

you re all good

------

if error 
OOOps! maybe some deps to add, some stuff to look over GOOGLE... as i did a lot before..  don't loose time hesitate to ask me on my twitter: https://twitter.com/simon_skiscool.

-------


if no error:
So continue in root folder install dependencies

in the root:
> yarn install


3 folder was a bit hacked to resolve bug with react-native-web


-----
## Run the backend
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
## Run the frontend
> npm run web

Normally your application start on your browser
in http://localhost:3000/

### Warning i use a server online.  So if you work on the database you should to be online.

PRISMA_ENDPOINT="https://eu1.prisma.sh/public-greenslayer-136/my-app/dev"

see ./prisma/.env for my config


At the moment i did not activate the login and register. 
So no need to test, it won't work.

Just made some stuff around like create the navigation-drawer and debug things . 

You can look on https://github.com/Weakky/prisma-ecommerce to have a fully code working... good to have a reference but

I really think it's better to start back from scratch and to do something from white paper to well understand and create all things properly.

I have more important thing to do before


See below::




## Roadmap:
### First work on Backend

One file very important:

in ./prisma/database/datamodel.graphql 
It's the database set up you should to know it.

The entry point of the code is in ./src/src/App.js

**To work on this project there is 2 only CASE:**

- You are already **VERY** familiar with Prisma CRUD API and you expect good money
https://www.prisma.io/docs/1.0/reference/prisma-api/concepts-utee3eiquo

O R

- you re **MOTIVATED** to learn about The Prisma CRUD API and are ok to spend time free throught this project
https://www.prisma.io/docs/1.0/reference/prisma-api/concepts-utee3eiquo


So we have to pass time in the folder for now  ./src/src/views/admin/

Well, You have no need really to know how i want to implement my database to work on it; 

I just finished my utility to add/remove/update row in a database managed by prisma


Click on backend button on main page to see and to work on this feature:

The helper interesting is ./src/src/views/admin/helper/helper.js

Every folder in ./src/src/views/admin/ is the same structure as ./src/src/views/admin/user


**to be hired and work on this project
you have to understand what the folder user implies:**


### I try here to explain: 

You can as well push in api button when you run the application (i added some tips)
Please first refer to ./src/src/views/admin/user 

./src/src/views/admin/user is taken here as an example of template. 
query.gpl is the queries to the database

UserContainer.web.js is a container working as maptostate props of redux to pass some function to mutate the node user or some queries result as allUsers in the current database.

of course User.js is the component.

Nota extension web.js take priority for browser. So we will use only .web.js before to test after in native mode with IOS/Android


- 3 files are working together
   - query.gpl / UserContainer.web / User.js

Helper is a component who take in params:

-   tofetch is the data taken of the database users (so all the users)
-   placeholder define the format input of each ...typicaly it's following the schema specification
- selector is used by the picker (slider) it should be defined the one to be shown in picker list (name or id ) , the property have to be unique in Schema  
- deleteQuery={deleteUser} ... easy to understand is the function call to delete one user
- selectQuery={user} ... easy to understand is the function call to select
-  upsertQuery={upsertUser} allow to update or create a element
-  selectResultSelect="user" used by the app to properly take the select result
-  mutateResultSelect="users"  used by the app to properly take the mutation results 

Yeah it's seems complicate, but it's nice, It's compatible for every database you can create in prisma

react-native-picker is defined in src/myPicker.js
see https://github.com/jarvisluong/react-native-picker-js


The ui have to be changed , the interest is to have a utility working for all types of node running with prisma. So it could be work not only with my database. By example i could add very fast one user, in 2 click. change this user-data and connect or change the nodes of this user (like user_owners by example)

![https://github.com/simonjoom/react-native-project/blob/master/copyscreen.png](https://github.com/simonjoom/react-native-project/blob/master/copyscreen.png)


### About SChema/Database implementation:
Just to explain what i try to do:
it's a e-commerce website to find ski instructor

I did my schema from this Api because it's almost similar i what i want to do, but i ve no need all the features:

Look here!:
https://developers.pipedrive.com/docs/api/v1/



user can be a:

"type User" somebody who want to find ski instructor and who want to pay when he find it.
-> type User {..}

"type UserAdmin" somebody who register as a ski instructor or superUser (me)
Each instructor is connected to one User (type user)
-> type UserAdmin {..}

One User is inserted by the superUser for the moment (by hand with backend)

One User is connected to one or more resort -> so the Instructor is connected to the resorts he works, because he is a child of a User.
 


### frontend
redux for route/ history push and pop
...many things as button etc... , i'm ok to have suggestion of some cool UI things

