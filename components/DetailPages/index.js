import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import RankMathSEO from '../../RankMathSEO';
import Exhibitor from './Exhibitor';
import Theatre from './Theatre';

const DetailsPage = () => {
  let { id } = useParams();
  //console.log(id);
  const [DetailsDataLoaded, setDetailsDataLoaded] = useState(false);
  const [DetailsData, setDetailsData] = useState([]);

  useEffect(() => {
    loadDetailPageData();
  }, []);

  const loadDetailPageData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API +
          '/detail_pages/exhibitors-theatres.php?api_token=' +
          process.env.NEXT_PUBLIC_API_TOKEN +
          '&url=' +
          process.env.NEXT_PUBLIC_MENU_URL +
          'exhibitors-theatres/' +
          id
      )
      .then((res) => {
        setDetailsData(res.data);
        setDetailsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <RankMathSEO />
      {DetailsDataLoaded ? (
        <>
          {DetailsData.top_title === 'Theatre' ? <Theatre data={DetailsData} /> : null}
          {DetailsData.top_title === 'Exhibitor' ? <Exhibitor data={DetailsData} /> : null}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default DetailsPage;
