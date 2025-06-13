export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const fakeProposal = `This is a sample thesis proposal about: ${topic}. It explores key challenges and proposes innovative solutions in this field.`;

  res.status(200).json({ proposal: fakeProposal });
}