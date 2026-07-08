const { createServer } = require('node:http');
const { createYoga, createPubSub, createSchema } = require('graphql-yoga');
const fs = require('fs');
const path = require('path');

// Load JSON data
const dataPath = path.join(__dirname, 'data');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

// Initialize PubSub
const pubSub = createPubSub();

// Define type definitions
const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    user: User!
    location: Location!
    participants: [User!]!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
    users: [User!]!
    locations: [Location!]!
  }

  type Mutation {
    addEvent(
      title: String!
      desc: String!
      date: String!
      from: String!
      to: String!
      location_id: ID!
      user_id: ID!
    ): Event!
    
    addParticipant(
      eventId: ID!
      userId: ID!
    ): User!
  }

  type Subscription {
    eventCreated: Event!
    participantAdded(eventId: ID!): User!
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    events: () => data.events,
    event: (_, { id }) => data.events.find(event => event.id == id),
    users: () => data.users,
    locations: () => data.locations,
  },
  Mutation: {
    addEvent: (_, { title, desc, date, from, to, location_id, user_id }) => {
      const newEvent = {
        id: String(data.events.length + 1),
        title,
        desc,
        date,
        from,
        to,
        location_id: Number(location_id),
        user_id: Number(user_id),
      };
      data.events.push(newEvent);
      
      // Publish event creation
      pubSub.publish('EVENT_CREATED', { eventCreated: newEvent });
      
      return newEvent;
    },
    addParticipant: (_, { eventId, userId }) => {
      const newParticipant = {
        id: String(data.participants.length + 1),
        user_id: Number(userId),
        event_id: Number(eventId),
      };
      data.participants.push(newParticipant);
      
      const user = data.users.find(u => u.id == userId);
      
      // Publish participant addition specifically for this event ID
      pubSub.publish(`PARTICIPANT_ADDED:${eventId}`, { participantAdded: user });
      
      return user;
    }
  },
  Subscription: {
    eventCreated: {
      subscribe: () => pubSub.subscribe('EVENT_CREATED'),
    },
    participantAdded: {
      subscribe: (_, { eventId }) => pubSub.subscribe(`PARTICIPANT_ADDED:${eventId}`),
      resolve: (payload) => payload.participantAdded,
    }
  },
  Event: {
    user: (parent) => data.users.find(user => user.id == parent.user_id),
    location: (parent) => data.locations.find(loc => loc.id == parent.location_id),
    participants: (parent) => {
      const eventParticipants = data.participants.filter(part => part.event_id == parent.id);
      return eventParticipants.map(part => data.users.find(user => user.id == part.user_id)).filter(Boolean);
    }
  }
};

// Create Schema
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Create Yoga instance
const yoga = createYoga({
  schema,
  graphiql: {
    // Enable Subscriptions via SSE
    subscriptionsProtocol: 'SSE',
  }
});

// Start server
const server = createServer(yoga);
server.listen(4000, () => {
  console.log('🚀 GraphQL Server is running at http://localhost:4000/graphql');
});
