import { gql } from '@apollo/client';

export const DELETE_ALL_MESSAGES = gql`
  mutation DeleteAllMessages {
    deleteAllMessages
  }
`;