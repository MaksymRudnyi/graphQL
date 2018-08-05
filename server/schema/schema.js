const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

//dummy data
const books = [
	{name: 'first book', genre: 'sky-fy', id: '1', authorId: '1'},
	{name: 'second book', genre: 'fantasy', id: '2', authorId: '2'},
	{name: 'third book', genre: 'sky-fy', id: '3', authorId: '3'},
	{name: '4th book', genre: 'sky-fy', id: '4', authorId: '3'},
	{name: '5th book', genre: 'fantasy', id: '5', authorId: '2'},
	{name: '6th book', genre: 'fantasy', id: '6', authorId: '1'},
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
			genre: {type: GraphQLString},
			author: {
				type: AuthorType,
				resolve(parent, args) {
					return authors.find(item => item.id === parent.authorId);
				}
			}
		})
	}
);

const AuthorType = new GraphQLObjectType({
		name: 'Author',
		fields: () => ({
			id: {type: GraphQLID},
			name: {type: GraphQLString},
			age: {type: GraphQLInt},
			books: {
				type: new GraphQLList(BookType),
				resolve(parent, args) {
					return books.filter(item => item.authorId === parent.id);
				}
			}
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
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(){
				return authors;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

