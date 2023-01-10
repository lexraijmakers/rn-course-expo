export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser?: Maybe<User>;
  signupUser: User;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationSignupUserArgs = {
  data: UserCreateInput;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserCreateInput = {
  age: Scalars['Int'];
  name: Scalars['String'];
};
