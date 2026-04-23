import { gql } from '@apollo/client';

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived($chatId: String!) {
    messageReceived(chatId: $chatId) {
      _id
      chatId
      senderId
      text
      createdAt
    }
  }
`;
