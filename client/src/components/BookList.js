import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const BookList = () => (
	<Query
		query={gql`
      {
		books{
			name,
			id
		}
	}
    `}
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
