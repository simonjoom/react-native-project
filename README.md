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

first go to ./prisma folder 
to install dependencies

> npm install
> 
> sh script.sh    # update pug package and fix dependencies

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

> npm install

to resolve problem with react-native-vector-icons

> rm -Rf root/node_modules/expo-web/node_modules/ (the dependencies expo-web are outdated)


After this
be sure to have a symbolic link working in node_modules:

from root/node_modules/react-native-vector-icons to root/react-native-vector-icons
and

from root/node_modules/react-native-web-modal to root/react-native-web-modal

from root/node_modules/react-scripts to root/react-scripts

sometimes npm do not create them so create them manually like: (by example)


> cd node_modules/
> 
> ln -s ../react-scripts ./node_modules/react-scripts

These 3 folder was a bit hacked to resolve bug with react-native-web


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

So we have to pass our time in the folder  ./src/src/views/admin/

Well, You have no need really to know how i want to implement my database to work on it; 

I want to create a fast utility to display all fields of one graphql node to allow to update/upsert/create this node fast. (it's not very user friendly but i don't care it's for my use only for the moment)

Click on backend button on main page to see and to work on this feature:

The helper interesting is ./src/src/views/admin/helper/helper.js

Every folder in ./src/src/views/admin/ is the same structure as ./src/src/views/admin/shop


**to be hired and work on this project
you have to understand what the folder shop implies:**

Please first refer to ./src/src/views/admin/shop 

./src/src/views/admin/shop will be (i think) the main root of my database. 
query.gpl is the queries to the database

ShopContainer.web.js is a container working as maptostate props of redux to pass some function to mutate the node shop or some queries result as allShops in the current database.

of course Shop.js is the component.

Nota extension web.js take priority for browser. So we will use only .web.js before to test after in native mode with IOS/Android

- 3 files are working together
   - query.gpl / shopContainer.web / Shop.js

Helper is a component who take in params:

-   tofetch is the data taken of the database shops (so all the shops)
-   placeholder define the format input of each ...typicaly it's following the schema specification
- selector is used by the picker (slider) it will be always the first property for now (name for one Shop) 
- deleteQuery={deleteShop} ... easy to understand is the function call to delete one shop
- selectQuery={shop} ... easy to understand is the function call to select
-  upsertQuery={upsertShop} allow to update or create a element
-  select_result_select="shop" used by the app to properly take the select result
-  mutate_result_select="shops"  used by the app to properly take the mutation results 

Yeah it's seems complicate, but it's nice, this is compatible for every database you can create in prisma

react-native-picker is defined in src/myPicker.js
see https://github.com/jarvisluong/react-native-picker-js


The ui have to be changed , the interest is to have a utility working for all types of node running with prisma. So it could be work not only with my database. By example i could add very fast one shop, in 2 click. change this shop-data and connect or change the nodes of this shop (like user_owners by example)

![https://github.com/simonjoom/react-native-project/blob/master/copyscreen.png](https://github.com/simonjoom/react-native-project/blob/master/copyscreen.png)


### Database:
Just to explain what i try to do:
it's a e-commerce website to find ski instructor
user can be a:

"type User" somebody who want to find ski instructor and who want to pay when he find it.
-> type User {..}

"type UserAdmin" somebody who register as a ski instructor or superUser (me)
Each instructor is connected to one Shop (type shop)
-> type UserAdmin {..}

One Shop is inserted by the superUser for the moment (by hand with backend)

One Shop is connected to one or more resort -> so the Instructor is connected to the resorts he works, because he is a child of a Shop.

One Resort is a resort.. (easy)

For me
products==instructors
shops==ski_schools

I need to think about the architecture of my application;

I try to understand

```
type Category {
id: ID! @unique
name: String!
options: [Option!]! @relation(name: "CategoryOptions", onDelete: CASCADE)
shop: Shop!
}

type Attribute {
id: ID! @unique
value: String!
category: Category!
shop: Shop!
products: [Product!]!
}

type Option {
id: ID! @unique
name: String!
values: [OptionValue!]! @relation(name: "OptionOptionValues", onDelete: CASCADE)
category: Category! @relation(name: "CategoryOptions", onDelete: CASCADE)
shop: Shop!
}

type OptionValue {
id: ID! @unique
name: String!
}

type SelectedOption {
id: ID! @unique
deletedAt: DateTime # For soft-deletion
option: Option!
variant: Variant! @relation(name: "VariantOnSelectedOptions")
value: OptionValue!
}

type Variant {
id: ID! @unique
deletedAt: DateTime # For soft-deletion
selectedOptions: [SelectedOption!]! @relation(name: "VariantOnSelectedOptions", onDelete: CASCADE)
price: Float!
available: Boolean!
product: Product @relation(name: "ProductVariants") # Variants can be disconnected from product when soft-deleted
}
```

I think category could be a service of one user .. so UserAdmin can be instructor or photograph.. whatever

So if i have got OptionValue who can take value AM,PM,FullDay i think the schema is correct.

#OptionValue = [AM,PM,FullDay] Morning time , afternoon, fullDay
```
#Ex Category:
name:instructor,
options:[{name:ski,values:[AM,PM,FullDay],{name:snowboard,values:[AM,PM,FullDay]}],
shop:shop

#Ex Category2:
name:photograph,
options:[{name:photo_portrait,values:[AM,PM,FullDay],{name:photo_action,values:[AM,PM,FullDay]}],
shop:shop
```
The Variant allow us to define different price for different options selected..

Any thought?


### frontend
redux for route/ history push and pop
...many things as button etc... , i'm ok to have suggestion of some cool UI things

