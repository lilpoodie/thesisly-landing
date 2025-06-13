import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [proposal, setProposal] = useState('');

  const generateProposal = async () => {
    if (!topic.trim()) return alert('Please enter a topic.');

    try {
      const response = await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch proposal');
      }

      const data = await response.json();
      setProposal(data.proposal);
    } catch (error) {
      alert(error.message);
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
        style={{ padding: 8, width: '300px' }}
      />
      <button onClick={generateProposal} style={{ marginLeft: 10, padding: '8px 16px' }}>
        Generate Proposal
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>
        {proposal && <strong>Generated Proposal:</strong>}
        <p>{proposal}</p>
      </div>
    </div>
  );
}
