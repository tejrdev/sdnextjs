import { FaXTwitter } from 'react-icons/fa6';
const SocialLinks = ({ data }) => {
  //console.log(data)
  const socialarray = data?.length > 0 ? data?.map(item => ({
    'link': item.link,
    'title': item.select_media,
    'class': item.select_media.toLowerCase() === 'facebook' ? 'fab fa-facebook-f' : item.select_media.toLowerCase() === 'instagram' ? 'fab fa-instagram' : item.select_media.toLowerCase() === 'twitter' ? 'fab fa-twitter' : item.select_media.toLowerCase() === 'linkedin' ? 'fab fa-linkedin' : item.select_media.toLowerCase() === 'youtube' ? 'fab fa-youtube' : item.select_media.toLowerCase() === 'wikipedia' ? 'fab fa-wikipedia-w' : item.select_media.toLowerCase() === 'website' ? 'far fa-globe' : null
  })) : [];
  return (
    <ul className='df fww printdochide list-none p-0 m-0 gap-2 justify-center [&>li]:inline-flex  [&>li]:w-8 [&>li]:h-8 [&>li]:rounded-full [&>li]:bg-neutral-300 [&>li]:items-center [&>li]:justify-center'>
      {socialarray.map(
        (item, i) =>
          item.link && (
            <li key={i}>
              <a href={item.link} target='_blank' title={item.title} rel='noreferrer' className='inline-flex items-center justify-center size-full bg-black text-white hover:bg-orangegold hover:text-black transition-colors rounded-full'>
                {item.title === 'Twitter' ? <FaXTwitter className='mt-1' /> : <i className={item.class} aria-hidden='true'></i>}
              </a>
            </li>
          )
      )}
      {/* {data.facebook_link && (
        <li>
          <a href={data.facebook_link} target='_blank' title='Facebook' rel='noreferrer'>
            <i className='fab fa-facebook-f' aria-hidden='true'></i>
          </a>
        </li>
      )}
      {data.instagram_link && (
        <li>
          <a href={data.instagram_link} target='_blank' title='Instagram' rel='noreferrer'>
            <i className='fab fa-instagram' aria-hidden='true'></i>
          </a>
        </li>
      )}
      {data.twitter_link && (
        <li>
          <a href={data.twitter_link} target='_blank' title='Twitter' rel='noreferrer'>
            <i className='fab fa-twitter' aria-hidden='true'></i>
          </a>
        </li>
      )}
      {data.linkedin_link && (
        <li>
          <a href={data.linkedin_link} target='_blank' title='LinkedIn' rel='noreferrer'>
            <i className='fab fa-linkedin-in' aria-hidden='true'></i>
          </a>
        </li>
      )}
      {data.youtube_link && (
        <li>
          <a href={data.youtube_link} target='_blank' title='Youtube' rel='noreferrer'>
            <i className='fab fa-youtube' aria-hidden='true'></i>
          </a>
        </li>
      )}
      {data.wikipedia_link && (
        <li>
          <a href={data.wikipedia_link} target='_blank' title='Wikipedia' rel='noreferrer'>
            <i className='fab fa-wikipedia-w' aria-hidden='true'></i>
          </a>
        </li>
      )} */}
    </ul>
  );
};

export default SocialLinks;
