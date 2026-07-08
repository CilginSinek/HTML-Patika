import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { countries, continents, languages } from './data.js';

/**
 * GraphQL Type Definitions.
 * Sets up the schema for Continent, Country, and Language types,
 * along with the relationships linking them together.
 */
const typeDefs = `#graphql
  type Continent {
    id: ID!
    code: String!
    name: String!
    countries: [Country!]!
  }

  type Country {
    id: ID!
    code: String!
    name: String!
    capital: String
    native: String
    emoji: String
    currency: String
    phone: String
    continent: Continent!
    languages: [Language!]!
  }

  type Language {
    id: ID!
    code: String!
    name: String!
    native: String
    rtl: Boolean!
    countries: [Country!]!
  }

  type Query {
    continents: [Continent!]!
    continent(id: ID!): Continent
    countries: [Country!]!
    country(id: ID!): Country
    languages: [Language!]!
    language(id: ID!): Language
  }
`;

/**
 * GraphQL Resolvers.
 * Implements resolvers for queries and nested relationships.
 * Relies on the static datasets imported from data.js.
 */
const resolvers = {
  Query: {
    /**
     * Retrieves all continents.
     * @returns {Array} List of continents.
     */
    continents: () => continents,

    /**
     * Retrieves a single continent by its code.
     * @param {null} _
     * @param {Object} args
     * @param {string} args.id The continent code (e.g. "EU").
     * @returns {Object|null} Matching continent object or undefined.
     */
    continent: (_, { id }) => continents.find(c => c.code === id),

    /**
     * Retrieves all countries.
     * @returns {Array} List of countries.
     */
    countries: () => countries,

    /**
     * Retrieves a single country by its code.
     * @param {null} _
     * @param {Object} args
     * @param {string} args.id The country code (e.g. "TR").
     * @returns {Object|null} Matching country object or undefined.
     */
    country: (_, { id }) => countries.find(c => c.code === id),

    /**
     * Retrieves all languages.
     * @returns {Array} List of languages.
     */
    languages: () => languages,

    /**
     * Retrieves a single language by its code.
     * @param {null} _
     * @param {Object} args
     * @param {string} args.id The language code (e.g. "tr").
     * @returns {Object|null} Matching language object or undefined.
     */
    language: (_, { id }) => languages.find(l => l.code === id),
  },

  Continent: {
    /**
     * Resolves the ID to the continent code.
     * @param {Object} parent
     * @returns {string}
     */
    id: (parent) => parent.code,

    /**
     * Finds countries that belong to this continent.
     * We filter the global list of countries by matching the continent name to keep data clean and simple.
     * @param {Object} parent The continent object.
     * @returns {Array} List of matching countries.
     */
    countries: (parent) => countries.filter(c => c.continent && c.continent.name === parent.name),
  },

  Country: {
    /**
     * Resolves the ID to the country code.
     * @param {Object} parent
     * @returns {string}
     */
    id: (parent) => parent.code,

    /**
     * Finds the continent that this country belongs to.
     * @param {Object} parent The country object.
     * @returns {Object|null} Matching continent.
     */
    continent: (parent) => continents.find(c => c.name === parent.continent.name),

    /**
     * Resolves complete language information for the country.
     * Since country objects only have the language name, we map it to the full language dataset to retrieve extra fields like native/rtl.
     * @param {Object} parent The country object.
     * @returns {Array} List of resolved languages.
     */
    languages: (parent) => {
      if (!parent.languages) return [];
      return parent.languages.map(lang => {
        const found = languages.find(l => l.name === lang.name);
        return found || { id: '', code: '', name: lang.name, native: '', rtl: false };
      });
    },
  },

  Language: {
    /**
     * Resolves the ID to the language code.
     * @param {Object} parent
     * @returns {string}
     */
    id: (parent) => parent.code,

    /**
     * Finds countries where this language is spoken.
     * Checks if the language name is included in the country's language list.
     * @param {Object} parent The language object.
     * @returns {Array} List of countries speaking this language.
     */
    countries: (parent) => countries.filter(c => c.languages && c.languages.some(lang => lang.name === parent.name)),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
