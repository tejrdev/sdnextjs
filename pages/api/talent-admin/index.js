// import { NextResponse } from "next/server"
// import logindata from "./data.json"

// export async function GET(request) {
// 	return new NextResponse.json(logindata)
// }

/*import logindata from "./data.json"

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(logindata)
  } else if (req.method === 'POST'){
    // Process a POST request
  }
}*/

import logininfo from './data.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(logininfo)
  } else if (req.method === 'POST'){
    // Process a POST request
  }
}