const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://test:test123456@ds113442.mlab.com:13442/graphql');
mongoose.connection.once('open', () => {
	console.log('connected to DB');
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('app in running on 4000')
});