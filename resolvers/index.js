import queryResolvers from './queries.js';
import mutationResolvers from './mutations.js';

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export default resolvers;