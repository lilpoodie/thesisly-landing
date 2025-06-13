import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  // Function that calls your backend API
  async function generateProposal(topic) {
    const response = await fetch('/api/proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch proposal');
    }

    const data = await response.json();
    return data.proposal;
  }

  // Handle button click
  const handleClick = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setLoading(true);
    try {
      const generatedProposal = await generateProposal(topic);
      setProposal(generatedProposal);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
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
        style={{ padding: 8, width: 300 }}
      />
      <button
        onClick={handleClick}
        style={{ marginLeft: 10, padding: '8px 16px' }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Proposal'}
      </button>

      {proposal && (
        <div style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>
          <strong>Generated Proposal:</strong>
          <p>{proposal}</p>
        </div>
      )}
    </div>
  );
}
