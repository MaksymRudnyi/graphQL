import React from "react";
import {Query} from "react-apollo";
import {getBooksQuery} from "../queries/queries"

const BookList = () => (
	<Query
		query={getBooksQuery}
	>
		{({loading, error, data}) => {
			if (loading) {
				return <p>Loading...</p>;
			}
			if (error) {
				console.log('error: ', error);
				return <p>Error :(</p>;
			}

			return (
				<div>
					<ul id="book-list">
						{data.books.map(book => {
							return <li key={book.id}>{book.name}</li>
						})}
					</ul>
				</div>
			)
		}}
	</Query>
);

export default BookList
