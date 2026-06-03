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
import HeadComponent from '@/components/HeadComponent';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory/film-festivals');
  const SEOdata = await res.json();

  // filmfestival page static data
  let filmfestivalsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory_film_festivals/new_film_festival_listing.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  filmfestivalsData = await filmfestivalsData.json();

  return {
    props: { SEOdata, filmfestivalsData },
    revalidate: 10, // In seconds
  };
}

interface Props {
  SEOdata: {
    children?: any[] | undefined;
  };
  filmfestivalsData: filmfestival_data;
}
type filmfestival_data = {
  film_fastival_list: any[];
  total_page_number: number;
  parent_link: string;
  parent_title: string;
  page_link: string;
  page_title: string;
  filter_options: string;
};
const FilmFestival = (props: Props) => {
  const { SEOdata, filmfestivalsData } = props;
  const [filmfestivalListData, setFilmFestivalListData] = useState<any[]>(filmfestivalsData.film_fastival_list);
  const [filmfestivalPages, setFilmFestivalPages] = useState<number>(filmfestivalsData.total_page_number);
  const [filmfestivalTypes, setFilmFestivalTypes] = useState<string>('');
  const [filmfestivalPage, setFilmFestivalPage] = useState<number>(1);
  const [HideLoader, setHideLoader] = useState<boolean>(true);
  const [FilterChanged, setFilterChanged] = useState<boolean>(false);
  const [DirectorySearch, setDirectorySearch] = useState<string>('');
  const defaultSortBy = 'name';
  const [DirectorySortBy, setDirectorySortBy] = useState<string>(defaultSortBy);
  const [NoResult, setNoResult] = useState<boolean>(false);
  const [SearchClicked, setSearchClicked] = useState<boolean>(false);

  const setCurrentPage = (currentPage: number) => {
    setFilmFestivalPage(currentPage);
    setFilterChanged(true);
  };

  const setFilmFestivalFilter = (filmfestivalType: string) => {
    setFilmFestivalTypes(filmfestivalType);
    setFilmFestivalPage(1);
    setFilterChanged(true);
  };
  const OnSearchChange = (search: string) => {
    setDirectorySearch(search);
  };
  const onSearchClick = () => {
    setFilmFestivalPage(1);
    setFilterChanged(true);
    setSearchClicked(true);
  };
  const onSortByChange = (sortby: string) => {
    setDirectorySortBy(sortby);
    setFilmFestivalPage(1);
    setFilterChanged(true);
  };
  const onClearAllClick = () => {
    setDirectorySearch('');
    setDirectorySortBy(defaultSortBy);
    setFilmFestivalPage(1);
    setFilterChanged(true);
    setSearchClicked(true);
    document.querySelector<HTMLInputElement>('.dirshort select')!.value = defaultSortBy;
  };
  useEffect(() => {
    if (!FilterChanged) return;
    loadFilmFestivalsData();
  }, [filmfestivalTypes, filmfestivalPage, SearchClicked, DirectorySortBy]);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let category = params.get('category');
    if (category !== '' && category !== null) {
      setFilmFestivalTypes(category);
      setFilterChanged(true);
    }
    const pageno = params.get('pageno');
    const sortby = params.get('sortby');
    if (pageno !== '' && pageno !== null) {
      setFilmFestivalPage(parseInt(pageno));
      setFilterChanged(true);
    }
    if (sortby !== '' && sortby !== null) {
      setDirectorySortBy(sortby);
      setFilterChanged(true);
    }
  }, []);
  const loadFilmFestivalsData = () => {
    setHideLoader(false);
    setNoResult(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + '/directory_film_festivals/new_film_festival_listing.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;
    if (filmfestivalTypes !== '') {
      directory_API += '&cat=' + filmfestivalTypes;
    }
    directory_API += '&search=' + DirectorySearch;
    directory_API += '&sortby=' + DirectorySortBy;
    directory_API += '&page_no=' + filmfestivalPage;

    axios
      .get(directory_API)
      .then((res) => {
        setFilmFestivalListData(res.data.film_fastival_list);
        setFilmFestivalPages(res.data.total_page_number);
        setHideLoader(true);
        setFilterChanged(false);
        setSearchClicked(false);
        if (res.data.total_page_number === 0) setNoResult(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <HeadComponent data={SEOdata} />
      <div className='distlisting'>
        <div className='container'>
          <div className='distlist_box'>
            <div className='distsponsor_box df fww'>
              <Breadcrumb parentLink={filmfestivalsData.parent_link} parentTitle={filmfestivalsData.parent_title} pageLink={filmfestivalsData.page_link} pageTitle={filmfestivalsData.page_title} />
              <Filters setListingFilter={setFilmFestivalFilter} data={filmfestivalsData.filter_options} tag='filmfestival' onClearAllClick={onClearAllClick} />
              <div className='dist_listdetails'>
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <SearchComponent tag='film-festival' onSearchClick={onSearchClick} searchText={DirectorySearch} setSearchText={OnSearchChange} />
                    <SortBy tag='film-festival' onSortByChange={onSortByChange} currentSortBy={DirectorySortBy} />
                  </div>
                  {HideLoader ? (
                    <>
                      {NoResult ? (
                        <h4>No Listing found.</h4>
                      ) : (
                        <>
                          <DistributorList data={filmfestivalListData} tag='filmfestival' />
                          <Pagination totalPages={filmfestivalPages} setCurrentPage={setCurrentPage} currentPage={filmfestivalPage} />
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

export default FilmFestival;
