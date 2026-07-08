import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
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

const GET_META_DATA = gql`
  query GetMetaData {
    users {
      id
      username
    }
    locations {
      id
      name
    }
  }
`;

// GraphQL Mutations
const ADD_EVENT = gql`
  mutation AddEvent(
    $title: String!
    $desc: String!
    $date: String!
    $from: String!
    $to: String!
    $location_id: ID!
    $user_id: ID!
  ) {
    addEvent(
      title: $title
      desc: $desc
      date: $date
      from: $from
      to: $to
      location_id: $location_id
      user_id: $user_id
    ) {
      id
      title
      desc
      date
      from
      to
    }
  }
`;

const ADD_PARTICIPANT = gql`
  mutation AddParticipant($eventId: ID!, $userId: ID!) {
    addParticipant(eventId: $eventId, userId: $userId) {
      id
      username
    }
  }
`;

// GraphQL Subscriptions
const EVENT_CREATED_SUBSCRIPTION = gql`
  subscription OnEventCreated {
    eventCreated {
      id
      title
      desc
      date
      from
      to
    }
  }
`;

const PARTICIPANT_ADDED_SUBSCRIPTION = gql`
  subscription OnParticipantAdded($eventId: ID!) {
    participantAdded(eventId: $eventId) {
      id
      username
    }
  }
`;

function App() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // Fetch events list
  const { loading: listLoading, error: listError, data: listData, subscribeToMore: subscribeToEvents } = useQuery(GET_EVENTS);

  // Subscribe to new events in real-time
  useEffect(() => {
    const unsubscribe = subscribeToEvents({
      document: EVENT_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newEvent = subscriptionData.data.eventCreated;
        if (prev.events.some(event => event.id === newEvent.id)) return prev;
        return {
          ...prev,
          events: [...prev.events, newEvent],
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToEvents]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Etkinlikler (Gerçek Zamanlı)</h1>
        <p>GraphQL Yoga Subscriptions (SSE) & Apollo Client</p>
        <button className="add-event-toggle-btn" onClick={() => setShowAddEventModal(!showAddEventModal)}>
          {showAddEventModal ? "Kapat" : "➕ Yeni Etkinlik Ekle"}
        </button>
      </header>

      {showAddEventModal && (
        <AddEventForm onSuccess={() => setShowAddEventModal(false)} />
      )}

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

// Form to add a new event
function AddEventForm({ onSuccess }) {
  const { data: metaData } = useQuery(GET_META_DATA);
  const [addEvent] = useMutation(ADD_EVENT);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [userId, setUserId] = useState('');
  const [locationId, setLocationId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !date || !from || !to || !userId || !locationId) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    try {
      await addEvent({
        variables: {
          title,
          desc,
          date,
          from,
          to,
          user_id: userId,
          location_id: locationId,
        },
      });
      onSuccess();
    } catch (err) {
      alert("Hata oluştu: " + err.message);
    }
  };

  return (
    <form className="add-event-form" onSubmit={handleSubmit}>
      <h3>Yeni Etkinlik Ekle</h3>
      <div className="form-group">
        <label>Başlık</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Açıklama</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Tarih</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Başlangıç</label>
          <input type="time" value={from} onChange={e => setFrom(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Bitiş</label>
          <input type="time" value={to} onChange={e => setTo(e.target.value)} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Etkinlik Sahibi</label>
          <select value={userId} onChange={e => setUserId(e.target.value)} required>
            <option value="">Seçin</option>
            {metaData?.users.map(u => (
              <option key={u.id} value={u.id}>{u.username}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Konum</label>
          <select value={locationId} onChange={e => setLocationId(e.target.value)} required>
            <option value="">Seçin</option>
            {metaData?.locations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="submit-btn">Etkinliği Oluştur</button>
    </form>
  );
}

// Sub-component for Event Details with Subscriber to participants
function EventDetail({ id }) {
  const { loading, error, data, subscribeToMore: subscribeToParticipants } = useQuery(GET_EVENT_DETAILS, {
    variables: { id },
  });
  const { data: metaData } = useQuery(GET_META_DATA);
  const [addParticipant] = useMutation(ADD_PARTICIPANT);
  const [selectedUser, setSelectedUser] = useState('');

  // Subscribe to real-time participants updates for this event
  useEffect(() => {
    const unsubscribe = subscribeToParticipants({
      document: PARTICIPANT_ADDED_SUBSCRIPTION,
      variables: { eventId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newParticipant = subscriptionData.data.participantAdded;
        if (prev.event.participants.some(p => p.id === newParticipant.id)) return prev;
        return {
          ...prev,
          event: {
            ...prev.event,
            participants: [...prev.event.participants, newParticipant],
          },
        };
      },
    });
    return () => unsubscribe();
  }, [id, subscribeToParticipants]);

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await addParticipant({
        variables: {
          eventId: id,
          userId: selectedUser,
        },
      });
      setSelectedUser('');
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

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

        <div className="meta-divider"></div>

        {/* Add Participant inline form */}
        <form className="add-participant-form" onSubmit={handleAddParticipant}>
          <strong>👥 Katılımcı Ekle</strong>
          <div className="form-row">
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} required>
              <option value="">Kullanıcı Seçin</option>
              {metaData?.users
                .filter(u => !event.participants.some(p => p.id === u.id))
                .map(u => (
                  <option key={u.id} value={u.id}>{u.username}</option>
                ))}
            </select>
            <button type="submit" className="add-participant-btn">Ekle</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
