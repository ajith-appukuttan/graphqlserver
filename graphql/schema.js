import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Query {
    currentUser: User
    getUser(id: ID!): User
  }

  type Mutation {
    login(username: String!, password: String!): String
  }
`;

export default typeDefs;