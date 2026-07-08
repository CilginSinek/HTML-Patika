import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Redis connection options
const redisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  retryStrategy: (times) => {
    // Attempt reconnection up to 2 seconds interval
    return Math.min(times * 100, 2000);
  }
};

const pubClient = new Redis(redisOptions);
const subClient = new Redis(redisOptions);

pubClient.on('error', (err) => {
  console.warn('⚠️ Redis Publisher Connection Error (Make sure Redis is running):', err.message);
});
subClient.on('error', (err) => {
  console.warn('⚠️ Redis Subscriber Connection Error (Make sure Redis is running):', err.message);
});

const pubsub = new RedisPubSub({
  publisher: pubClient,
  subscriber: subClient
});

// GraphQL Type Definitions
const typeDefs = `
  type Message {
    id: ID!
    username: String!
    text: String!
    createdAt: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(username: String!, text: String!): Message!
  }

  type Subscription {
    messageCreated: Message!
  }
`;

// Simple in-memory message log for history
const messages = [];

// GraphQL Resolvers
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { username, text }) => {
      const message = {
        id: Math.random().toString(36).substring(2, 9),
        username,
        text,
        createdAt: new Date().toISOString(),
      };
      messages.push(message);
      // Keep last 100 messages
      if (messages.length > 100) {
        messages.shift();
      }
      
      pubsub.publish('MESSAGE_CREATED', { messageCreated: message });
      return message;
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_CREATED']),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

// WebSocket server setup for GraphQL Subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

// Apollo Server configuration
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server)
);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
});
