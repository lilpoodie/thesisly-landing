export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'No topic provided' });
  }

  const proposal = `This thesis explores the complexities and implications of "${topic}" in modern academic and social contexts. It aims to provide new insights, supported by recent research and critical analysis.`;

  return res.status(200).json({ proposal });
}
