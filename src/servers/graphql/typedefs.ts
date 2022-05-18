import { gql } from "apollo-server";

const typeDefs = gql`
  ## These are my Types

  type User {
    id: ID!
    name: String!
    posts: [Post]!
  }

  type Post {
    id: ID!
    userId: ID!
    user: User!
    title: String!
    subtitle: String
    body: String
  }

  ## These are my Input Schema for Mutations

  input UserCreateInput {
    id: ID!
    name: String!
    password: String!
  }

  input UserUpdateInput {
    id: ID!
    name: String
  }

  input PostCreateInput {
    title: String!
    subtitle: String
    body: String
  }

  input PostUpdateInput {
    id: ID!
    title: String
    subtitle: String
    body: String
  }

  ## These are my Mutations (equivalent to POST / PUT)

  type Mutation {
    signup(input: UserCreateInput!): String! #returns a token
    createPost(input: PostCreateInput!): Post!
    deleteUser: Boolean!
    deletePost(id: ID!): Boolean!
    updateUser(input: UserUpdateInput!): User!
    updatePost(input: PostUpdateInput!): Post!
  }

  ## These are my Queries (equivalent to GET)

  type Query {
    login(id: ID!, password: String!): String!
    getPost(id: ID!): Post!
    getPosts: [Post]!
    getUser(id: ID): User!
    getUsers: [User]!
  }
`;

export default typeDefs;
