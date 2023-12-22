import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../Loader';
import Pagination from '../Directory/ListingPages/Pagination';
const $ = require('jquery');

const THeatreLocation = ({ id }) => {
  const [locationDataLoaded, setLocationDataLoaded] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [Location_listPages, setLocation_listPages] = useState([]);
  const [Location_listPage, setLocation_listPage] = useState(1);
  const [LocationListData, setLocationListData] = useState([]);
  const [Location_listDataLoaded, setLocation_listDataLoaded] = useState(false);
  const [LocationSearch, setLocationSearch] = useState(['All']);
  const [FilterOption, setFilterOption] = useState([]);

  useEffect(() => {
    loadDetailPageData();
  }, []);

  useEffect(() => {
    if (LocationSearch !== '') {
      load_Location_search(LocationSearch);
    }
  }, [Location_listPage, LocationSearch]);

  const setCurrentPage = (currentPage) => {
    setLocation_listPage(currentPage);
  };

  const onStateClicked = (e) => {
    e.preventDefault();
    // setLocation_listPage(1);
    const name = e.target.getAttribute('name').trim();
    const index = LocationSearch.indexOf(name);
    let arr = LocationSearch;

    arr = [];
    $('.list_azfilter li').removeClass('active');
    if (name !== 'all') arr.push(name);

    // if (name === 'all') {
    //   arr = [];
    //   $('.list_azfilter li').removeClass('active');
    // } else {
    //   if (index > -1) {
    //     // only splice array when item is found
    //     arr.splice(index, 1); // 2nd parameter means remove one item only
    //   } else {
    //     arr.push(name);
    //   }
    // }
    e.target.parentElement.classList.toggle('active');
    setLocationSearch(arr);
    // load_Location_search(arr);
    $('.page-numbers[data-page="1"]').click();
  };
  const loadDetailPageData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/theaters_list_by_exhibitor.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&id=' + id)
      .then((res) => {
        setLocationData(res.data);
        setLocationDataLoaded(true);
        setFilterOption(res.data.filter_options.split(','));
        setLocationListData(res.data);
        setLocation_listPages(res.data.thealter_pagination.max_page || 1);
        setLocation_listDataLoaded(true);
        //setFilterOption(res.data.filter_options_list.split(','));
      })
      .catch((err) => console.log(err));
  };

  const load_Location_search = (search) => {    
    if (search !== '' && search !== undefined) {
      setLocation_listDataLoaded(false);
      let location_API = process.env.NEXT_PUBLIC_SD_API + '/detail_pages/theaters_list_by_exhibitor.php?id=' + id + '&page_no=' + Location_listPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;
      var searchString = search.toString();
      if (searchString !== 'All') {
        location_API += '&state=' + search.toString();
      }
      axios
        .get(location_API
        )
        .then((res) => {
          setLocationListData(res.data);
          setLocation_listDataLoaded(true);
          setLocation_listPages(res.data.thealter_pagination.max_page || 1);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <section className="exb_locationdetail dlsecspace toplinesec">
      {locationDataLoaded && (
        <div className="container">
          <div className="top_txt">
            <h2>
              Locations <i className="fal fa-angle-right"></i>
            </h2>
            <div className="statetab df fww">
              <label htmlFor="">
                <small>Select to filter by state:</small>
              </label>
              <ul className="list_azfilter df fww">
                <li className={LocationSearch.indexOf('All') > -1 && LocationSearch.length === 1 ? 'active' : ''}>
                  <span name="all" onClick={onStateClicked}>
                    All
                  </span>
                </li>
                {FilterOption.map((item, index) => {
                  return (
                    <li className="" key={index}>
                      <span name={item} onClick={onStateClicked}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="exb_infocard grid">
            {Location_listDataLoaded
              ? LocationListData.thealter_list &&
              LocationListData.thealter_list.map((item, index) => {
                return (
                  <div className="exb_infocarditem" key={index}>
                    <h4>
                      <a href={item.link} title={item.title}>
                        {item.title}
                      </a>
                    </h4>
                    <p dangerouslySetInnerHTML={{ __html: item.address }}></p>
                    <p dangerouslySetInnerHTML={{ __html: item.screen }}></p>                   
                  </div>
                );
              }) :

              <Loader/>

              /*: locationData.thealter_list.map((item, index) => {
                return (
                  <div className="exb_infocarditem" key={index}>
                    <h4>
                      <a href={item.link} title={item.title}>
                        {item.title}
                      </a>
                    </h4>
                    <p dangerouslySetInnerHTML={{ __html: item.address }}></p>
                    <p dangerouslySetInnerHTML={{ __html: item.screen }}></p>                    
                  </div>
                );
              })
            */
           }
          </div>
          {Location_listDataLoaded && LocationListData.thealter_pagination && <Pagination setCurrentPage={setCurrentPage} totalPages={Location_listPages} requestFrom="TheatreLocation" />}
        </div>
      )}
    </section>
  );
};

export default THeatreLocation;