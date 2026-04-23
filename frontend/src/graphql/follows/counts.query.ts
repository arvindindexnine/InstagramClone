import { gql } from '@apollo/client';

export const GET_FOLLOW_COUNTS = gql`
  query GetFollowCounts($userId: String!) {
    getFollowersCount(userId: $userId)
    getFollowingCount(userId: $userId)
  }
`;
