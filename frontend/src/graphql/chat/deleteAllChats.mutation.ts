import { gql } from '@apollo/client';

export const DELETE_ALL_CHATS = gql`
  mutation DeleteAllChats {
    deleteAllChats
  }
`;