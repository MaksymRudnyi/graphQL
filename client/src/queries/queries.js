import gql from 'graphql-tag';

const getAuthorsQuery = gql`
      {
				authors{
					name,
					id
				}
			}
    `;

const getBooksQuery = gql`
      {
				books{
					name,
					id
				}
			}
    `;

export {getAuthorsQuery, getBooksQuery};