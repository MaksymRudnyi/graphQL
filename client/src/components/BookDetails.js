import React from 'react';
import {Query} from 'react-apollo';
import {getBookQuery} from '../queries/queries';

const BookDetails = ({bookId}) => {
	return (
		<Query
			query={getBookQuery}
			variables={{id: bookId}}
		>
			{({loading, error, data}) => {
				const {book} = data;
				if (loading) {
					return <p>Loading...</p>;
				}
				if (error) {
					console.log('error: ', error);
					return <p>Error :(</p>;
				}

				if (book) {
					return (
						<div id="book-details">
							<p>Output book details here</p>
							<h2>{book.name}</h2>
							<p>{book.genre}</p>
							<p>{book.author.name}</p>
							<p>All books by this author:</p>
							<ul className="other-books">
								{book.author.books.map(item => {
									return <li key={item.id}>{item.name}</li>
								})}
							</ul>
						</div>
					)
				} else {
					return <p>No Book selected.</p>
				}

			}}
		</Query>
	)
};

export default BookDetails
