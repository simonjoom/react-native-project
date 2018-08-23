import { Query, Mutation, Subscription } from "../generated/prisma";

export function addFragmentToFieldResolvers(schemaAST, fragmentSelection) {
  return schemaAST.definitions.reduce((result, schemaDefinition) => {
    if (schemaDefinition.kind === "ObjectTypeDefinition") {
      return {
        ...result,
        [schemaDefinition.name.value]: schemaDefinition.fields.reduce(
          (result, fieldDefinition) => {
            //TODO this includes check is naive and will break for some strings
            if (fragmentSelection.includes(fieldDefinition.name.value)) {
              return result;
            }

            return {
              ...result,
              [fieldDefinition.name.value]: {
                fragment: `fragment Fragment on ${
                  schemaDefinition.name.value
                } ${fragmentSelection}`,
                resolve: (parent, args, context, info) => {
                  return parent[fieldDefinition.name.value];
                }
              }
            };
          },
          {}
        )
      };
    } else {
      return result;
    }
  }, {});
}

function copydeep(obj) {
  console.log("tr",obj)
  if (Array.isArray(obj)) return obj.map(o => copydeep(o));
  if (obj && typeof obj === "object" && obj.constructor === Object) {
    Object.keys(obj).forEach(key => {
      if (Array.isArray(obj[key])) obj[key] = obj[key].map(o => copydeep(o))
      else if (obj[key] && typeof obj[key] === "object"&& obj[key].constructor === Object)
        obj[key] = Object.assign({},copydeep(obj[key])); 
    }); 
    return Object.assign({},obj)
  } else {
    return obj;
  }
}

export function prepareTopLevelResolvers(
  resolverObject: Query | Mutation | Subscription
) {
  return Object.entries(resolverObject).reduce((result, entry) => {
    const resolverName = entry[0];
    const resolverFunction: any = entry[1];
    return {
      ...result,
      [resolverName]: (parent, args, context, info) => {
       // let clone=copydeep(argstofilter);
       // console.log("operationbefore", resolverName, argstofilter);
        if (args.create) {
          const createObj = Object.keys(args.create);
          createObj.map(key => {
            if (args.create[key].disconnect) {
              args.create[key] = copydeep(args.create[key]);
              delete args.create[key].disconnect;
            }
          });
        } 
        console.log("operationresolverName", resolverName, args);
        return resolverFunction(args, info);
      }
    };
  }, {});
}

export function prepareTopLevelSubscriptionResolvers(
  resolverObject: Subscription
) {
  return Object.entries(resolverObject).reduce((result, entry) => {
    const resolverName = entry[0];
    // const resolverNameSub=entry[0] +"sub";
    const resolverFunction: any = entry[1];
    return {
      ...result,
      [resolverName]: (parent, args, context, info) => {
        return resolverFunction(args, info);
      } /*,
      [resolverName]: {
        subscribe: async (parent, args, context, info) => {
          return await context.db.subscription.organization({}, info);
        }
      }*/
    };
  }, {});
}
