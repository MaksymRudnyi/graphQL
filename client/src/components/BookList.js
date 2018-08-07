import React, {Component} from "react";
import {Query} from "react-apollo";
import {getBooksQuery} from "../queries/queries"

import BookDetails from './BookDetails';

class BookList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			selected: null
		}
	}
	render() {
		return (
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
									return <li onClick={(e) => {this.setState({selected: book.id})}} key={book.id}>{book.name}</li>
								})}
							</ul>
							<BookDetails bookId={this.state.selected}/>
						</div>
					)
				}}
			</Query>
		);
	}
}

export default BookList
