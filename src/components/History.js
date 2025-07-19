import React from 'react';

const History = ({ history, loading }) => {
  if (loading) {
    return <p>Loading history...</p>;
  }

  if (history.length === 0) {
    return <p>No calculations yet.</p>;
  }

  const renderOpSymbol = (op) => {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return op;
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <ul>
      {history.map(item => (
        <li key={item.id}>
          {item.a} {renderOpSymbol(item.operation)} {item.b} = {item.result} ({formatDate(item.created_at)})
        </li>
      ))}
    </ul>
  );
};

export default History;
