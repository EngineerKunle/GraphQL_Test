/**
 * This is an example with express and graphQl
 * 
 * https://scotch.io/@codediger/build-a-simple-graphql-api-server-with-express-and-nodejs
 */
const express     = require('express'),
app               = express(),
{buildSchema}     = require('graphql'),
graphqlHTTP       = require('express-graphql');

let port = 3000;

let schema = buildSchema('type Query { marvelCharacter : String, powers : String}')

let root = {
    marvelCharacter : ()=> {
        return 'Iron Man'
    },

    powers : () => {
        return 'genius playboy billionaire philanthropist '
    }
}

app.use(('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true      
})));

app.listen(port);

console.log('GraphQL API server running at localhost:'+ port);