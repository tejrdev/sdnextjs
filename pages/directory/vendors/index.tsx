import axios from 'axios';
import { useState, useEffect } from 'react';

//cpmponents
import DistributorList from '../../../components/Directory/ListingPages/DistributorList';
import Filters from '../../../components/Directory/ListingPages/Filters';
import Pagination from '../../../components/Directory/ListingPages/Pagination';
import OtherSponsors from '../../../components/Directory/ListingPages/OtherSponsors';
import Loader from '../../../components/Loader';
import MenuNavigation from '../../../components/Directory/ListingPages/MenuNavigation';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import Breadcrumb from '@/components/Directory/ListingPages/Breadcrumb';
import SearchComponent from '@/components/Directory/ListingPages/SearchComponent';
import SortBy from '@/components/Directory/ListingPages/SortBy';
import HeadComponent from '@/components/HeadComponent';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory/vendors');
  const SEOdata = await res.json();

  // vandor page static data
  let vendorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory_vendors/new_vendor_listing.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  vendorsData = await vendorsData.json();

  return {
    props: { SEOdata, vendorsData },
    revalidate: 10, // In seconds
  };
}
interface Props {
  SEOdata: {
    children?: any[] | undefined;
  };
  vendorsData: vendors_data;
}
type vendors_data = {
  vendor_list: any[];
  total_page_number: number;
  parent_link: string;
  parent_title: string;
  page_link: string;
  page_title: string;
  filter_options: string;
};
const Vendors = (props: Props) => {
  const { SEOdata, vendorsData } = props;
  const [vendorListData, setVendorListData] = useState<any[]>(vendorsData.vendor_list);
  const [vendorPages, setVendorPages] = useState<number>(vendorsData.total_page_number);
  const [vendorTypes, setVendorTypes] = useState<string>('');
  const [vendorPage, setVendorPage] = useState<number>(1);
  const [HideLoader, setHideLoader] = useState<boolean>(true);
  const [FilterChanged, setFilterChanged] = useState<boolean>(false);
  const [DirectorySearch, setDirectorySearch] = useState<string>('');
  const defaultSortBy = 'name';
  const [DirectorySortBy, setDirectorySortBy] = useState<string>(defaultSortBy);
  const [NoResult, setNoResult] = useState<boolean>(false);
  const [SearchClicked, setSearchClicked] = useState<boolean>(false);

  const setCurrentPage = (currentPage: number) => {
    setVendorPage(currentPage);
    setFilterChanged(true);
  };

  const setDistributerFilter = (vendorType: string) => {
    setVendorTypes(vendorType);
    setVendorPage(1);
    setFilterChanged(true);
  };
  const OnSearchChange = (search: string) => {
    setDirectorySearch(search);
  };
  const onSearchClick = () => {
    setVendorPage(1);
    setFilterChanged(true);
    setSearchClicked(true);
  };
  // const onSortByChange = (sortby: string) => {
  //   setDirectorySortBy(sortby);
  //   setVendorPage(1);
  //   setFilterChanged(true);
  // };
  const onClearAllClick = () => {
    setDirectorySearch('');
    setDirectorySortBy(defaultSortBy);
    setVendorPage(1);
    setFilterChanged(true);
    setSearchClicked(true);
    // document.querySelector('.dirshort select').value = defaultSortBy;
  };
  useEffect(() => {
    if (!FilterChanged) return;
    loadVendorsData();
  }, [vendorTypes, vendorPage, SearchClicked, DirectorySortBy]);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const pageno = params.get('pageno');
    if (pageno !== '' && pageno !== null) {
      setVendorPage(parseInt(pageno));
      setFilterChanged(true);
    }
  }, []);

  const loadVendorsData = () => {
    setHideLoader(false);
    setNoResult(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + '/directory_vendors/new_vendor_listing.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;
    if (vendorTypes !== '') {
      directory_API += '&category=' + vendorTypes;
    }
    directory_API += '&search=' + DirectorySearch;
    directory_API += '&sortby=' + DirectorySortBy;
    directory_API += '&page_no=' + vendorPage;

    axios
      .get(directory_API)
      .then((res) => {
        setVendorListData(res.data.vendor_list);
        setVendorPages(res.data.total_page_number);
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
      <MenuNavigation />
      <div className='distlisting'>
        <div className='container'>
          <div className='distlist_box'>
            <div className='distsponsor_box df fww'>
              <Breadcrumb parentLink={vendorsData.parent_link} parentTitle={vendorsData.parent_title} pageLink={vendorsData.page_link} pageTitle={vendorsData.page_title} />
              <Filters setListingFilter={setDistributerFilter} data={vendorsData.filter_options} tag='vendor' onClearAllClick={onClearAllClick} />
              <div className='dist_listdetails'>
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <SearchComponent tag='vendor' onSearchClick={onSearchClick} searchText={DirectorySearch} setSearchText={OnSearchChange} />
                    {/* <SortBy tag='vendor' onSortByChange={onSortByChange} /> */}
                  </div>
                  {HideLoader ? (
                    <>
                      {NoResult ? (
                        <h4>No Listing found.</h4>
                      ) : (
                        <>
                          <DistributorList data={vendorListData} tag='vendor' />
                          <Pagination totalPages={vendorPages} setCurrentPage={setCurrentPage} currentPage={vendorPage} />
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

export default Vendors;
