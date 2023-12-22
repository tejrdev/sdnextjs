const Navigation = ({ data }) => {
  return (
    <div className="secnav_link">
      <div className="container">
        <ul className="secnav_linkin df">
          {data.film_photos.length > 1 && (
            <li className="">
              <a href="#gallery">gallery</a>
            </li>
          )}
          {/*data.talent_videos.length > 1 && (
            <li className="">
              {' '}
              <a href="#videos">videos</a>{' '}
            </li>
          )}
          {
          <li className="">
            <a href="#known">known For</a>
          </li>
          <li className="">
            <a href="#awards">awards</a>
          </li>
          */}
          {data.talent_movie_data.length > 1 && (
            <li className="">
              <a href="#filmography">Filmography</a>
            </li>
          )}

          {data.personal_details && (
            <li className="">
              <a href="#personal_details">Personal Details</a>
            </li>
          )}
          {data.facts && (
            <li className="">
              <a href="#facts">Facts</a>
            </li>
          )}
          {data.news && data.news.length > 0 && (
            <li className="">
              <a href="#news_updates">News &amp; Updates</a>
            </li>
          )}
          {data.people_also_search && (
            <li className="">
              <a href="#people_search">People Also Search For</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
