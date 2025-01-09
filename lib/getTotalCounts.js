import axios from 'axios';
import { wordpressUrl } from '../utils/variables';

export default async function getTotalCounts() {
  const res = await axios.get(process.env.NEXT_PUBLIC_SD_API + '/site_map/');
  let data = await res.data;
  if (!data) return [];
  const propertyNames = Object.keys(data);
  let excludeItems = ['user'];
  //if you want to remove any item from sitemap, add it to excludeItems array
  let totalArray = propertyNames
    .filter((name) => !excludeItems.includes(name))
    .map((name) => {
      return { name, total: data[name] };
    });

  return totalArray;
}
