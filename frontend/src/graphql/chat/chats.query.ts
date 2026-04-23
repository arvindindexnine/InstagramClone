import { gql } from '@apollo/client';

export const GET_USER_CHATS = gql`
  query GetUserChats($userId: String!) {
    getUserChats(userId: $userId) {
      chatId
      otherUserId
      lastMessage
    }
  }
`;
