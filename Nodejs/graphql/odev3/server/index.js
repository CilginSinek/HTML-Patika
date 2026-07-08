const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const fs = require('fs');
const path = require('path');

// Load JSON data
const dataPath = path.join(__dirname, 'data');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

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
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    events: () => data.events,
    event: (_, { id }) => data.events.find(event => event.id == id),
  },
  Event: {
    user: (parent) => data.users.find(user => user.id == parent.user_id),
    location: (parent) => data.locations.find(loc => loc.id == parent.location_id),
    participants: (parent) => {
      // Find matching participants for this event_id
      const eventParticipants = data.participants.filter(part => part.event_id == parent.id);
      // Map participant user_id to actual User object
      return eventParticipants.map(part => data.users.find(user => user.id == part.user_id)).filter(Boolean);
    }
  }
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the standalone server
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
