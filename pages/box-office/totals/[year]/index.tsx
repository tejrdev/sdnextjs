import { useState, useEffect } from 'react';
import posterView from '@/public/images/List_table_View.svg';
import tableview from '@/public/images/icon-table.svg';
import HeadComponent from '@/components/HeadComponent';
import BoxOfficeResultTable from '@/components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeResultTable';
import BoxOfficeResultTile from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetile';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';


const currentYear = new Date().getFullYear();
const yearsData: number[] = Array.from({ length: currentYear - 2017 + 1 }, (_, index) => currentYear - index);

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

interface Context {
    params: {
        year: string;
    };
}

export async function getStaticProps(context: Context) {
    const { params } = context;
    const year = params.year;

    const BoxOffice = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-boxoffice/box_office_select_year.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&a_year=' + year);
    const BoxOfficeResultData = await BoxOffice.json();

    return {
        props: { BoxOfficeResultData, year },
        revalidate: 10,
    };
}

interface MoviesByYearProps {
    // Add your props here
    BoxOfficeResultData: any;
    year: string;
}

type ViewType = 'table' | 'poster';


const MoviesByYear: React.FC<MoviesByYearProps> = ({ BoxOfficeResultData, year }) => {
    const meta_title = `Box Office Totals for ${year} | Screendollars Box Office`;
    const meta_description = `Box Office Totals for ${year} in the Domestic Box Office.`;
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/totals/' + year + '/';
    const [currentView, setCurrentView] = useState<ViewType>('table');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [sortarrow, setSortarrow] = useState('');
    const [asds, setAsds] = useState('hidden');
    const [tabledata, setTabledata] = useState(BoxOfficeResultData.movies_list);
    const [selectedYear, setSelectedYear] = useState(parseInt(year));
    const [isLoading, setIsLoading] = useState(false);
    const [toggleon, setToggleon] = useState(false);
    const router = useRouter();
    const togglehandle = (e) => setToggleon(!toggleon);


    const tableConfig = [
        { title: 'dates', sortable: false, max_width: 'min-w-40', key: toggleon ? 'dates' : 'dates_weekend' },
        { title: 'Film Week', sortable: true, max_width: 'min-w-30', key: 'film_week' },
        { title: toggleon ? 'Total Weekly' : 'Total Weekend', sortable: true, max_width: 'w-26', key: toggleon ? 'weekly_gross' : 'weekend_gross', isCurrency: true },
        { title: '+-LW', sortable: false, max_width: 'max-w-14', key: toggleon ? 'LW_weekly' : 'LW_weekend', pctField: true },
        { title: '+-LY', sortable: false, max_width: 'max-w-14', key: toggleon ? 'LY_weekly' : 'LY_weekend', pctField: true },
        { title: 'Top Movies', sortable: false, max_width: 'max-w-64', key: toggleon ? 'top_movies' : 'top_movies_weekend' },
    ];

    const handleViewChange = (view: ViewType) => {
        setCurrentView(view);
    };

    const onYearChange = async (newYear: number) => {
        setSelectedYear(newYear);
        setIsLoading(true);

        try {
            // Fetch new data for the selected year
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/box_office_select_year.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&a_year=${newYear}`
            );

            if (response.ok) {
                const newData = await response.json();
                setTabledata(newData.movies_list || []);
            } else {
                console.error('Failed to fetch data for year:', newYear);
            }
        } catch (error) {
            console.error('Error fetching year data:', error);
        } finally {
            setIsLoading(false);
        }

        router.push(`/box-office/totals/${newYear}`);
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

    const renderView = () => {
        switch (currentView) {
            case 'table':
                return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} toggleon={toggleon} selectedYear={selectedYear} />;
            case 'poster':
                return <BoxOfficeResultTile data={tabledata} currentLayout='SY' selectedYear={selectedYear} toggleon={toggleon} />;//Movies by Year  (SY)
            default:
                return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} toggleon={toggleon} />;
        }
    };
    return (
        <>
            <HeadComponent meta_title={meta_title} meta_description={meta_description} canonical_url={canonical_url} />
            <div className='box_title pt-4 md:pt-5'>
                <div className='container'>
                    <div className='text-center'>
                        <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>Box Office Totals for {selectedYear}</h1>
                        <p> Totals for {selectedYear} in the Domestic Box Office </p>
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
                            </div>
                            <div>
                                <ul className={'ttab flex xsm:inline-flex flex-wrap mb-2 ml-0 list-none justify-center ' + (toggleon ? 'off' : '')}>
                                    <li className={'tab_items min-w-28 ' + (toggleon ? '' : 'bg-gold')} data-title='Weekend' id='weekend_colection_data' onClick={togglehandle}>
                                        Weekend
                                    </li>
                                    <li className={'tab_items min-w-28 ' + (toggleon ? 'bg-gold' : '')} data-title='Weekly' id='weekely_colection_data' onClick={togglehandle}>
                                        Weekly
                                    </li>
                                </ul>
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
                        </div>
                        {isLoading ? (
                            <div className='pvr container' style={{ marginBottom: 40 }}>
                                <div className='lodarhight'>
                                    <Loader />
                                </div>
                            </div>
                        ) : (
                            renderView()
                        )}

                    </div>
                </div>
            </div>


        </>
    );
};

export default MoviesByYear;
