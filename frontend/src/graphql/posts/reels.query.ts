import { gql } from '@apollo/client';

export const GET_REELS = gql`
  query GetReels {
    getReels {
      _id
      userId
      mediaUrl
      caption
      type
    }
  }
`;
