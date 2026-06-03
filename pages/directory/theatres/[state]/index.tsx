import axios from 'axios';
import { useState, useEffect } from 'react';

//cpmponents
import DistributorList from '@/components/Directory/ListingPages/DistributorList';
import Filters from '@/components/Directory/ListingPages/Filters';
import Pagination from '@/components/Directory/ListingPages/Pagination';
import OtherSponsors from '@/components/Directory/ListingPages/OtherSponsors';
import Loader from '@/components/Loader';
import HomePageAds from '@/components/Homepage/HomePageAds';
import Breadcrumb from '@/components/Directory/ListingPages/Breadcrumb';
import SearchComponent from '@/components/Directory/ListingPages/SearchComponent';
import SortBy from '@/components/Directory/ListingPages/SortBy';
import { JSONData } from '@/components/shared/JSONData';
import HeadComponent from '@/components/HeadComponent';
import { GetStaticPaths, GetStaticPropsContext } from 'next';

const { USStates, CANStates, FilterStates } = JSONData;


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const state = params?.state as string;
  const filterState = state === 'USA' ? USStates.toString() : state === 'CAN' ? CANStates.toString() : FilterStates.find((item) => item.value === state)?.key;
  const propState = state === 'USA' ? 'USA' : state === 'CAN' ? 'CAN' : filterState || '';

  if (propState === '') {
    return { notFound: true };
  }

  // Theater page static data
  let theatresData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory_theatres/new_theatres.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&state=' + filterState);
  theatresData = await theatresData.json();

  return {
    props: { theatresData, propState, state },
    revalidate: 10, // In seconds
  };
}

interface Props {
  theatresData: theatres_data;
  propState: string;
  state: string;
}
type theatres_data = {
  theator_list: any[];
  total_page_number: number;
  parent_link: string;
  parent_title: string;
  page_link: string;
  page_title: string;
  filter_options: string;
  associated_list: any;
  amenities_list: any;
};

const Theatres = (props: Props) => {
  const { theatresData, propState, state } = props;
  const [theatreListData, setTheatreListData] = useState<any[]>(theatresData.theator_list);
  const [theatrePages, setTheatrePages] = useState<number>(theatresData.total_page_number);
  const [Location, setLocation] = useState<string>(propState);
  const [theatrePage, setTheatrePage] = useState<number>(1);
  const [HideLoader, setHideLoader] = useState<boolean>(true);
  const [FilterChanged, setFilterChanged] = useState<boolean>(false);
  const [Amenities, setAmenities] = useState<string>('');
  const [Associations, setAssociations] = useState<string>('');
  const [DirectorySearch, setDirectorySearch] = useState<string>('');
  const defaultSortBy = 'name';
  const [DirectorySortBy, setDirectorySortBy] = useState<string>(defaultSortBy);
  const [NoResult, setNoResult] = useState<boolean>(false);
  const [SearchClicked, setSearchClicked] = useState<boolean>(false);

  const metaTitle = FilterStates.find((item) => item.key === Location)?.metaTitle;
  const metaDescription = FilterStates.find((item) => item.key === Location)?.metaDescription;
  const canonicalUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/directory/theatres/' + state;

  const setCurrentPage = (currentPage: number) => {
    setTheatrePage(currentPage);
    setFilterChanged(true);
  };

  const setLocationFilter = (state: string) => {
    setLocation(state);
    setTheatrePage(1);
    setFilterChanged(true);
  };

  const setAmenitiesFilter = (amenity: string) => {
    setAmenities(amenity);
    setTheatrePage(1);
    setFilterChanged(true);
  };

  const setAssociationsFilter = (association: string) => {
    setAssociations(association);
    setTheatrePage(1);
    setFilterChanged(true);
  };
  const OnSearchChange = (search: string) => {
    setDirectorySearch(search);
  };
  const onSearchClick = () => {
    setTheatrePage(1);
    setFilterChanged(true);
    setSearchClicked(true);
  };
  const onSortByChange = (sortby: string) => {
    setDirectorySortBy(sortby);
    setTheatrePage(1);
    setFilterChanged(true);
  };
  const onClearAllClick = () => {
    setDirectorySearch('');
    setDirectorySortBy(defaultSortBy);
    setTheatrePage(1);
    setFilterChanged(true);
    setSearchClicked(true);
    document.querySelector<HTMLInputElement>('.dirshort select')!.value = defaultSortBy;
  };
  useEffect(() => {
    if (!FilterChanged) return;
    loadTheatresData();
  }, [Location, theatrePage, Amenities, Associations, SearchClicked, DirectorySortBy]);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    // let state = params.get('state');
    const pageno = params.get('pageno');
    const sortby = params.get('sortby');
    // if (state !== '' && state !== null) {
    //   state = state === 'USA' ? USStates.toString() : state === 'CAN' ? CANStates.toString() : state;
    //   setLocation(state);
    //   setFilterChanged(true);
    // }
    if (pageno !== '' && pageno !== null) {
      setTheatrePage(parseInt(pageno));
      setFilterChanged(true);
    }
    if (sortby !== '' && sortby !== null) {
      setDirectorySortBy(sortby);
      setFilterChanged(true);
    }
  }, []);
  const loadTheatresData = () => {
    setHideLoader(false);
    setNoResult(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + '/directory_theatres/new_theatres.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;
    if (Location !== '') {
      directory_API += '&state=' + Location;
    }
    if (Amenities !== '') {
      directory_API += '&amenities=' + Amenities;
    }
    if (Associations !== '') {
      directory_API += '&associated=' + Associations;
    }
    directory_API += '&search=' + DirectorySearch;
    directory_API += '&sortby=' + DirectorySortBy;
    directory_API += '&page_no=' + theatrePage;

    axios
      .get(directory_API)
      .then((res) => {
        setTheatreListData(res.data.theator_list);
        setTheatrePages(res.data.total_page_number);
        setHideLoader(true);
        setFilterChanged(false);
        setSearchClicked(false);
        if (res.data.total_page_number === 0) setNoResult(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <HeadComponent meta_title={metaTitle} meta_description={metaDescription} canonical_url={canonicalUrl} />
      <div className='distlisting'>
        <div className='container'>
          <div className='distlist_box'>
            <div className='distsponsor_box df fww'>
              <Breadcrumb parentLink={theatresData.parent_link} parentTitle={theatresData.parent_title} pageLink={theatresData.page_link} pageTitle={theatresData.page_title} />
              <Filters setListingFilter={setLocationFilter} data={theatresData.filter_options.split(',')} tag='theatre' associated={theatresData.associated_list} amenities={theatresData.amenities_list} stateValue={Location} onAmenitiesChange={setAmenitiesFilter} onAssociationsChange={setAssociationsFilter} onClearAllClick={onClearAllClick} />
              <div className='dist_listdetails'>
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <SearchComponent tag='theatre' onSearchClick={onSearchClick} searchText={DirectorySearch} setSearchText={OnSearchChange} />
                    <SortBy tag='theatre' onSortByChange={onSortByChange} currentSortBy={DirectorySortBy} />
                  </div>
                  {HideLoader ? (
                    <>
                      {NoResult ? (
                        <h4>No Listing found.</h4>
                      ) : (
                        <>
                          <DistributorList data={theatreListData} tag='theatre' />
                          <Pagination totalPages={theatrePages} setCurrentPage={setCurrentPage} currentPage={theatrePage} />
                        </>
                      )}
                    </>
                  ) : (
                    <div className='pvr' style={{ minHeight: 200 }}>
                      <Loader />
                    </div>
                  )}
                </section>
                <OtherSponsors />
                <HomePageAds cls='adds_728' format='horizontal' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Theatres;
