import { gql } from '@apollo/client';

export const GET_FEED = gql`
  query GetFeed {
    getFeed {
      _id
      userId
      username
      mediaUrl
      caption
      type
      createdAt
    }
  }
`;