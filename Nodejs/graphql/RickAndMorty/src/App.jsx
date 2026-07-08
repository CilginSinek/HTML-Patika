import { useState, useEffect } from 'react';
import {
  fetchGraphQL,
  fetchAllLocations,
  GET_CHARACTERS,
  GET_LOCATION_RESIDENTS,
} from './graphql';

/**
 * Main application component for Rick and Morty Character Viewer.
 * Contains states for search, filters, pagination, and fetched data.
 * 
 * @returns {JSX.Element} The rendered React App.
 */
function App() {
  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [locationId, setLocationId] = useState('');
  
  // Page states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // GraphQL Data states
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce search input to avoid triggering excessive API calls during typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Load locations once when the app mounts to populate the location dropdown
  useEffect(() => {
    fetchAllLocations()
      .then((data) => setLocations(data))
      .catch((err) => console.error('Failed to load locations', err));
  }, []);

  // Fetch characters based on active filters and page
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function loadData() {
      try {
        if (locationId) {
          // If filtering by location, fetch all residents of that location
          const data = await fetchGraphQL(GET_LOCATION_RESIDENTS, { id: locationId });
          if (!isMounted) return;

          const residents = data?.location?.residents || [];
          
          // Apply other filters client-side on the location residents list
          const filtered = residents.filter((char) => {
            const matchName = !debouncedSearch || char.name.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchGender = !gender || char.gender === gender;
            const matchSpecies = !species || char.species.toLowerCase().includes(species.toLowerCase());
            return matchName && matchGender && matchSpecies;
          });

          // Paginate the client-side filtered result list
          const limit = 20;
          const total = Math.ceil(filtered.length / limit);
          setTotalPages(total === 0 ? 1 : total);

          // Force page correction if the current page index is out of bounds after filtering
          const activePage = page > total ? 1 : page;
          if (activePage !== page) {
            setPage(activePage);
          }

          const startIndex = (activePage - 1) * limit;
          setCharacters(filtered.slice(startIndex, startIndex + limit));
        } else {
          // If no location filter is active, fetch directly from characters endpoint with server-side filters
          const filter = {};
          if (debouncedSearch) filter.name = debouncedSearch;
          if (gender) filter.gender = gender;
          if (species) filter.species = species;

          const data = await fetchGraphQL(GET_CHARACTERS, { page, filter });
          if (!isMounted) return;

          setCharacters(data?.characters?.results || []);
          setTotalPages(data?.characters?.info?.pages || 1);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Character data could not be retrieved.');
        setCharacters([]);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch, gender, species, locationId, page]);

  /**
   * Resets all filters and returns the view to page 1.
   * Promotes ease of navigation.
   */
  const handleClearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setGender('');
    setSpecies('');
    setLocationId('');
    setPage(1);
  };

  /**
   * Safe page changes to prevent out of bound navigation.
   * 
   * @param {number} newPage - The destination page index.
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header>
        <h1>Rick & Morty Portal</h1>
        <p className="subtitle">
          Explore characters using <span>GraphQL</span> endpoints
        </p>
      </header>

      {/* Control panel containing Search input & Filter selectors */}
      <section className="controls-container glass">
        <div className="search-row">
          <div className="search-wrapper">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search characters by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-row">
          {/* Gender Filter */}
          <select
            className="filter-select"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>

          {/* Species Filter */}
          <select
            className="filter-select"
            value={species}
            onChange={(e) => {
              setSpecies(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Species</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
            <option value="humanoid">Humanoid</option>
            <option value="poopybutthole">Poopybutthole</option>
            <option value="mythological creature">Mythological</option>
            <option value="animal">Animal</option>
            <option value="robot">Robot</option>
            <option value="cronenberg">Cronenberg</option>
            <option value="disease">Disease</option>
            <option value="unknown">Unknown</option>
          </select>

          {/* Location Filter */}
          <select
            className="filter-select"
            value={locationId}
            onChange={(e) => {
              setLocationId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* Clear Button */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearFilters}
            disabled={!searchTerm && !gender && !species && !locationId}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            Clear Filters
          </button>
        </div>
      </section>

      {/* Main characters rendering grid */}
      <main style={{ flexGrow: 1 }}>
        {loading ? (
          <div className="message-box glass">
            <span className="loader"></span>
            <div>Loading characters from portal...</div>
          </div>
        ) : error ? (
          <div className="message-box glass" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <div style={{ color: '#f87171', marginBottom: '10px', fontSize: '2rem' }}>⚠️</div>
            <div>{error}</div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : characters.length === 0 ? (
          <div className="message-box glass">
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔍</div>
            <div>No characters match the selected criteria.</div>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: '20px' }}
              onClick={handleClearFilters}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="characters-grid">
              {characters.map((char) => (
                <div key={char.id} className="character-card glass">
                  <div className="card-img-wrapper">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="card-img"
                      loading="lazy"
                    />
                    <span className={`card-badge status-${char.status.toLowerCase()}`}>
                      {char.status}
                    </span>
                  </div>
                  <div className="card-content">
                    <h2 className="char-title">{char.name}</h2>
                    <div className="char-meta-row">
                      <div>
                        <div className="char-meta-label">Species & Gender</div>
                        <div className="char-meta-val">
                          {char.species} ({char.gender})
                        </div>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <div className="char-meta-label">Last Known Location</div>
                        <div className="char-meta-val">{char.location?.name || 'Unknown'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="page-num">
                  Page {page} / {totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
