import users from '../data/users.js';
import logger from '../utils/logger.js';

const queryResolvers = {
  currentUser: (_, __, { user }) => {
    if (!user) {
      logger.warn('Unauthorized access attempt');
      throw new Error('Not authenticated');
    }
    return user;
  },
  getUser: (_, { id }) => {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
};

export default queryResolvers;