const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const data = require("./data.json");

const typeDefs = `
  type Query {
    hello: String
    users: [User!]!,
    user(id: Int!): User!,
    events: [Event!]!,
    event(id: Int!): Event!,
    locations: [Location!]!,
    location(id: Int!): Location!,
    participants: [Participant!]!,
    participant(id: Int!): Participant!,
  },
  type User{
    id: Int!,
    username: String!,
    email: String!,
    events: [Event!]!,
  },
  type Event{
    id: Int!,
    title: String!,
    desc: String!,
    location: Location!,
    date: String!,
    from: String!,
    to: String!,
    location_id: Int!,
    user: User!,
    participants: [Participant!]!,
  },
  type Location{
    id: Int!,
    name: String!,
    desc: String!,
    lat: Float!,
    lng: Float!,
  },
  type Participant{
    id: Int!,
    user_id: Int!,
    event_id: Int!,
    user: User!,
    event: Event!,
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",

    users: () => data.users,
    user: (parent, args) => data.users.find((user) => user.id === args.id),

    events: () => data.events,
    event: (parent, args) => data.events.find((event) => event.id === args.id),

    locations: () => data.locations,
    location: (parent, args) =>
      data.locations.find((location) => location.id === args.id),

    participants: () => data.participants,
    participant: (parent, args) =>
      data.participants.find((participant) => participant.id === args.id),
  },

  User: {
    events: (parent) =>
      data.events.filter((event) => event.user_id === parent.id),
  },
  Event: {
    location: (parent) =>
      data.locations.find((location) => location.id == parent.location_id),
    user: (parent) => data.users.find((user) => user.id === parent.user_id),
    participants: (parent) =>
      data.participants.filter(
        (participant) => participant.event_id === parent.id
      ),
  },
  Participant: {
    user: (parent) => data.users.find((user) => user.id === parent.user_id),
    event: (parent) =>
      data.events.find((event) => event.id === parent.event_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
