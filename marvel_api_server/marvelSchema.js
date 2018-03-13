const _ = require('lodash');

const Avengers = require('./data/avengers'),
Villians       = require('./data/villians');

let {
    GraphQLString, 
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql')


const AvengerType = new GraphQLObjectType({
    name : 'Avenger',
    description : 'Superhero Avengers',
    fields : () => ({
        id : {type : new GraphQLNonNull(GraphQLString)}, 
        name : {type : new GraphQLNonNull(GraphQLString)}, 
        alterEgo : {type : GraphQLString}
    })
});

const VillianType = new GraphQLObjectType({
    name : 'Villians', 
    description : 'Evil Side', 
    fields : () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        archRival : {
            type : AvengerType, 
            resolve : function(villians) {
                return _.find(Avengers, a => a.id == villians.archRivalId)
            }
        }
    })
});

const MarvelQueryRootType = new GraphQLObjectType({
    name : 'MarvelAppSchema', 
    description : 'Marvel App Schema Query Root', 
    fields : () => ({
        avengers : {
            type : new GraphQLList(AvengerType), 
            description : "List of Avengers", 
            resolve : function() {
                return Avengers
            }
        },
        villians : {
            type : new GraphQLList(VillianType), 
            description : "List of Enemies",
            resolve : function() {
                return Villians
            }
        }
    })
});

const MarvelAppSchema = new GraphQLSchema({
    query : MarvelQueryRootType
}); 

module.exports = MarvelAppSchema;