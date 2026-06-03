import axios from 'axios';
import { sitemapPerPage } from '../utils/variables';

export default async function getSitemapPageUrls({ type, page }) {
  const postType = type === 'post' ? 'posts' : type;
  const res = await axios.get(process.env.NEXT_PUBLIC_SD_API + `/site_map/${postType}/?pageNo=${page}&postType=${type}&perPage=${sitemapPerPage}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Referer': process.env.NEXT_PUBLIC_FRONTEND_URL,
    },
  });
  return (await res?.data) ?? [];
}
