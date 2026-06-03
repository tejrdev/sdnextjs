// import axios from 'axios';

// export default async function getTotalCounts() {
//   const res = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/site_map/index.php');
//   let data = await res.data;
//   if (!data) return [];
//   const propertyNames = Object.keys(data);
//   let excludeItems = ['user'];
//   //if you want to remove any item from sitemap, add it to excludeItems array
//   let totalArray = propertyNames
//     .filter((name) => !excludeItems.includes(name))
//     .map((name) => {
//       return { name, total: data[name] };
//     });

//   return totalArray;
// }

import axios from 'axios';

export default async function getTotalCounts() {
  const apiBase = process.env.SD_API || process.env.NEXT_PUBLIC_SD_API;

  if (!apiBase) {
    throw new Error('SD_API env variable is not defined');
  }

  try {
    const res = await axios.get(apiBase + '/site_map/index.php', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': process.env.NEXT_PUBLIC_FRONTEND_URL,
      },
    });
    const data = res.data;
    if (!data) return [];

    const excludeItems = ['user', 'cache'];
    return Object.keys(data)
      .filter((name) => !excludeItems.includes(name))
      .map((name) => ({ name, total: data[name] }));

  } catch (err) {
    console.error('Sitemap API error:', err.message);
    throw err; // surfaces real error instead of generic 500
  }
}
