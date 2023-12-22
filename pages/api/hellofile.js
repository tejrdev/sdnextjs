/*export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe hello' })
}*/


//import logindata from "../data.json"


export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ name: 'John Doe hello aa11' })
  } else if (req.method === 'POST'){
    // Process a POST request
  }
}

