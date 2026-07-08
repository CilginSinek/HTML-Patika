import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// Query to get existing messages
const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      username
      text
      createdAt
    }
  }
`;

// Mutation to send a message
const SEND_MESSAGE = gql`
  mutation SendMessage($username: String!, $text: String!) {
    sendMessage(username: $username, text: $text) {
      id
      username
      text
      createdAt
    }
  }
`;

// Subscription for real-time messages
const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription OnMessageCreated {
    messageCreated {
      id
      username
      text
      createdAt
    }
  }
`;

// Random cool anonymous nicknames generator
const generateRandomUsername = () => {
  const adjectives = ['Neon', 'Cyber', 'Solar', 'Quantum', 'Shadow', 'Cosmic', 'Pixel', 'Alpha', 'Vortex'];
  const nouns = ['Ninja', 'Hacker', 'Ghost', 'Rider', 'Voyager', 'Phoenix', 'Knight', 'Pioneer', 'Echo'];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(100 + Math.random() * 900);
  return `${randomAdj}${randomNoun}${number}`;
};

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('chat_username') || '');
  const [tempUsername, setTempUsername] = useState('');
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const { data, loading, error, subscribeToMore } = useQuery(GET_MESSAGES);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  // Setup Subscription listener on component mount
  useEffect(() => {
    if (!subscribeToMore) return;
    
    const unsubscribe = subscribeToMore({
      document: MESSAGE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageCreated;
        
        // Prevent duplicate appending
        if (prev.messages.some((msg) => msg.id === newMessage.id)) {
          return prev;
        }
        
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages]);

  const handleSaveUsername = (e) => {
    e.preventDefault();
    const finalName = tempUsername.trim() || generateRandomUsername();
    setUsername(finalName);
    localStorage.setItem('chat_username', finalName);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    try {
      await sendMessageMutation({
        variables: {
          username,
          text: messageText.trim(),
        },
      });
      setMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  // If username is not set, show the glassmorphic nickname dialog
  if (!username) {
    return (
      <div className="setup-overlay">
        <form onSubmit={handleSaveUsername} className="setup-card">
          <h2 className="setup-title">Anonymous Chat</h2>
          <p className="setup-desc">
            Choose a custom display name, or leave it blank to get a randomly generated cool codename.
          </p>
          <input
            type="text"
            className="setup-input"
            placeholder="e.g. CyberSamurai"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            maxLength={25}
            autoFocus
          />
          <button type="submit" className="setup-btn">
            Join Chatroom
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Chatroom Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-icon">AC</div>
          <span className="brand-name">AnonyChat</span>
        </div>
        <div 
          className="user-status" 
          title="Click to change username"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            localStorage.removeItem('chat_username');
            setUsername('');
          }}
        >
          <span className="status-dot"></span>
          <span>{username}</span>
        </div>
      </header>

      {/* Messages History */}
      <main className="messages-container">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <span>Connecting to chat...</span>
          </div>
        )}

        {error && (
          <div className="empty-container">
            <span style={{ color: '#ef4444' }}>⚠️ Failed to connect to GraphQL backend.</span>
            <small style={{ color: 'var(--text-muted)' }}>Make sure the backend server is running.</small>
          </div>
        )}

        {!loading && !error && data?.messages.length === 0 && (
          <div className="empty-container">
            <span>👋 No messages yet. Be the first to start the conversation!</span>
          </div>
        )}

        {!loading &&
          !error &&
          data?.messages.map((msg) => {
            const isSelf = msg.username === username;
            return (
              <div key={msg.id} className={`message-wrapper ${isSelf ? 'self' : 'other'}`}>
                {!isSelf && <span className="message-sender">{msg.username}</span>}
                <div className="message-bubble">
                  {msg.text}
                </div>
                <span className="message-time">{formatTime(msg.createdAt)}</span>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </main>

      {/* Message input field */}
      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          className="chat-input"
          placeholder="Say something anonymous..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          maxLength={1000}
          required
        />
        <button type="submit" className="chat-send-btn">
          Send
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default App;
