const express = require('express'),
graphqlHTTP   = require('express-graphql'),
schema        = require('./marvel_api_server/marvelSchema.js'); 

let port = 3001;
const app = express()

app.use('/', graphqlHTTP({
    schema : schema, 
    graphiql : true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port)