import { gql } from '@apollo/client';

export const DELETE_ALL_POSTS = gql`
  mutation DeleteAllPosts {
    deleteAllPosts
  }
`;