import axios from 'axios';
import { useState, useEffect } from 'react';

import DistributorSearch from './DistributorSearch';
import Loader from '../../../../Loader';
import PosterDiv from './PosterDiv';
import TableDiv from './TableDiv';
import RankMathSEO from '../../../../RankMathSEO';

const $ = require('jquery');

const DistributorDetail = () => {
  let id = window.location.search.replace('?distributors=', '');
  const [DistributorDetailDataLoaded, setDistributorDetailDataLoaded] = useState(false);
  const [DistributorDetailData, setDistributorDetailData] = useState([]);

  useEffect(() => {
    loadDistributorDetailData();
  }, []);

  const loadDistributorDetailData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/by-distributors.php?distributors=' + id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setDistributorDetailData(res.data);
        setDistributorDetailDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    $('.toggle_posttab ul li').click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    });

    $('.tab_items').click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      var tabtitle = $(this).data('title');
      var tabinfotitle = $(this).data('title');
      $('.filter_tabsinfo').hide();
      if ((tabtitle = tabinfotitle)) {
        $('.filter_tabsinfo[data-title="' + tabinfotitle + '"]').show();
      }
    });
  }, [DistributorDetailDataLoaded]);
  return (
    <>
      <RankMathSEO />
      {DistributorDetailDataLoaded ? (
        <section className="distributerinfo">
          <div className="container">
            <section className="disctcalander_srch">
              <div className="container">
                <DistributorSearch text={DistributorDetailData.content} requestfrom="distributordetail" backlink={DistributorDetailData.back_link} />
              </div>
            </section>
            <div className="distinfo_boxresult">
              <div className="top_txt df fww just-between">
                <h2>{DistributorDetailData.list_distributor_movie.title}</h2>
                <div className="toggle_posttab text-center">
                  <small>Switch View</small>
                  <ul className="df fww">
                    <li className="active tab_items" data-title="Poster">
                      Poster
                    </li>
                    <li className="tab_items" data-title="table">
                      table
                    </li>
                  </ul>
                </div>
              </div>
              <PosterDiv data={DistributorDetailData.list_distributor_movie.movies} />
              <TableDiv data={DistributorDetailData.list_distributor_movie.movies} />
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DistributorDetail;
