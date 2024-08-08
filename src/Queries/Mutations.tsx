import { gql } from "urql";


export const ADD_USER_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;


export const UPDATE_USER_POST = gql`
    mutation EditUserPost($id: ID!, $input: PostInput!) {
        editPost(id: $id, input: $input) {
            id
            title
            body
        }
    }
`;



export const DELETE_USER_POST = gql`
  mutation DeletePostByTitle($title: String!) {
    deletePostByTitle(title: $title) {
      id
      title
    }
  }
`;