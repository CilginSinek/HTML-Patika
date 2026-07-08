const GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql';

/**
 * Sends a POST request to the Rick and Morty GraphQL API.
 * Uses native fetch to avoid importing heavy third-party client libraries.
 * 
 * @param {string} query - The GraphQL query string.
 * @param {Object} [variables] - Query variables.
 * @returns {Promise<Object>} The JSON data returned by the server.
 * @throws {Error} If the HTTP request fails or GraphQL errors are returned.
 */
export async function fetchGraphQL(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    // Re-throw to be caught and displayed by the React state handlers
    throw error;
  }
}

/**
 * Fetches all available locations by traversing pages.
 * Necessary because the API only returns 20 items per page and we need a complete selection list.
 * 
 * @returns {Promise<Array<{id: string, name: string}>>} Array of location objects.
 */
export async function fetchAllLocations() {
  const query = `
    query GetLocations($page: Int) {
      locations(page: $page) {
        info {
          next
        }
        results {
          id
          name
        }
      }
    }
  `;

  let allLocations = [];
  let page = 1;
  let hasMore = true;

  // Fetch up to 5 pages (100 locations) to avoid infinite loops and performance lag
  while (hasMore && page <= 5) {
    const data = await fetchGraphQL(query, { page });
    if (data?.locations?.results) {
      allLocations = [...allLocations, ...data.locations.results];
    }
    hasMore = !!data?.locations?.info?.next;
    page += 1;
  }

  // Sort alphabetically for a more user-friendly select menu
  return allLocations.sort((a, b) => a.name.localeCompare(b.name));
}

export const GET_CHARACTERS = `
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        location {
          id
          name
        }
        origin {
          id
          name
        }
      }
    }
  }
`;

export const GET_LOCATION_RESIDENTS = `
  query GetLocationResidents($id: ID!) {
    location(id: $id) {
      name
      residents {
        id
        name
        status
        species
        type
        gender
        image
        location {
          id
          name
        }
        origin {
          id
          name
        }
      }
    }
  }
`;
