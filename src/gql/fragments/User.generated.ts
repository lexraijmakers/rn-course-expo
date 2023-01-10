import * as Types from '../../types';

import { gql } from '@apollo/client';
export type UserFragment = { __typename?: 'User', age: number, id: number, name: string };

export const UserFragmentDoc = gql`
    fragment User on User {
  age
  id
  name
}
    `;