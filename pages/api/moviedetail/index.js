import data from './data.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(data)
  } else if (req.method === 'POST'){
    // Process a POST request
  }
}