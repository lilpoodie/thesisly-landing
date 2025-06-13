import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [proposal, setProposal] = useState('');
  const [error, setError] = useState('');

  const generateProposal = async () => {
    setError('');
    try {
      const response = await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
        return;
      }

      const data = await response.json();
      setProposal(data.proposal);
    } catch (err) {
      setError('Failed to fetch proposal');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Thesis Proposal Generator</h1>
      <input
        type="text"
        placeholder="Enter your topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={generateProposal} style={{ padding: 10 }}>
        Generate Proposal
      </button>

      {proposal && (
        <div style={{ marginTop: 20, background: '#eee', padding: 10 }}>
          <h2>Generated Proposal:</h2>
          <p>{proposal}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}