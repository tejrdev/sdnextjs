import { useState, useEffect } from 'react';
import posterView from '@/public/images/List_table_View.svg';
import tableview from '@/public/images/icon-table.svg';
import HeadComponent from '@/components/HeadComponent';
import BoxOfficeResultTable from '@/components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeResultTable';
import BoxOfficeResultTile from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetile';
import Pagination from '@/components/Directory/ListingPages/Pagination';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';

const tableConfig = [//top movies quarterly/yearly
    { title: 'Rank', sortable: true, max_width: 'min-w-20', key: 'rankCol' },
    { title: 'Title', sortable: true, max_width: 'min-w-40', key: 'title' },
    { title: 'Distributor', sortable: true, max_width: 'min-w-30', key: 'distributor_name' },
    { title: 'Release Date', sortable: true, max_width: 'w-40', key: 'release_date' },
    { title: 'Rating', sortable: true, max_width: 'w-24', key: 'rating' },
    { title: 'Total in Quarter', sortable: true, max_width: 'w-38', key: 'total_quarter', isCurrency: true },
    { title: 'Total in Year', sortable: true, max_width: 'w-38', key: 'total_year', isCurrency: true },
    { title: 'Total To-Date', sortable: true, max_width: 'max-w-38', key: 'total_to_date', isCurrency: true },
];


const currentYear = new Date().getFullYear();
const yearsData: number[] = Array.from({ length: currentYear - 2017 + 1 }, (_, index) => currentYear - index);
const quartersData: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

interface Context {
    params: {
        year: string;
        quarter: string;
    };
}

export async function getStaticProps(context: Context) {
    const { params } = context;
    const year = params.year;
    const quarter = params.quarter;

    const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/top-movie-list.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + year + '&a_quarter=' + quarter);
    const BoxOfficeResultData = await BoxOffice.json();

    return {
        props: { BoxOfficeResultData, year, quarter },
        revalidate: 10,
    };
}

interface TopMoviesByQuarterProps {
    // Add your props here
    BoxOfficeResultData: any;
    year: string;
    quarter: string;
}

type ViewType = 'table' | 'poster';


const TopMoviesByQuarter: React.FC<TopMoviesByQuarterProps> = ({ BoxOfficeResultData, year, quarter }) => {
    const [currentView, setCurrentView] = useState<ViewType>('table');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [sortarrow, setSortarrow] = useState('');
    const [asds, setAsds] = useState('hidden');
    const [tabledata, setTabledata] = useState(BoxOfficeResultData.top_movies);
    const [selectedYear, setSelectedYear] = useState(parseInt(year));
    const [selectedQuarter, setSelectedQuarter] = useState(quarter);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [page_no, setPage_no] = useState(1);
    const [dataChaged, setDataChaged] = useState(false);
    const [totalPages, setTotalPages] = useState(BoxOfficeResultData.total_page_number);
    const meta_title = `Box Office Totals by Quarter – ${selectedQuarter} ${selectedYear} | Screendollars Box Office`;
    const meta_description = `Box Office Totals by Quarter – ${selectedQuarter} ${selectedYear} in the Domestic Box Office.`;
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/totals/' + selectedYear + '/' + selectedQuarter + '/';

    // Generate JSON-LD schema
    const generateJsonLd = () => {
        const movieData = tabledata;
        const movieList = movieData.map((item, index) => ({
            '@type': 'Movie',
            'position': index + 1,
            'name': item.title,
            'image': item.poster_url,
            'url': process.env.NEXT_PUBLIC_FRONTEND_URL + item.permalink,
        }));
        return {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': meta_title + ' ' + selectedYear + ' ' + selectedQuarter,
            'url': canonical_url,
            'description': meta_description,
            'itemListElement': {
                '@type': 'ItemList',
                'name': 'Movies',
                'itemListElement': movieList
            },
        };
    };
    const handleViewChange = (view: ViewType) => {
        setCurrentView(view);
    };

    const onYearChange = async (newYear: number) => {
        setSelectedYear(newYear);
        setDataChaged(true);
        router.push(`/box-office/totals/${newYear}/${selectedQuarter}`);
    };

    const onQuarterChange = async (newQuarter: string) => {
        setSelectedQuarter(newQuarter);
        setDataChaged(true);
        router.push(`/box-office/totals/${selectedYear}/${newQuarter}`);
    };

    const fetchData = async (newYear: number, newQuarter: string, page: number) => {
        setIsLoading(true);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/top-movie-list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&a_year=${newYear}&a_quarter=${newQuarter}&page=${page}`
        );
        const newData = await response.json();
        setTabledata(newData.top_movies || []);
        setTotalPages(newData.total_page_number);
        setIsLoading(false);
    };
    useEffect(() => {
        let sortableItems = [...tabledata];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                // Convert to numbers if the values are numeric strings or numbers
                const aNum = !isNaN(parseFloat(aValue)) ? parseFloat(String(aValue).replace(/,/g, '')) : null;
                const bNum = !isNaN(parseFloat(bValue)) ? parseFloat(String(bValue).replace(/,/g, '')) : null;

                // If both values can be converted to numbers, do numeric comparison
                if (aNum !== null && bNum !== null) {
                    return sortConfig.direction === 'ascending' ? aNum - bNum : bNum - aNum;
                }

                // Handle strings (case-insensitive)
                const aString = String(aValue).toLowerCase();
                const bString = String(bValue).toLowerCase();

                if (aString < bString) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aString > bString) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }

                return 0;
            });
            if (sortConfig.key !== null) {
                setSortarrow(sortConfig.key);
            }
        }
        setTabledata(sortableItems);
    }, [sortConfig]);

    const OnSortByChange = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
            setAsds('hidden');
        } else {
            setAsds('');
        }
        setSortConfig({ key, direction });
    };

    const onPageChange = (page: number) => {
        setPage_no(page);
        setDataChaged(true);
    };

    useEffect(() => {
        if (dataChaged) {
            fetchData(selectedYear, selectedQuarter, page_no);
            setDataChaged(false);
        }
    }, [selectedYear, selectedQuarter, page_no]);

    const renderView = () => {
        switch (currentView) {
            case 'table':
                return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} />;
            case 'poster':
                return <BoxOfficeResultTile data={tabledata} currentLayout='SQT' selectedYear={parseInt(year)} selectedQuarter={quarter} />;//All-time Top movies by Quarter  (SQT)
            default:
                return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} />;
        }
    };
    return (
        <>
            <HeadComponent jsonSchema={generateJsonLd()} meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
            <div className='box_title pt-4 md:pt-5'>
                <div className='container'>
                    <div className='text-center'>
                        <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>Box Office Totals for {selectedYear} {selectedQuarter}</h1>
                        <p>Totals by Quarter for {selectedYear} {selectedQuarter} in the Domestic Box Office
                        </p>
                    </div>
                </div>
            </div>
            <div className='boxresulinfo'>
                <div className='container'>
                    <div className='boxresultable'>
                        <div className='boxtableswich my-3 text-left xsm:text-right flex flex-wrap xsm:justify-between justify-center sticky top-0 z-20 bg-white pt-3'>
                            <div className="selectopts flex gap-4 items-center w-full xsm:w-auto mb-4 xsm:mb-0 justify-center xsm:justify-start">
                                <select
                                    name='YearSelect'
                                    className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                                    value={selectedYear}
                                    onChange={(e) => {
                                        onYearChange(parseInt(e.target.value));
                                    }}>
                                    {yearsData.map((item, i) => (
                                        <option value={item} key={i}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name='QuarterSelect'
                                    className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                                    value={selectedQuarter}
                                    onChange={(e) => {
                                        onQuarterChange(e.target.value);
                                    }}>
                                    {quartersData.map((item, i) => (
                                        <option value={item} key={i}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <ul className={'viewsbox ttab flex xsm:inline-flex flex-wrap list-none mb-1 ml-0 xsm:ml-4 justify-center ' + (currentView === 'poster' ? 'off' : '')}>
                                <li
                                    className={`tab_items ${currentView === 'table' ? 'bg-gold' : ''}`}
                                    onClick={() => handleViewChange('table')}
                                >
                                    <img src={tableview.src} alt='' title='Table View' />
                                </li>
                                <li
                                    className={`tab_items ${currentView === 'poster' ? 'bg-gold' : ''}`}
                                    onClick={() => handleViewChange('poster')}
                                >
                                    <img src={posterView.src} alt='' title='Poster View' />
                                </li>
                            </ul>
                        </div>
                        {isLoading ? (
                            <div className='pvr container' style={{ marginBottom: 40 }}>
                                <div className='lodarhight'>
                                    <Loader />
                                </div>
                            </div>
                        ) : (
                            <>
                                {renderView()}
                                <Pagination currentPage={page_no} totalPages={parseInt(totalPages)} setCurrentPage={onPageChange} requestFrom='box-office-results' />
                            </>
                        )}

                    </div>
                </div>
            </div>


        </>
    );
};

export default TopMoviesByQuarter;
