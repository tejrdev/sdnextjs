import { FaXTwitter } from 'react-icons/fa6';
const SocialLinks = ({ data }) => {
  //console.log(data)
  const socialarray = [
    { 'link': data.facebook_link, 'title': 'Facebook', 'class': 'fab fa-facebook-f' },
    { 'link': data.instagram_link, 'title': 'Instagram', 'class': 'fab fa-instagram' },
    { 'link': data.twitter_link, 'title': 'Twitter', 'class': 'fab fa-twitter' },
    { 'link': data.linkedin_link, 'title': 'LinkedIn', 'class': 'fab fa-linkedin' },
    { 'link': data.youtube_link, 'title': 'Youtube', 'class': 'fab fa-youtube' },
    { 'link': data.wikipedia_link, 'title': 'Wikipedia', 'class': 'fab fa-wikipedia-w' },
  ];
  return (
    <ul className='social-links df fww printdochide'>
      {socialarray.map(
        (item, i) =>
          item.link && (
            <li className='mt-2' key={i}>
              <a href={item.link} target='_blank' title={item.title} rel='noreferrer'>
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
