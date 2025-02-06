import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

const getUserFromToken = (token) => {
  try {
    return true;
  //   if (!token) {
  //     return jwt.verify(token, SECRET_KEY);
  //   }
  //   return null;
  } catch (err) {
    logger.error('Token verification failed', { error: err.message });
    return null;
   }
  };


export default getUserFromToken;