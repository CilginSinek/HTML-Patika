import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import { PubSub } from 'graphql-subscriptions';

// Initialize in-memory PubSub for real-time GraphQL subscriptions.
const pubsub = new PubSub();

// Initial database state for questions and their voting options.
const questions = [
  {
    id: '1',
    title: 'Which programming language do you prefer for Web Development?',
    options: [
      { id: '1_1', title: 'JavaScript/TypeScript', votes: 12 },
      { id: '1_2', title: 'Python', votes: 4 },
      { id: '1_3', title: 'Go', votes: 6 },
      { id: '1_4', title: 'Rust', votes: 3 }
    ]
  }
];

// GraphQL Type Definitions.
const typeDefs = `#graphql
  type Option {
    id: ID!
    title: String!
    votes: Int!
  }

  type Question {
    id: ID!
    title: String!
    options: [Option!]!
  }

  type Query {
    questions: [Question!]!
    question(id: ID!): Question
  }

  type Mutation {
    createQuestion(title: String!, options: [String!]!): Question!
    voteOption(questionId: ID!, optionId: ID!): Question!
  }

  type Subscription {
    questionAdded: Question!
    questionVoted(id: ID!): Question!
  }
`;

// GraphQL Resolvers.
const resolvers = {
  Query: {
    /**
     * Retrieves all questions, ordered so that the newest is displayed first.
     * @returns {Array} List of all questions.
     */
    questions: () => {
      // Reverse array to ensure newest questions appear at the top.
      return [...questions].reverse();
    },
    /**
     * Finds a specific question by its unique ID.
     * @param {null} _
     * @param {object} args
     * @param {string} args.id
     * @returns {object|undefined} Found question.
     */
    question: (_, { id }) => {
      return questions.find((q) => q.id === id);
    }
  },
  Mutation: {
    /**
     * Creates a new question with options and publishes the event to subscribers.
     * @param {null} _
     * @param {object} args
     * @param {string} args.title
     * @param {string[]} args.options
     * @returns {object} The newly created question.
     */
    createQuestion: (_, { title, options }) => {
      const newQuestion = {
        id: String(questions.length + 1),
        title,
        options: options.map((optTitle, index) => ({
          id: `${questions.length + 1}_${index + 1}`,
          title: optTitle,
          votes: 0
        }))
      };
      questions.push(newQuestion);
      
      // Publish the event to notify active homepage subscriptions.
      pubsub.publish('QUESTION_ADDED', { questionAdded: newQuestion });
      return newQuestion;
    },
    /**
     * Records a vote for a specific option under a question and broadcasts the update.
     * @param {null} _
     * @param {object} args
     * @param {string} args.questionId
     * @param {string} args.optionId
     * @returns {object} The updated question.
     */
    voteOption: (_, { questionId, optionId }) => {
      const question = questions.find((q) => q.id === questionId);
      if (!question) {
        throw new Error('Question not found');
      }
      const option = question.options.find((o) => o.id === optionId);
      if (!option) {
        throw new Error('Option not found');
      }
      
      // Increment vote count.
      option.votes += 1;

      // Broadcast updated question structure to detail page subscribers.
      pubsub.publish(`QUESTION_VOTED_${questionId}`, { questionVoted: question });
      return question;
    }
  },
  Subscription: {
    questionAdded: {
      /**
       * Subscribes to new question events.
       * @returns {AsyncIterator} Iterator for the QUESTION_ADDED channel.
       */
      subscribe: () => pubsub.asyncIterableIterator(['QUESTION_ADDED'])
    },
    questionVoted: {
      /**
       * Subscribes to vote changes of a specific question.
       * @param {null} _
       * @param {object} args
       * @param {string} args.id
       * @returns {AsyncIterator} Iterator filtered/scoped by question ID.
       */
      subscribe: (_, { id }) => pubsub.asyncIterableIterator([`QUESTION_VOTED_${id}`])
    }
  }
};

// Create the executable GraphQL schema.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Setup Express and HTTP Server.
const app = express();
const httpServer = createServer(app);

// Setup WebSocket Server for Subscriptions.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
});

// Hand over WebSocket server control to graphql-ws.
const serverCleanup = useServer({ schema }, wsServer);

// Configure Apollo Server to manage standard HTTP requests and handle graceful shutdowns.
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ]
});

await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server)
);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
});
