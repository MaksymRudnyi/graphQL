const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt
} = graphql;

//dummy data
const books = [
	{name: 'first book', genre: 'sky-fy', id: '1'},
	{name: 'second book', genre: 'fantasy', id: '2'},
	{name: 'third book', genre: 'sky-fy', id: '3'}
];

const authors = [
	{name: 'first author', age: 44, id: '1'},
	{name: 'second author', age: 34, id: '2'},
	{name: 'third author', age: 24, id: '3'},
];

const BookType = new GraphQLObjectType({
		name: 'Book',
		fields: () => ({
			id: {type: GraphQLID},
			name: {type: GraphQLString},
			genre: {type: GraphQLString}
		})
	}
);

const AuthorType = new GraphQLObjectType({
		name: 'Author',
		fields: () => ({
			id: {type: GraphQLID},
			name: {type: GraphQLString},
			age: {type: GraphQLInt}
		})
	}
);

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return books.find(item => item.id === args.id)
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return authors.find(item => item.id === args.id)
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

