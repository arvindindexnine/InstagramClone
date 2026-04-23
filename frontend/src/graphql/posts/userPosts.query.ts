import { gql } from '@apollo/client';

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
      _id
      userId
      mediaUrl
      caption
      type
      createdAt
    }
  }
`;
