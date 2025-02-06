import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from './utils/logger.js';
import typeDefs from './graphql/schema.js';
import resolvers from './resolvers/index.js';
import getUserFromToken from './utils/auth.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        logger.info('Apollo Server starting...');
      },
      async requestDidStart(data) {
        if(data.request.operationName !== 'IntrospectionQuery') {
          data.contextValue.requestId=uuidv4();
        logger.info('Request started',data);
        return {
      
          async didResolveSource(requestContext) {
            logger.info('Source resolved', { query: requestContext.request.query });
          },
          async parsingDidStart() {
            logger.info('Parsing started');
          },
          async validationDidStart() {
            logger.info('Validation started');
          },
          async didResolveOperation(requestContext) {
            logger.info('Operation resolved', { operationName: requestContext.operationName });
          },
          async responseForOperation() {
            logger.info('Preparing response');
          },
          async executionDidStart() {
            logger.info('Execution started');
            return {
              async didEncounterErrors(requestContext) {
                logger.error('Encountered errors', { errors: requestContext.errors });
              }
            };
          },
          async willSendResponse(requestContext) {
            logger.info('Response sent', { response: requestContext.response });
          }
        };
      }
      }
    }
  ]
});

(async () => {
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = getUserFromToken(token.replace('Bearer ', ''));
      //return { user };
    }
  }));
  
  app.get('/health', (req, res) => {
    res.status(200).send('Okay!');
  })

  httpServer.listen({ port: 4000 }, () => {
    logger.info('Server started on port 4000');
    console.log(`Server ready at http://localhost:4000/graphql`);
  });
})();