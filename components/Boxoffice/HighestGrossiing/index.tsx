import { useState, useEffect } from 'react';
import posterView from '@/public/images/List_table_View.svg';
import tableview from '@/public/images/icon-table.svg';
import HeadComponent from '@/components/HeadComponent';
import BoxOfficeResultTable from '@/components/FilmData/DetailPages/BoxOfficeResults/BoxOfficeResultTable';
import BoxOfficeResultTile from '@/components/FilmData/DetailPages/BoxOfficeResults/Boxofficetile';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import Pagination from '@/components/Directory/ListingPages/Pagination';

const tableConfig = [//top movies quarterly/yearly
    { title: 'Rank', sortable: true, max_width: 'min-w-20', key: 'rankCol' },
    { title: 'Title', sortable: true, max_width: 'min-w-32', key: 'title' },
    { title: 'Distributor', sortable: true, max_width: 'min-w-30', key: 'distributor_name' },
    { title: 'Release Date', sortable: true, max_width: 'w-40', key: 'release_date' },
    { title: 'Year', sortable: true, max_width: 'w-24', key: 'release_year' },
    { title: 'Rating', sortable: true, max_width: 'w-24', key: 'rating' },
    { title: 'Genre', sortable: true, max_width: 'w-40', key: 'genre' },
    { title: 'Total To-Date', sortable: true, max_width: 'w-36', key: 'total_to_date', isCurrency: true },
    { title: 'Total In Year', sortable: true, max_width: 'w-36', key: 'total_year', isCurrency: true },
];

const currentYear = new Date().getFullYear();
let yearsData: { label: string, value: string }[] = [{ label: 'All Years', value: 'all-years' }];
yearsData = yearsData.concat(Array.from({ length: currentYear - 2017 + 1 }, (_, index) => currentYear - index).map(year => ({ label: year.toString(), value: year.toString() })));
const ratingsData = [{ label: 'All Ratings', value: 'all-ratings' }, { label: 'G', value: 'g' }, { label: 'PG', value: 'pg' }, { label: 'PG-13', value: 'pg-13' }, { label: 'R', value: 'r' }];

// Genres sorted alphabetically with "All Genres" as first option
const genresData = [
    { label: 'All Genres', value: 'all-genres' },
    { label: 'Action', value: 'action' },
    { label: 'Adult', value: 'adult' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Animation', value: 'animation' },
    { label: 'Biography', value: 'biography' },
    { label: 'Crime', value: 'crime' },
    { label: 'Documentary', value: 'documentary' },
    { label: 'Drama', value: 'drama' },
    { label: 'Family', value: 'family' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Film-Noir', value: 'film-noir' },
    { label: 'History', value: 'history' },
    { label: 'Horror', value: 'horror' },
    { label: 'Music', value: 'music' },
    { label: 'Musical', value: 'musical' },
    { label: 'Mystery', value: 'mystery' },
    { label: 'News', value: 'news' },
    { label: 'Romance', value: 'romance' },
    { label: 'Sci-Fi', value: 'sci-fi' },
    { label: 'Short', value: 'short' },
    { label: 'Sport', value: 'sport' },
    { label: 'Talk-Show', value: 'talk-show' },
    { label: 'Thriller', value: 'thriller' },
    { label: 'War', value: 'war' },
    { label: 'Western', value: 'western' },
];


interface HighestGrossingMoviesComponenProps {
    // Add your props here
    BoxOfficeResultData: any;
    year?: string;
    rating?: string;
    genre?: string;
}

type ViewType = 'table' | 'poster';


const HighestGrossingMoviesComponen: React.FC<HighestGrossingMoviesComponenProps> = ({ BoxOfficeResultData, year = 'all-years', rating = 'all-ratings', genre = 'all-genres' }) => {
    const [currentView, setCurrentView] = useState<ViewType>('table');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [sortarrow, setSortarrow] = useState('');
    const [asds, setAsds] = useState('hidden');
    const [tabledata, setTabledata] = useState(BoxOfficeResultData.top_movies);
    const [selectedYear, setSelectedYear] = useState(year);
    const [selectedRating, setSelectedRating] = useState(rating);
    const [selectedGenre, setSelectedGenre] = useState(genre);
    const meta_title = `Highest-Grossing Movies in the Domestic Market | Screendollars Box Office`;
    const meta_description = `Highest-Grossing Movies for ${selectedYear.replace('-', ' ')}, ${selectedRating.split('-').map((part, index) => index === 0 ? part.toUpperCase() : part).join(' ')} and ${selectedGenre.replace('-', ' ')} in the Domestic Market.`;
    const canonical_url = process.env.NEXT_PUBLIC_FRONTEND_URL + '/box-office/highest-grossing/' + selectedRating + '/' + selectedYear + '/';
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [page_no, setPage_no] = useState(1);
    const [totalPages, setTotalPages] = useState(BoxOfficeResultData.total_page_number);
    const [dataChaged, setDataChaged] = useState(false);


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
            'name': meta_title + ' ' + selectedYear + ' ' + selectedRating,
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

    useEffect(() => {
        if (dataChaged) {
            fetchData(selectedYear, selectedRating, selectedGenre, page_no);
            setDataChaged(false);
        }
    }, [selectedYear, selectedRating, selectedGenre, page_no]);

    const fetchData = async (newYear: string, newRating: string, newGenre: string, page: number) => {
        setIsLoading(true);
        let year = newYear;
        if (newYear === 'all-years') {
            year = '';
        }
        let rating = newRating;
        if (newRating === 'all-ratings') {
            rating = '';
        } else {
            rating = newRating;
        }
        let genre = newGenre;
        if (newGenre === 'all-genres') {
            genre = '';
        } else {
            genre = newGenre;
        }
        try {
            // Fetch new data for the selected year
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SD_API}/movie-boxoffice/top-movie-list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&a_year=${year}&a_rating=${rating}&a_genre=${genre}&page_no=${page}`
            );
            if (response.ok) {
                const newData = await response.json();
                setTabledata(newData.top_movies || []);
                setTotalPages(newData.total_page_number);
                console.log(newData.total_page_number);
            } else {
                console.error('Failed to fetch data for year:', newYear);
            }
        } catch (error) {
            console.error('Error fetching year data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const OnRatingChange = async (newRating: string) => {
        setDataChaged(true);
        setPage_no(1);
        setSelectedRating(newRating);
        router.push(`/box-office/highest-grossing/${selectedYear}/${newRating}/${selectedGenre}/`);
    };
    const OnYearChange = async (newYear: string) => {
        setDataChaged(true);
        setSelectedYear(newYear);
        setPage_no(1);
        router.push(`/box-office/highest-grossing/${newYear}/${selectedRating}/${selectedGenre}/`);
    };
    const OnGenreChange = async (newGenre: string) => {
        setDataChaged(true);
        setSelectedGenre(newGenre);
        setPage_no(1);
        router.push(`/box-office/highest-grossing/${selectedYear}/${selectedRating}/${newGenre}/`);
    };

    // Helper function to parse dates in various formats
    const parseDate = (dateValue: any): Date | null => {
        if (!dateValue) return null;

        const dateStr = String(dateValue).trim();
        if (!dateStr) return null;

        // Try parsing as Date object first
        const parsedDate = new Date(dateStr);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
        }

        // Try common date formats
        // Format: "Apr 4, 2025" or "April 4, 2025"
        const monthDayYear = dateStr.match(/(\w+)\s+(\d+),\s*(\d+)/i);
        if (monthDayYear) {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) return date;
        }

        // Format: "2025-04-04" or "2025/04/04"
        const isoFormat = dateStr.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
        if (isoFormat) {
            const date = new Date(parseInt(isoFormat[1]), parseInt(isoFormat[2]) - 1, parseInt(isoFormat[3]));
            if (!isNaN(date.getTime())) return date;
        }

        // Format: "MM/DD/YYYY" or "DD/MM/YYYY"
        const slashFormat = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (slashFormat) {
            // Try MM/DD/YYYY first (US format)
            const date1 = new Date(parseInt(slashFormat[3]), parseInt(slashFormat[1]) - 1, parseInt(slashFormat[2]));
            if (!isNaN(date1.getTime())) return date1;
            // Try DD/MM/YYYY (European format)
            const date2 = new Date(parseInt(slashFormat[3]), parseInt(slashFormat[2]) - 1, parseInt(slashFormat[1]));
            if (!isNaN(date2.getTime())) return date2;
        }

        return null;
    };

    useEffect(() => {
        let sortableItems = [...tabledata];
        if (sortConfig !== null && sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                // Check if this is a date column
                const isDateColumn = sortConfig.key === 'release_date';
                const isYearColumn = sortConfig.key === 'release_year';
                const isRankColumn = sortConfig.key === 'rankCol';
                //handle rank column
                if (isRankColumn) {
                    const aRank = parseInt(a['rank']);
                    const bRank = parseInt(b['rank']);
                    return sortConfig.direction === 'ascending' ? aRank - bRank : bRank - aRank;
                }

                // Handle date columns
                if (isDateColumn) {
                    const aDate = parseDate(aValue);
                    const bDate = parseDate(bValue);

                    if (aDate && bDate) {
                        const diff = aDate.getTime() - bDate.getTime();
                        return sortConfig.direction === 'ascending' ? diff : -diff;
                    }
                    // If one is a date and the other isn't, put non-dates at the end
                    if (aDate && !bDate) return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (!aDate && bDate) return sortConfig.direction === 'ascending' ? 1 : -1;
                    // If neither is a date, fall through to string comparison
                }

                // Handle year column (numeric)
                if (isYearColumn) {
                    const aDate = parseDate(a['release_date']);
                    const bDate = parseDate(b['release_date']);

                    if (aDate && bDate) {
                        const diff = aDate.getTime() - bDate.getTime();
                        return sortConfig.direction === 'ascending' ? diff : -diff;
                    }
                    // If one is a date and the other isn't, put non-dates at the end
                    if (aDate && !bDate) return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (!aDate && bDate) return sortConfig.direction === 'ascending' ? 1 : -1;
                    // If neither is a date, fall through to string comparison
                }



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

    const renderView = () => {
        switch (currentView) {
            case 'table':
                return <BoxOfficeResultTable data={tabledata} tableConfig={tableConfig} OnSortByChange={OnSortByChange} sortarrow={sortarrow} asds={asds} selectedYear={selectedYear === 'all-years' ? 0 : parseInt(selectedYear)} />;
            case 'poster':
                return <BoxOfficeResultTile data={tabledata} currentLayout='SYT' selectedYear={selectedYear === 'all-years' ? 0 : parseInt(selectedYear)} />;//All-time Top movies by Year  (SYT)
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
                        <h1 className='block lg:inline-block align-top pvr pr-0 lg:pt-3 transition-all duration-300 ease-out text-center'>Highest-Grossing Movies </h1>
                        <p>Domestic Box Office Results for
                            <span className='capitalize'> {selectedYear.replace('-', ' ')}, </span>
                            {selectedRating === 'pg-13' ? <span className='uppercase inline-block'>{selectedRating}</span> :
                                <span className='capitalize'>{selectedRating.split('-').map((part, index) => index === 0 ? (part !== 'all' ? part.toUpperCase() : part + ' ') : part).join('')}</span>} and
                            <span className='capitalize inline-block'>&nbsp;{selectedGenre.replace('-', ' ')}</span> </p>
                    </div>
                </div>
            </div>
            <div className='boxresulinfo'>
                <div className='container'>
                    <div className='boxresultable'>
                        <div className='boxtableswich my-3 text-left flex flex-wrap xsm:justify-between justify-center sticky top-0 z-20 bg-white pt-3'>
                            <div className="selectopts flex gap-4 items-center w-full xsm:w-auto mb-4 xsm:mb-0 justify-center xsm:justify-start">
                                <div className="flex flex-col">
                                    <label htmlFor='YearSelect' className='greytxt mb-1'>Year</label>
                                    <select
                                        id='YearSelect'
                                        name='YearSelect'
                                        className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700 '
                                        value={selectedYear}
                                        onChange={(e) => {
                                            OnYearChange(e.target.value);
                                        }}>
                                        {yearsData.map((item, i) => (
                                            <option value={item.value} key={i}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='RatingSelect' className='greytxt mb-1'>Rating</label>
                                    <select
                                        id='RatingSelect'
                                        name='RatingSelect'
                                        className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700'
                                        value={selectedRating}
                                        onChange={(e) => {
                                            OnRatingChange(e.target.value);
                                        }}>
                                        {ratingsData.map((item, i) => (
                                            <option value={item.value} key={i}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor='GenreSelect' className='greytxt mb-1'>Genre</label>
                                    <select
                                        id='GenreSelect'
                                        name='GenreSelect'
                                        className='form-select px-3 py-1 cursor-pointer border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 bg-white text-gray-700 max-h-[500px] overflow-y-auto'
                                        value={selectedGenre}
                                        onChange={(e) => {
                                            OnGenreChange(e.target.value);
                                        }}>
                                        {genresData.map((item, i) => (
                                            <option value={item.value} key={i}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <ul className={'viewsbox ttab flex xsm:inline-flex flex-wrap list-none mb-1 ml-0 xsm:ml-4 aaaa justify-center ' + (currentView === 'poster' ? 'off' : '')}>
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
                        )
                        }

                    </div>
                </div>
            </div>


        </>
    );
};

export default HighestGrossingMoviesComponen;