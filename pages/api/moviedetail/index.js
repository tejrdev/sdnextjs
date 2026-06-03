import { JSONData } from '@/components/shared/JSONData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(JSONData.moviedetail)
  } else if (req.method === 'POST'){
    // Process a POST request
  }
}