import React, { useState } from 'react';
import axios from 'axios';
import History from './History';

const Calculator = ({ token, onLogout }) => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // For history
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch history on demand
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/calculations?limit=5', axiosConfig);
      setHistory(response.data);
    } catch (err) {
      setError('Failed to fetch history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    if (a === '' || b === '') {
      setError('Please enter both numbers.');
      return;
    }

    if (isNaN(a) || isNaN(b)) {
      setError('Inputs must be valid numbers.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/calculator',
        {
          a: Number(a),
          b: Number(b),
          operation,
        },
        axiosConfig
      );
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Calculator</h2>
      <div style={styles.formRow}>
        <input
          type="number"
          placeholder="A"
          value={a}
          onChange={e => setA(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <select
          value={operation}
          onChange={e => setOperation(e.target.value)}
          style={styles.select}
          disabled={loading}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>

        <input
          type="number"
          placeholder="B"
          value={b}
          onChange={e => setB(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <button onClick={handleCalculate} disabled={loading} style={styles.button}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </div>

      <button 
        onClick={fetchHistory} 
        disabled={historyLoading}
        style={{...styles.button, marginTop: 10, backgroundColor: '#007bff'}}
      >
        {historyLoading ? 'Loading History...' : 'Load History'}
      </button>

      {error && <div style={styles.error}>{error}</div>}
      
      {result !== null && (
        <div style={styles.result}>
          Result: <strong>{result}</strong>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h3>History</h3>
        <History history={history} loading={historyLoading} />
      </div>

      <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
};

const styles = {
  formRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100px',
  },
  select: {
    padding: '8px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minWidth: '130px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
  },
  error: {
    marginTop: '10px',
    color: 'red',
  },
  result: {
    marginTop: '20px',
    fontSize: '1.2rem',
  },
  logoutButton: {
    marginTop: '30px',
    padding: '8px 20px',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
  }
};

export default Calculator;
