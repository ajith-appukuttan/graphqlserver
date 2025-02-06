import jwt from 'jsonwebtoken';
import users from '../data/users.js';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

const resolvers = {
  Query: {
    currentUser: (_, __, { user }) => {
      if (!user) {
        logger.warn('Unauthorized access attempt');
        throw new Error('Not authenticated');
      }
      return user;
    }
  },
  Mutation: {
    login: (_, { username, password }) => {
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) {
        logger.warn('Invalid login attempt', { username });
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      logger.info('User logged in', { username });
      return token;
    }
  }
};

export default resolvers;