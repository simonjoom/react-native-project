import { Query, Mutation } from "../generated/prisma"

export function addFragmentToFieldResolvers(schemaAST, fragmentSelection) {
    return schemaAST.definitions.reduce((result, schemaDefinition) => {
        if (schemaDefinition.kind === 'ObjectTypeDefinition') {
            return {
                ...result,
                [schemaDefinition.name.value]: schemaDefinition.fields.reduce((result, fieldDefinition) => {
                    //TODO this includes check is naive and will break for some strings
                    if (fragmentSelection.includes(fieldDefinition.name.value)) {
                        return result;
                    }

                    return {
                        ...result,
                        [fieldDefinition.name.value]: {
                            fragment: `fragment Fragment on ${schemaDefinition.name.value} ${fragmentSelection}`,
                            resolve: (parent, args, context, info) => {
                                return parent[fieldDefinition.name.value];
                            }
                        }
                    };
                }, {})
            };
        }
        else {
            return result;
        }
    }, {});
}
export function prepareTopLevelResolvers(resolverObject: Query | Mutation) {
    return Object.entries(resolverObject).reduce((result, entry) => {
        const resolverName = entry[0];
        const resolverFunction: any = entry[1];
        return {
            ...result,
            [resolverName]: async (parent, args, context, info) => {
                return await resolverFunction(args, info);
            }
        };
    }, {});
}