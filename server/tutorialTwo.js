const {graphql, buildSchema} = require('graphql');

var schema = buildSchema(
    'type Query {id : ID, name : String}'
);

var samepleUser = {
    id : () => { return 10 }, 
    name : () => {return 'Kunle'}
};

graphql(schema, '{name, id}', samepleUser).then((res) => console.log(res));