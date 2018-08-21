# API

Hi

## Readme graphql dynamic backend (realtime) 

Just done a very useful utility to add row in any table (Prisma support lot of database)

It's modular with any prisma project

No need Redux or other state management only done with apollo and prisma 

Just you have to follow one "template" : See /src/views/admin/ to create your own component.


&nbsp;

&nbsp;

The update is done with apollo SUBSCRIPTION so mods are real time
&nbsp;

&nbsp;


Create a folder using same structure as User (see /src/views/admin/User)

by example

3 files:
- Container.web.js
- index.js
- query.gpl


&nbsp;


### index.js 
Define your schema inside:
Example for a USER schema:

&nbsp; 
```
//import all node connected to User :
import Organization from "../Organization/Container";

...

constructor:
    this.initfetch = [
      {
        id: "",
        name: "",
        email: "",
        company: null,
        password: "",
        firstName: "",
        lastName: "",
        active_flag: "NOTACTIVATED",
        role: "USER"
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*@",
      email: "String*@",
      company: "Organization",
      password: "String*",
      firstName: "String",
      lastName: "String",
      active_flag: "Enum:NOTACTIVATED,ACTIVATED",
      role: "Enum:USER,PERSON"
    };
    initfetch contain all default value.

    initplaceholder should to follow rules as:
    ID ==  type ID
    String == not required type string
    String* ==  required type string
    @ == Unique constraint (set well)
    Enum:  !==   type Enum following the enum in string format (not array)

    all other type are set as a Node (like Organization)
    to define an array of node:
      deals: "[Deal]"

All properties of Helper are required to the backend to work:

        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="name"
        navigation={navigation}
        deleteQuery={deleteUser}
        upsertQuery={upsertUser}
        selectQuery={user}
        subscribe={usersub}
        selectResultSelect="user"
        setModalVisible={setModalVisible}
        root="User"
        parent={parent}
        saveId={saveId}
        selectedId={selectedId}
        parentId={parentId}
        connected={connected}
        childrenTree={{ Organization }} 

```

selector is one unique constrainte that the program have to follow.

selector is used as well to display the list of row in one Table 

selector can be ID (i used in pictures) a type name or whatever you want


no need to try to understand parent,selectedId,parentId,connected who are used by the program  
so , don't change it.

about 

        navigation={navigation}
        deleteQuery={deleteUser}
        upsertQuery={upsertUser}
        selectQuery={user}
        subscribe={usersub}
        selectResultSelect="user"

link these property with the ones you defined in Container.web.js


&nbsp;

&nbsp;

### Container.web.js

for this:
import { upsertUser,  deleteUser,user, users, usersub } from "./query.gql";

can be changed to your own singulary variables:

import { upsertMynode,  deleteMynode,mynode, mynodes, mynodesub } from "./query.gql";

I added sub to specify the subscribtion 

set your variables: 
```
        namewhere,
        name,
        email,
        password,
        company,
        firstName,
        lastName,
        active_flag,
        role
```

namewhere is used for the database to check if there is no duplicate unique field (here unique is "name")


### query.gql
just follow the same shema. (see template User )
- Fragment 
- One Upsert (to add or update row)
- One Delete (to remove one row) 
- one subscription 
- one query "all row" (users)
- one query "one row" (user)

&nbsp;

&nbsp;

&nbsp;

### DATABASE

- deploy your schema (of course)

In ./prisma/src/resolv.js (around line 112)

You need to link your client subscription with database subscription
 add in resolvers:

```
  Subscription: {
    //...preparedTopLevelSubscriptionResolvers,
    mynode: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.mynode({}, info);
      }
    },

```

Who is linked to:   (in query.gql)
```
subscription mynodesub($where: MynodeSubscriptionWhereInput) {
  mynode(where: $where) {
    ...


```    
    














