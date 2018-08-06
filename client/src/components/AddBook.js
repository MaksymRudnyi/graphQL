import React from "react";
import {Query} from "react-apollo";
import {getAuthorsQuery} from "../queries/queries"

const AddBook = () => (
	<Query
		query={getAuthorsQuery}
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
				<form id="add-book">
					<div className="field">
						<label>Book name:</label>
						<input type="text"/>
					</div>

					<div className="field">
						<label>Genre:</label>
						<input type="text"/>
					</div>

					<div className="field">
						<label>Authror:</label>
						<select>
							{data.authors.map(author => {
								return (<option key={author.id} value={author.id}>{author.name}</option>)
							})}
						</select>
					</div>

					<button>+</button>

				</form>
			)
		}}
	</Query>
);

export default AddBook
