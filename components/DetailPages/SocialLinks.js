const SocialLinks = ({ data }) => {
  return (
    <ul className='social-links df fww printdochide'>
      {data.facebook_link && (
        <li>
          <a href={data.facebook_link} target='_blank' title='Facebook' rel='noreferrer'>
            {' '}
            <i className='fab fa-facebook-f' aria-hidden='true'></i>{' '}
          </a>
        </li>
      )}
      {data.instagram_link && (
        <li>
          <a href={data.instagram_link} target='_blank' title='Instagram' rel='noreferrer'>
            {' '}
            <i className='fab fa-instagram' aria-hidden='true'></i>{' '}
          </a>
        </li>
      )}
      {data.twitter_link && (
        <li>
          <a href={data.twitter_link} target='_blank' title='Twitter' rel='noreferrer'>
            {' '}
            <i className='fab fa-twitter' aria-hidden='true'></i>{' '}
          </a>
        </li>
      )}
      {data.linkedin_link && (
        <li>
          <a href={data.linkedin_link} target='_blank' title='LinkedIn' rel='noreferrer'>
            {' '}
            <i className='fab fa-linkedin-in' aria-hidden='true'></i>{' '}
          </a>
        </li>
      )}
      {data.youtube_link && (
        <li>
          <a href={data.youtube_link} target='_blank' title='Youtube' rel='noreferrer'>
            {' '}
            <i className='fab fa-youtube' aria-hidden='true'></i>{' '}
          </a>
        </li>
      )}
    </ul>
  );
};

export default SocialLinks;
