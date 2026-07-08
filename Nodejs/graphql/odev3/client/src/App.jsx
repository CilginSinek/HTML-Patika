import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import './App.css';

// GraphQL Queries
const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      desc
      date
      from
      to
    }
  }
`;

const GET_EVENT_DETAILS = gql`
  query GetEventDetails($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
      user {
        id
        username
        email
      }
      location {
        id
        name
        desc
        lat
        lng
      }
      participants {
        id
        username
      }
    }
  }
`;

function App() {
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Fetch events list
  const { loading: listLoading, error: listError, data: listData } = useQuery(GET_EVENTS);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Etkinlikler</h1>
        <p>GraphQL & Apollo Client ile Etkinlik Takibi</p>
      </header>

      <main className="app-content">
        {/* Events List */}
        <section className="events-list-section">
          <h2>Etkinlik Listesi</h2>
          {listLoading && <p className="loading">Yükleniyor...</p>}
          {listError && <p className="error">Hata: {listError.message}</p>}
          {listData && (
            <div className="events-grid">
              {listData.events.map((event) => (
                <div
                  key={event.id}
                  className={`event-card ${selectedEventId === event.id ? 'active' : ''}`}
                  onClick={() => setSelectedEventId(event.id)}
                >
                  <h3>{event.title}</h3>
                  <p className="event-desc">{event.desc}</p>
                  <div className="event-time">
                    <span>📅 {event.date}</span>
                    <span>⏰ {event.from} - {event.to}</span>
                  </div>
                  <button className="detail-btn">Detayları Gör</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Event Detail */}
        <section className="event-detail-section">
          <h2>Etkinlik Detayı</h2>
          {selectedEventId ? (
            <EventDetail id={selectedEventId} />
          ) : (
            <div className="no-selection">
              <p>Detayları görüntülemek için soldan bir etkinlik seçin.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Sub-component for Event Details
function EventDetail({ id }) {
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="loading">Detaylar yükleniyor...</p>;
  if (error) return <p className="error">Hata: {error.message}</p>;

  const { event } = data;

  return (
    <div className="detail-card">
      <h3>{event.title}</h3>
      <p className="detail-desc">{event.desc}</p>

      <div className="detail-meta">
        <div className="meta-item">
          <strong>Tarih & Saat:</strong>
          <span>📅 {event.date} | ⏰ {event.from} - {event.to}</span>
        </div>

        <div className="meta-divider"></div>

        <div className="meta-item">
          <strong>👤 Etkinlik Sahibi:</strong>
          <span className="owner-info">{event.user.username} ({event.user.email})</span>
        </div>

        <div className="meta-divider"></div>

        <div className="meta-item">
          <strong>📍 Konum:</strong>
          <span className="location-name">{event.location.name}</span>
          <p className="location-desc">{event.location.desc}</p>
          <span className="coords">Koordinatlar: {event.location.lat}, {event.location.lng}</span>
        </div>

        <div className="meta-divider"></div>

        <div className="meta-item">
          <strong>👥 Katılımcılar ({event.participants.length}):</strong>
          {event.participants.length > 0 ? (
            <ul className="participants-list">
              {event.participants.map((participant) => (
                <li key={participant.id}>• {participant.username}</li>
              ))}
            </ul>
          ) : (
            <p className="no-participants">Katılımcı bulunmuyor.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
