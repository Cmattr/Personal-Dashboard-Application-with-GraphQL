import { gql } from "urql";

export const GET_USER = gql`
query {
  user(id: 1) {
    id
    name
    username
    email
    phone
    website
    address {
    	street
    	suite
   		city
    	zipcode
  		}
    }
  }
    `

export const GET_USER_POST = gql`
  query {
   user(id: 1) {
    posts {
      data {
        id
        title
        body
      }
    }
  }
}
`

export const GET_USER_POST_BY_ID = gql`
query GetUserPosts($id: ID!) {
  user(id: $id) {
    posts {
      data {
        id
        title
        body
      }
    }
  }
}
`


export const GET_COMMENTS = gql`
  query GET_USER_POST($id: ID!){
    comment (id: $id) {
      name
      body  
    }
  }
`



export const GET_TODO = gql`
  query GET_TODO($todoId: ID!) { 
    todo(id: $todoId) {
      id
      user {
        id
        name 
      }
      title
      completed
    }
  }
`;
