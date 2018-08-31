
# INSTALLATION
Unzip:
https://drive.google.com/open?id=1-m3Ho1sdYP38WnP-jpE55Kas9i4WX0qJ

Use last yarn/ last prisma:

        npm install -g yarn
        npm install -g prisma

### Run on ./prisma folder 

> cd prisma

to install dependencies

> yarn install

In postinstall a little hack will applied to apollo-server
Normally you re ready to run the server:

> npm run server
no error you ve got:
Server is running on http://localhost:4000

If error, then run: 

> sh postinstall.sh and do again


-----
# Run the backend
> npm run server

my output with no error:
```
> demo-prisma@ server /Users/simon/demo/prisma
[nodemon] 1.18.4
[nodemon] reading config ./nodemon.json
[nodemon] to restart at any time, enter `rs`
[nodemon] or send SIGHUP to 58696 to restart
[nodemon] ignoring: ./node_modules/**/* ./src/__tests__/**/*
[nodemon] watching: /Users/simon/demo/prisma/src/**/*
[nodemon] watching extensions: ts,js,graphql
[nodemon] starting `node -r ts-node/register -r dotenv/config --inspect src/index.ts`
[nodemon] spawning
[nodemon] child pid: 58698
Debugger listening on ws://127.0.0.1:9229/640f583d-bd4a-4bae-ba79-1fb22cc2da27
For help, see: https://nodejs.org/en/docs/inspector
[nodemon] watching 6 files
```
 

# On Backend

            In ./prisma/database/datamodel.graphql 
            It's the main database used by prisma

            In ./prisma/src/schema.graphql 
            It's the database set up for the app.

            In ./prisma/src/resolv.ts 
            ALL code of the implementation sit here.

            In ./prisma/src/\__tests__ 
            ALL test code of the implementation sit here.


## running tests:
In other console (to see server running on other and see some output)

I recommand to run separetly : (no watch)
RUN IN ./PRISMA/SRC

> jest \__tests__/bidcheck.ts
> 
> jest \__tests__/basetargeting.ts
> 
> jest \__tests__/budgetcheck.ts 
> 
> jest \__tests__/FinalCheck.ts
> 
> jest \__tests__/shortlisting.ts
> 
> jest \__tests__/lrucache.ts 

finally for multithreads tests:
> jest \__tests__/testmultithread.ts
 
## Used:
Exchange Endpoint: Prisma.
Database hosted in public endpoint 
PRISMA_ENDPOINT="https://eu1.prisma.sh/public-greenslayer-136/pipedrive/dev"

Coding technique:

○ Jest for testings

○ Types: typescript

○ GraphQL/PRISMA to perfom a uniform API across the application

○ Apollo to speak with the Api


----
&nbsp;
## Implementation:


### Multithread:

I decided to use lru-cache to help for testing purpose and give a boost.

Because we use a database not hosted on the same computer!: (public endpoint)
- it's a public endpoint, and the access to the database will be long and not convenient to have a nice responsible answer -> thought using docker in futur.
  
- even with a docker a database can provide some latency if not well configured .
  :https://hackernoon.com/another-reason-why-your-docker-containers-may-be-slow-d37207dec27f

So certainly just a small cache system who can be controlled easier and faster will be more convenient for now.


&nbsp;
#### Concurrency
IN Multithread we have to think on some case:
Common example is somebody who want to buy in the same time that the process compute the new budget sold from others in the database.
If it's happen then still the new budget in not in memory this bad guy could pay even if the budget reach zero (and the process don't know).

I wrapped a lock access to prevent this.
There is no concurrency at all here. Since the database connection is protected by an exclusive lock, only a single thread can operate on the database at any point in time. 

#### Responsiveness/bottlenecks
The problem when the access go to the database,
With a lock when the user perform a click on buy nothing can happen if he is exactly during the time the database write , 

If we need to wait like 200ms or more (because we use a public endpoint or the database became lazy), then it's can be a problem in Responsiveness.

A fast cache on memory is the best to reduce this delay at maximum. 

&nbsp; 

In the server i coded:

A setInterval who will be run in first action buy 

It's the heart of the process to write database result, i defined the interval every 3 second for testing purpose.

We use listslug=["C1","C2","C3"...] **listslug** allow to calculate only for company requested by clients, others company are lazy and never fetched by the program (optimization)


Here the process and comments:
```
setInterval(() => {
  let data = cache.get("organizations");
  // still no data mean nobody still tried to access the database.

  if (data) {
    console.log("The program is running for companies");
    listslug.forEach(async slug => {
      if (slug) {
        if (BidsMap.has(slug)) {
          lockMap.set(slug, true);
          const budgetreduce = BidsMap.get(slug);
          BidsMap.delete(slug);
        
          let budget;
          //reduce Budget for the company '${slug}'
          const newdata = data.map(el => {
            if (el.name == slug)
              budget = el.budget =
                (dollardstocents(el.budget) - budgetreduce) / 1000;
            return el;
          });
        
          cache.set("organizations", newdata); //store the current in fast memory to prevent collision
          lockMap.set(slug, false); //use lock to be sure no collision
         
          //we will write the new budget in real database in production.
          //In production we keep the code upper because our full application use the cache to 
          //retrieve the datas. The lockMap has no need to be around here because the database is 
          //external to the process, the cache is working.
    
    /* So in real life we will uncomment this
          await db.mutation.updateOrganization({
            where: {
              name: slug
            },
            data: {
              budget
            }
          });  in real life we will uncomment this*/
        }
      }
    });
  }
}, 3000);
```

&nbsp;

We preprocess action "actionbuy" to be queued and will be then **batch-execute** them to the database in a single transaction in the SetInterval.
This transaction is defined and done by the Function:  "ActionBuyThing"

ActionBuyThing take a Company object and add his transaction's bid in Queue **if only his budget is ok to receive a new transaction**

This solution will send "thanks for the payment" even the system still didn't write the result in database. It's not a problem as soon the process did calculate if the budget is still ok.

&nbsp;

The queue is stored in a **HashMap "BidsMap"** who will take all bids for every company.
So we have got something like BidsMap=[{"C1":40},{"C2":0},{"C3":20}]
As Company name is unique "C1","C2"... ect we can use it like the keys of this HashMap.


&nbsp;

I performed a simple setInterval to take all bids for all company every 3 seconds and write the database reduced by the budget for each one. We lock the actionbuy for this company when the database in memory is written.


&nbsp;

As well, i created one other **HashMap lockMap** who is a Map to store one lock for every company every 3 seconds.
Because this Map if some users buy others company they could perform it even if the database is written for some company.. but i think this is maybe over engineering ,  not very important and just a simple lock will be enough for alls. (a write access now is very quick in memory cache)
 

----
&nbsp;
### FORMAT
#### LOGS:
I decided to write log in format: Object of Array to be easier for program to use.
{ Passed: [ 'C1' ], Failed: [ 'C2', 'C3' ] }
it will be easy to change in {C1, Passed},{C2,Failed},{C1,Passed} if needed

#### BID /BUDGET:
Ok Bid is in cent, budget in dollards. How to properly format them?

Int was not the solution because Budget should to become float after reduction.

-> SO bid and budget are defined in Float

----
&nbsp;
## Explanation:


In __tests__/moduletest.ts

All calls to the database are inside this module here. There is a little normalization of output due to using models "database" prisma.
Nota it's not a test just a library

log format: { Passed: [C1,..], Failed: [C2,..] }
Inside:

- **filtergoodinput**: 
    - a little utility to filter good company entries;
    - if the company has got null entries like country or category we filter them

- **FilterEnd**
    - input needed  ${country,    category,    bid}, {Inputcomp?,nocache?}
    - It's bidcheck/basetargeting/budgetcheck/Shortlisting working together
    - output: {result={},log={[],},error=string,winner={id:string}}  

- **getBidCheck**
    - input   {bid} {Inputcomp?,nocache?}
    - It's bidcheck
    - output:  {result=[{},{}...],log,error=string} 
  
- **getBudgetCheck**
    - input   {Inputcomp?,nocache?}
    - It's budgetcheck
    - output:  {result=[{},{}...],log,error=string} 
            
- **getBaseTargeting**
    - input   {country,    category},{Inputcomp?,nocache?}
    - It's budgetcheck
    - output:  {result=[{},{}...],log,error=string} 


### Implementations of Filters
A filter (bidcheck/budgetcheck/basetargeting) is as

        output=Filter(input)
        output2=Filter(output)
        output3=Filter(output2)

I decided to add nocache? for each filter in Testing purpose:
nocache allow us to avoid to get modified data from past testing, because we use a cache.

InputComp is a json-database to be fetch by the filter. It's used for testing

For - getBidCheck , getBudgetCheck  FilterEnd and getBaseTargeting:

    If InputComp is null the system take the real database (the real one) by default 


## So we have done:

○ *Base Targeting*:

\__tests__/basetargeting.ts 

Match companies based on Country, Category. If no
company passed from these filters then send response as “No Companies
Passed from Targeting” to external client.

&nbsp;
○ *Budget Check*: 

\__tests__/budgetcheck.ts 

Check if Companies had some budget to sell stocks. If no
companies passed from the filters then send response as “No Companies
Passed from Budget” to external client. 

&nbsp;
○ *BaseBid Check*: 

\__tests__/bidcheck.ts 

Check if the bid is more than the API base bid. If no
companies passed from the filter then send response as “No Companies
Passed from BaseBid check” to external client. 

&nbsp;
○ *Shortlisting*: 

\__tests__/shortlisting.ts

If more than one company passed from BaseBid check then
select the highest one and send response = CompanyID. Include in logs like:
Winner = CompanyID.

&nbsp;
○ *Lru-cache*: 

\__tests__/lrucache.ts

Perform test using lrucache as a database 
Nota use of jest.spyOn to test when database is acceeded or not.


&nbsp;
○ *multithread*: 

\__tests__/testmultithread.ts

Perform the tests full app together all feature upper are inside + multithread support
 
# frontend
go on http://ns327841.ip-37-187-112.eu/


You can change rows of organizations, and as well add countries or categories for each company
Yeah organizations==companies for the system

The filter i didn't do it because already lot of jobs have to be done with Jest.


