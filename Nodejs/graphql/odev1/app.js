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
  type Mutation{
    addUser(username: String!, email: String!): Boolean!,
    updateUser(id: Int!, username: String, email: String): Boolean!,
    deleteUser(id: Int!): Boolean!,
    deleteAllUsers: Boolean!,

    addEvent(title: String!, desc: String!, location_id: Int!, date: String!, from: String!, to: String!): Boolean!,
    updateEvent(id: Int!, title: String, desc: String, location_id: Int, date: String, from: String, to: String): Boolean!,
    deleteEvent(id: Int!): Boolean!,
    deleteAllEvents: Boolean!,

    addLocation(name: String!, desc: String!, lat: Float!, lng: Float!): Boolean!,
    updateLocation(id: Int, name: String, desc: String, lat: Float, lng: Float): Boolean!,
    deleteLocation(id: Int!): Boolean!,
    deleteAllLocations: Boolean!,

    addParticipant(user_id: Int!, event_id: Int!): Boolean!,
    updateParticipant(id: Int, user_id: Int, event_id: Int): Boolean!,
    deleteParticipant(id: Int!): Boolean!,
    deleteAllParticipants: Boolean!,
  }
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

  Mutation: {
    addUser: (parent, args) => {
      try {
        const user = {
          id: generateRandomId(data.users),
          username: args.username,
          email: args.email,
        };
        data.users.push(user);
        return true;
      } catch (err) {
        return false;
      }
    },
    updateUser: (parent, args) => {
      try {
        const user = data.users.find((user) => user.id == args.id);
        if (!user) return false;
        const newUser = {
          ...user,
          ...args,
        };
        const newlist = data.users.filter((user) => user.id != args.id);
        newlist.push(newUser);
        data.users = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteUser: (parent, args) => {
      try {
        const user = data.users.find((user) => user.id == args.id);
        if (!user) return false;
        const newlist = data.users.filter((user) => user.id != args.id);
        data.users = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteAllUsers: () => {
      data.users = [];
      return true;
    },


  

    addEvent: (parent, args) => {
      try {
        const event = {
          id: generateRandomId(data.events),
          title: args.title,
          desc: args.desc,
          location_id: args.location_id,
          user_id: args.user_id,
          date: args.date,
          from: args.from,
          to: args.to,
        };
        data.events.push(event);
        return true;
      } catch (err) {
        return false;
      }
    },

    updateEvent: (parent, args) => {
      try {
        const event = data.events.find((event) => event.id == args.id);
        if (!event) return false;
        const newEvent = {
          ...event,
          ...args,
        };
        const newlist = data.events.filter((event) => event.id != args.id);
        newlist.push(newEvent);
        data.events = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteEvent: (parent, args) => {
      try {
        const event = data.events.find((event) => event.id == args.id);
        if (!event) return false;
        const newlist = data.events.filter((event) => event.id != args.id);
        data.events = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteAllEvents: () => {
      data.events = [];
      return true;
    },





    addLocation: (parent, args) => {
      try {
        const location = {
          id: generateRandomId(data.locations),
          name: args.name,
          desc: args.desc,
          lat: args.lat,
          lng: args.lng,
        };
        data.locations.push(location);
        return true;
      } catch (err) {
        return false;
      }
    },

    updateLocation: (parent, args) => {
      try {
        const location = data.locations.find(
          (location) => location.id == args.id
        );
        if (!location) return false;
        const newLocation = {
          ...location,
          ...args,
        };
        const newlist = data.locations.filter(
          (location) => location.id != args.id
        );
        newlist.push(newLocation);
        data.locations = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteLocation: (parent, args) => {
      try {
        const location = data.locations.find(
          (location) => location.id == args.id
        );
        if (!location) return false;
        const newlist = data.locations.filter(
          (location) => location.id != args.id
        );
        data.locations = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteAllLocations: () => {
      data.locations = [];
      return true;
    },

    addparticipant: (parent, args) => {
      try {
        const participant = {
          id: generateRandomId(data.participants),
          user_id: args.user_id,
          event_id: args.event_id,
        };
        data.participants.push(participant);
        return true;
      } catch (err) {
        return false;
      }
    },

    updateparticipant: (parent, args) => {
      try {
        const participant = data.participants.find(
          (participant) => participant.id == args.id
        )
        if (!participant) return false;
        const newparticipant = {
          ...participant,
          ...args,
        };
        const newlist = data.participants.filter(
          (participant) => participant.id != args.id
        );
        newlist.push(newparticipant);
        data.participants = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteparticipant: (parent, args) => {
      try {
        const participant = data.participants.find(
          (participant) => participant.id == args.id
        )
        if (!participant) return false;
        const newlist = data.participants.filter(
          (participant) => participant.id != args.id
        );
        data.participants = newlist;
        return true;
      } catch (err) {
        return false;
      }
    },
    deleteAllparticipants: () => {
      data.participants = [];
      return true;
    },
    

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

function generateRandomId(arr) {
  const id = Math.floor(Math.random() * 10000);
  let canGo;
  for (let obj in arr) {
    if (obj["id"] === id) {
      canGo = false;
    } else {
      canGo = true;
    }
  }
  if (!canGo) {
    generateRandomId(arr);
  }
  return id;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
