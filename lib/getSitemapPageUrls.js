import axios from 'axios';
import { sitemapPerPage, wordpressUrl } from '../utils/variables';

export default async function getSitemapPageUrls({ type, page }) {
  const postType = type === 'post' ? 'posts' : type;
  const res = await axios.get(process.env.NEXT_PUBLIC_SD_API + `/site_map/${postType}/?pageNo=${page}&postType=${type}&perPage=${sitemapPerPage}`);
  return (await res?.data) ?? [];
}
