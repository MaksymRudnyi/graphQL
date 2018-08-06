import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {getAuthorsQuery} from '../queries/queries'

class AddBook extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		}
	}

	submitForm(e) {
		e.preventDefault();
		console.log(this.state);
	}

	render () {
		return (
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
						<form id="add-book" onSubmit={this.submitForm.bind(this)}>
							<div className="field">
								<label>Book name:</label>
								<input type="text" onChange={(e) => {this.setState({name: e.target.value})}}/>
							</div>

							<div className="field">
								<label>Genre:</label>
								<input type="text" onChange={(e) => {this.setState({genre: e.target.value})}}/>
							</div>

							<div className="field">
								<label>Authror:</label>
								<select onChange={(e) => {this.setState({authorId: e.target.value})}}>
									{data.authors.map(author => {
										return (<option key={author.id} value={author.id}>{author.name}</option>)
									})}
								</select>
							</div>

							<button>+</button>

						</form>
					)
				}}
			</Query>)
	}
};

export default AddBook
