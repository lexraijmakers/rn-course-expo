import * as Types from '../../types';

import { gql } from '@apollo/client';
export type UserFragment = { __typename?: 'User', id: number, name: string, age: number, movie?: string | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  age
  movie
}
    `;