import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

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
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'directory/exhibitors');
    const SEOdata = await res.json();

    // Exibitor page static data
    let exhibitorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/directory_exhibitors/new_exhibitor_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&sortby=screen&state=' + filterState);
    exhibitorsData = await exhibitorsData.json();

    return {
        props: { SEOdata, exhibitorsData, propState },
        revalidate: 10, // In seconds
    };
}

interface Props {
    SEOdata: {
        children?: any[] | undefined;
    };
    exhibitorsData: exhibitors_data;
    propState: string;
}
type exhibitors_data = {
    exhibitor_list: any[];
    total_page_number: number;
    parent_link: string;
    parent_title: string;
    page_link: string;
    page_title: string;
    filter_options: string;
};

const Exhibitors = (props: Props) => {
    const { SEOdata, exhibitorsData, propState } = props;
    const [exhibitorListData, setExhibitorListData] = useState<any[]>(exhibitorsData.exhibitor_list);
    const [exhibitorPages, setExhibitorPages] = useState<number>(exhibitorsData.total_page_number);
    const [Location, setLocation] = useState<string>(propState);
    const [exhibitorPage, setExhibitorPage] = useState<number>(1);
    const [HideLoader, setHideLoader] = useState<boolean>(true);
    const [FilterChanged, setFilterChanged] = useState<boolean>(false);
    const [DirectorySearch, setDirectorySearch] = useState<string>('');
    const defaultSortBy = 'screen';
    const [DirectorySortBy, setDirectorySortBy] = useState<string>(defaultSortBy);
    const [NoResult, setNoResult] = useState<boolean>(false);
    const [SearchClicked, setSearchClicked] = useState<boolean>(false);

    const setCurrentPage = (currentPage: number) => {
        setExhibitorPage(currentPage);
        setFilterChanged(true);
    };

    const setExhibitorFilter = (location: string) => {
        setLocation(location);
        setExhibitorPage(1);
        setFilterChanged(true);
    };
    const OnSearchChange = (search: string) => {
        setDirectorySearch(search);
    };
    const onSearchClick = () => {
        setExhibitorPage(1);
        setFilterChanged(true);
        setSearchClicked(true);
    };
    const onSortByChange = (sortby: string) => {
        setDirectorySortBy(sortby);
        setExhibitorPage(1);
        setFilterChanged(true);
    };
    const onClearAllClick = () => {
        setDirectorySearch('');
        setDirectorySortBy(defaultSortBy);
        setExhibitorPage(1);
        setFilterChanged(true);
        setSearchClicked(true);
        document.querySelector<HTMLInputElement>('.dirshort select')!.value = defaultSortBy;
    };
    useEffect(() => {
        if (!FilterChanged) return;
        loadExhibitorsData();
    }, [Location, exhibitorPage, SearchClicked, DirectorySortBy]);

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let state = params.get('state');
        const pageno = params.get('pageno');
        const sortby = params.get('sortby');
        // if (state !== '' && state !== null) {
        //   state = state === 'USA' ? USStates.toString() : state === 'CAN' ? CANStates.toString() : state;
        //   setLocation(state);
        //   setFilterChanged(true);
        // }
        if (pageno !== '' && pageno !== null) {
            setExhibitorPage(parseInt(pageno));
            setFilterChanged(true);
        }
        if (sortby !== '' && sortby !== null) {
            setDirectorySortBy(sortby);
            setFilterChanged(true);
        }
    }, []);
    const loadExhibitorsData = () => {
        setHideLoader(false);
        setNoResult(false);
        let directory_API = process.env.NEXT_PUBLIC_SD_API + '/directory_exhibitors/new_exhibitor_list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN;
        if (Location !== '') {
            directory_API += '&state=' + Location;
        }
        directory_API += '&search=' + DirectorySearch;
        directory_API += '&sortby=' + DirectorySortBy;
        directory_API += '&page_no=' + exhibitorPage;

        axios
            .get(directory_API)
            .then((res) => {
                setExhibitorListData(res.data.exhibitor_list);
                setExhibitorPages(res.data.total_page_number);
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
                            <Breadcrumb parentLink={exhibitorsData.parent_link} parentTitle={exhibitorsData.parent_title} pageLink={exhibitorsData.page_link} pageTitle={exhibitorsData.page_title} />
                            <Filters setListingFilter={setExhibitorFilter} data={exhibitorsData.filter_options.split(',')} tag='exhibitor' stateValue={Location} onClearAllClick={onClearAllClick} />
                            <div className='dist_listdetails'>
                                <section className='alldist_list'>
                                    <div className='top_txt df fww'>
                                        <SearchComponent tag='exhibitor' onSearchClick={onSearchClick} searchText={DirectorySearch} setSearchText={OnSearchChange} />
                                        <SortBy tag='exhibitor' onSortByChange={onSortByChange} currentSortBy={DirectorySortBy} />
                                    </div>
                                    {HideLoader ? (
                                        <>
                                            {NoResult ? (
                                                <h4>No Listing found.</h4>
                                            ) : (
                                                <>
                                                    <DistributorList data={exhibitorListData} tag='exhibitor' />
                                                    <Pagination totalPages={exhibitorPages} setCurrentPage={setCurrentPage} currentPage={exhibitorPage} />
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

export default Exhibitors;
