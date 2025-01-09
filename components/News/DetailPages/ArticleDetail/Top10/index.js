// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import BoxOffice from './BoxOffice';
import Listings from './Listings';
import TopBanner from './TopBanner';
// import Loader from '../../../../../Loader';

import CategotyNavigation from '../../CategotyNavigation';

const Top10 = ({ data }) => {
  // let { id } = useParams();
  // const [Top10DetailDataLoaded, setTop10DetailDataLoaded] = useState(false);
  // const [Top10DetailData, setTop10DetailData] = useState([]);

  // useEffect(() => {
  //   loadTop10DetailData();
  // }, []);

  // const loadTop10DetailData = () => {
  //   axios
  //     .get(
  //       process.env.NEXT_PUBLIC_SD_API +
  //         '/news_page/news_detail.php?url=' +
  //         process.env.NEXT_PUBLIC_MENU_URL +
  //         id +
  //         '&api_token=' +
  //         process.env.NEXT_PUBLIC_API_TOKEN
  //     )
  //     .then((res) => {
  //       setTop10DetailData(res.data);
  //       setTop10DetailDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <>
      <CategotyNavigation data={data.menu_items} />
      <div className="toparticels subfilmy">
        <TopBanner data={data} />
        <Listings data={data.top_movies} BottomText={data.tops_movies_more_info} />
        {/* <BoxOffice /> */}
      </div>
    </>
  );
};

export default Top10;
