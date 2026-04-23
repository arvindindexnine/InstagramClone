import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages($chatId: String!) {
    getMessages(chatId: $chatId) {
      _id
      chatId
      senderId
      text
      createdAt
    }
  }
`;
