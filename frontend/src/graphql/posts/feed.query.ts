import { gql } from '@apollo/client';

export const GET_FEED = gql`
  query GetFeed {
    getFeed {
      _id
      userId
      mediaUrl
      caption
      type
      createdAt
    }
  }
`;
