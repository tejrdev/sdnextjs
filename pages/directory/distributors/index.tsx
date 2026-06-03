import axios from 'axios';
import { useState, useEffect } from 'react';

//cpmponents
import DistributorList from '../../../components/Directory/ListingPages/DistributorList';
import Filters from '@/components/Directory/ListingPages/Filters';
import Pagination from '@/components/Directory/ListingPages/Pagination';
import OtherSponsors from '@/components/Directory/ListingPages/OtherSponsors';
import Loader from '@/components/Loader';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import Breadcrumb from '@/components/Directory/ListingPages/Breadcrumb';
import SearchComponent from '@/components/Directory/ListingPages/SearchComponent';
// import SortBy from '@/components/Directory/ListingPages/SortBy';
import HeadComponent from '@/components/HeadComponent';
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory/distributors');
  const SEOdata = await res.json();

  // distributor page static data
  let distributorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory_distributors/new_distributor_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  distributorsData = await distributorsData.json();

  return {
    props: { SEOdata, distributorsData },
    revalidate: 10, // In seconds
  };
}

interface Props {
  SEOdata: {
    children?: any[] | undefined;
  };
  distributorsData: distributors_data;
}
type distributors_data = {
  distributors_list: any[];
  distributors_list_total_page_number: number;
  parent_link: string;
  parent_title: string;
  page_link: string;
  page_title: string;
  filter_options: string;
};
const Distributors = (props: Props) => {
  const { SEOdata, distributorsData } = props;
  const [distributorListData, setDistributorListData] = useState<any[]>(distributorsData.distributors_list);
  const [distributorPages, setDistributorPages] = useState<number>(distributorsData.distributors_list_total_page_number);
  const [distributorTypes, setDistributorTypes] = useState<string>('');
  const [distributorPage, setDistributorPage] = useState<number>(1);
  const [HideLoader, setHideLoader] = useState<boolean>(true);
  const [FilterChanged, setFilterChanged] = useState<boolean>(false);
  const [DirectorySearch, setDirectorySearch] = useState<string>('');
  const defaultSortBy = 'name';
  const [DirectorySortBy, setDirectorySortBy] = useState<string>(defaultSortBy);
  const [NoResult, setNoResult] = useState<boolean>(false);
  const [SearchClicked, setSearchClicked] = useState<boolean>(false);

  const setCurrentPage = (currentPage: number) => {
    setDistributorPage(currentPage);
    setFilterChanged(true);
  };

  const setDistributerFilter = (distributorType: string) => {
    setDistributorTypes(distributorType);
    setDistributorPage(1);
    setFilterChanged(true);
  };
  const OnSearchChange = (search: string) => {
    setDirectorySearch(search);
  };
  const onSearchClick = () => {
    setDistributorPage(1);
    setFilterChanged(true);
    setSearchClicked(true);
  };
  // const onSortByChange = (sortby: string) => {
  //   setDirectorySortBy(sortby);
  //   setDistributorPage(1);
  //   setFilterChanged(true);
  // };
  const onClearAllClick = () => {
    setDirectorySearch('');
    setDirectorySortBy(defaultSortBy);
    setDistributorPage(1);
    setFilterChanged(true);
    setSearchClicked(true);
    // document.querySelector('.dirshort select').value = defaultSortBy;
  };
  useEffect(() => {
    if (!FilterChanged) return;
    loadDistributorsData();
  }, [distributorTypes, distributorPage, SearchClicked, DirectorySortBy]);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let category = params.get('category');
    if (category !== '' && category !== null) {
      setDistributorTypes(category);
      setFilterChanged(true);
    }
    const pageno = params.get('pageno');
    if (pageno !== '' && pageno !== null) {
      setDistributorPage(parseInt(pageno));
      setFilterChanged(true);
    }
  }, []);
  const loadDistributorsData = () => {
    setHideLoader(false);
    setNoResult(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + '/directory_distributors/new_distributor_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;
    if (distributorTypes !== '') {
      directory_API += '&distribution_type=' + distributorTypes;
    }
    directory_API += '&search=' + DirectorySearch;
    directory_API += '&sortby=' + DirectorySortBy;
    directory_API += '&page_no=' + distributorPage;

    axios
      .get(directory_API)
      .then((res) => {
        setDistributorListData(res.data.distributors_list);
        setDistributorPages(res.data.distributors_list_total_page_number);
        setHideLoader(true);
        setFilterChanged(false);
        setSearchClicked(false);
        if (res.data.distributors_list_total_page_number === 0) setNoResult(true);
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
              <Breadcrumb parentLink={distributorsData.parent_link} parentTitle={distributorsData.parent_title} pageLink={distributorsData.page_link} pageTitle={distributorsData.page_title} />
              <Filters setListingFilter={setDistributerFilter} data={distributorsData.filter_options} tag='distributor' onClearAllClick={onClearAllClick} />
              <div className='dist_listdetails'>
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <SearchComponent tag='distributor' onSearchClick={onSearchClick} searchText={DirectorySearch} setSearchText={OnSearchChange} />
                    {/* <SortBy tag='distributor' onSortByChange={onSortByChange} /> */}
                  </div>
                  {HideLoader ? (
                    <>
                      {NoResult ? (
                        <h4>No Listing found.</h4>
                      ) : (
                        <>
                          <DistributorList data={distributorListData} tag='distributor' />
                          <Pagination totalPages={distributorPages} setCurrentPage={setCurrentPage} currentPage={distributorPage} />
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

export default Distributors;
