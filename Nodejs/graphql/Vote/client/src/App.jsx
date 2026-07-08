import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import './App.css';

// GraphQL Queries, Mutations, and Subscriptions
const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      title
      options {
        id
        title
        votes
      }
    }
  }
`;

const GET_QUESTION = gql`
  query GetQuestion($id: ID!) {
    question(id: $id) {
      id
      title
      options {
        id
        title
        votes
      }
    }
  }
`;

const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $options: [String!]!) {
    createQuestion(title: $title, options: $options) {
      id
      title
      options {
        id
        title
        votes
      }
    }
  }
`;

const VOTE_OPTION = gql`
  mutation VoteOption($questionId: ID!, $optionId: ID!) {
    voteOption(questionId: $questionId, optionId: $optionId) {
      id
      title
      options {
        id
        title
        votes
      }
    }
  }
`;

const QUESTION_ADDED_SUBSCRIPTION = gql`
  subscription OnQuestionAdded {
    questionAdded {
      id
      title
      options {
        id
        title
        votes
      }
    }
  }
`;

const QUESTION_VOTED_SUBSCRIPTION = gql`
  subscription OnQuestionVoted($id: ID!) {
    questionVoted(id: $id) {
      id
      title
      options {
        id
        title
        votes
      }
    }
  }
`;

/**
 * Renders the detail view of a single question including vote options, 
 * interactive voting, and real-time result displays.
 * @param {object} props
 * @param {string} props.questionId
 * @param {function} props.onBack
 */
function QuestionDetail({ questionId, onBack }) {
  const { data, loading, error, subscribeToMore } = useQuery(GET_QUESTION, {
    variables: { id: questionId }
  });

  const [voteOption] = useMutation(VOTE_OPTION);
  const [hasVoted, setHasVoted] = useState(false);

  // Subscribe to real-time updates for votes on this question.
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: QUESTION_VOTED_SUBSCRIPTION,
      variables: { id: questionId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          question: subscriptionData.data.questionVoted
        };
      }
    });
    return () => unsubscribe();
  }, [questionId, subscribeToMore]);

  if (loading) return <div className="loading">Loading question details...</div>;
  if (error) return <div className="error">Error loading question: {error.message}</div>;

  const question = data?.question;
  if (!question) return <div className="error">Question not found.</div>;

  const totalVotes = question.options.reduce((sum, opt) => sum + opt.votes, 0);

  /**
   * Handles user's vote action for a specific option.
   * @param {string} optionId
   */
  const handleVote = async (optionId) => {
    try {
      await voteOption({
        variables: {
          questionId,
          optionId
        }
      });
      setHasVoted(true);
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  return (
    <div className="card detail-card">
      <button className="btn-secondary back-btn" onClick={onBack}>
        ← Back to Questions
      </button>
      <h2>{question.title}</h2>

      {!hasVoted ? (
        <div className="options-list">
          <p className="instruction-text">Cast your vote:</p>
          {question.options.map((option) => (
            <button
              key={option.id}
              className="option-vote-btn"
              onClick={() => handleVote(option.id)}
            >
              {option.title}
            </button>
          ))}
        </div>
      ) : (
        <div className="results-container">
          <p className="instruction-text">Live Results ({totalVotes} votes total):</p>
          {question.options.map((option) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            return (
              <div key={option.id} className="result-item">
                <div className="result-info">
                  <span className="result-title">{option.title}</span>
                  <span className="result-count">
                    {option.votes} vote{option.votes !== 1 && 's'} ({percentage}%)
                  </span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
          <button className="btn-secondary" style={{ marginTop: '20px' }} onClick={() => setHasVoted(false)}>
            Vote Again
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Handles creation of new questions with dynamic number of options.
 * @param {object} props
 * @param {function} props.onSuccess
 * @param {function} props.onCancel
 */
function CreateQuestionForm({ onSuccess, onCancel }) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION);

  /**
   * Updates a specific option's input text.
   * @param {number} index
   * @param {string} value
   */
  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  /**
   * Adds an empty input field for a new option.
   */
  const addOptionField = () => {
    setOptions([...options, '']);
  };

  /**
   * Removes an option input field.
   * @param {number} index
   */
  const removeOptionField = (index) => {
    if (options.length <= 2) return; // Keep at least 2 options
    const updated = options.filter((_, idx) => idx !== index);
    setOptions(updated);
  };

  /**
   * Submits the new question and options to the GraphQL endpoint.
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanOptions = options.map((opt) => opt.trim()).filter((opt) => opt !== '');
    if (!title.trim() || cleanOptions.length < 2) {
      alert('Please fill out the question and provide at least 2 options.');
      return;
    }

    try {
      await createQuestion({
        variables: {
          title: title.trim(),
          options: cleanOptions
        }
      });
      onSuccess();
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  return (
    <div className="card form-card">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="poll-title">Question</label>
          <input
            id="poll-title"
            type="text"
            placeholder="What would you like to ask?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Options</label>
          {options.map((option, index) => (
            <div key={index} className="option-input-row">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeOptionField(index)}
                  title="Remove option"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn-secondary add-opt-btn" onClick={addOptionField}>
            + Add Option
          </button>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Poll'}
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * Main application component managing state routes between List, Detail, and Create views.
 */
function App() {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data, loading, error, subscribeToMore } = useQuery(GET_QUESTIONS);

  // Subscribe to real-time newly added questions.
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: QUESTION_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newQuestion = subscriptionData.data.questionAdded;
        if (prev.questions.some((q) => q.id === newQuestion.id)) {
          return prev;
        }
        return {
          questions: [newQuestion, ...prev.questions]
        };
      }
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  return (
    <div className="container">
      <header className="app-header">
        <h1>📊 Realtime Voting</h1>
        <p className="subtitle">Cast your vote or create custom real-time polls instantly</p>
      </header>

      <main className="app-content">
        {selectedQuestionId ? (
          <QuestionDetail
            questionId={selectedQuestionId}
            onBack={() => setSelectedQuestionId(null)}
          />
        ) : showCreateForm ? (
          <CreateQuestionForm
            onSuccess={() => {
              setShowCreateForm(false);
            }}
            onCancel={() => setShowCreateForm(false)}
          />
        ) : (
          <div className="questions-section">
            <div className="section-header">
              <h2>Active Polls</h2>
              <button className="btn-primary" onClick={() => setShowCreateForm(true)}>
                + Create New Poll
              </button>
            </div>

            {loading && <div className="loading">Loading active polls...</div>}
            {error && <div className="error">Error loading polls: {error.message}</div>}

            {data && data.questions.length === 0 && (
              <div className="no-data">No active polls found. Create one to get started!</div>
            )}

            {data && (
              <div className="questions-grid">
                {data.questions.map((question) => {
                  const totalVotes = question.options.reduce((sum, opt) => sum + opt.votes, 0);
                  return (
                    <div 
                      key={question.id} 
                      className="card question-card"
                      onClick={() => setSelectedQuestionId(question.id)}
                    >
                      <h3>{question.title}</h3>
                      <div className="question-card-footer">
                        <span>{question.options.length} options</span>
                        <span className="vote-badge">{totalVotes} vote{totalVotes !== 1 && 's'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
