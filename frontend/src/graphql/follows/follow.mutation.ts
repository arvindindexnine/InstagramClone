import { gql } from '@apollo/client';

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
      _id
      followerId
      followingId
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: String!) {
    unfollowUser(userId: $userId)
  }
`;
