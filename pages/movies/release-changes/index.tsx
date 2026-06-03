import HeadComponent from '@/components/HeadComponent';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
import HomePageAds from '../../../components/Homepage/HomePageAds';
import { GetStaticProps } from 'next';

const tdStyle: React.CSSProperties = {
    border: '1px solid rgb(197, 197, 197)',
    borderCollapse: 'collapse',
    padding: '6px',
};

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface ReleaseChangeItem {
    title: string;
    link: string;
    distributor: string;
    distributor_link: string;
    distribution: string;
    release_date: string;
    change_comment: string;
    [key: string]: any;
}

interface ReleaseChangesData {
    title?: string;
    data: ReleaseChangeItem[];
    [key: string]: any;
}

interface ReleaseChangesProps {
    data: SEOData;
    ReleaseChangesData: ReleaseChangesData;
}

export const getStaticProps: GetStaticProps<ReleaseChangesProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movies/release-changes');
    const data: SEOData = await res.json();

    // release changes static data
    const ReleaseChangesDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/release_changes.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const ReleaseChangesData: ReleaseChangesData = await ReleaseChangesDataResponse.json();

    return {
        props: { data, ReleaseChangesData },
        revalidate: 10,
    };
};

const ReleaseChanges = ({ data, ReleaseChangesData }: ReleaseChangesProps) => {
    return (
        <>
            <HeadComponent data={data} />
            {/* <CategoryNavigation /> */}
            <section className='stdchanges subfilmy'>
                <div className='container'>
                    <div className='info_block'>
                        <div className='info_box printarea'>
                            <div className='top_txt middletitle_print'>
                                <div className='top_info'>
                                    <h1>{ReleaseChangesData.title}</h1>
                                    <p>Recently Announced Studio Release Changes</p>
                                </div>
                                <div className='downloadbtn'>
                                    <span className='pritbtn'>Print</span>
                                </div>
                            </div>
                            <div className='info_txt printbox '>
                                <div className='studio_change tablebox'>
                                    <table className='responsive dataTable' id='sr-datatable'>
                                        <thead>
                                            {/* <tr>
                        <th colSpan={2} style={tdStyle}></th>
                        <th colSpan={2} style={tdStyle} className='text-center'>
                          Distribution
                        </th>
                        <th colSpan={1} style={tdStyle}></th>
                      </tr> */}
                                            <tr>
                                                <th data-title='Title'>Title</th>
                                                <th data-title='Distributor'>Distributor</th>
                                                <th data-title='Pattern / Platform' className='text-center'>
                                                    Pattern
                                                </th>
                                                <th data-title='Release Date' className='text-center'>
                                                    Release Date
                                                </th>
                                                <th data-title='Comments' className='text-center'>
                                                    Comments
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {ReleaseChangesData.data.map((item, index) => {
                                                return (
                                                    <tr className={`box-office-res-row ${(index % 2) === 0 ? 'even' : 'odd'}`} role='row' key={index}>
                                                        <td data-title='Title' style={tdStyle} className='text-left'>
                                                            <a href={item.link}>
                                                                <strong>{item.title}</strong>
                                                            </a>
                                                        </td>
                                                        <td data-title='Distributor' style={tdStyle}>
                                                            <a href={item.distributor_link}>
                                                                <strong>{item.distributor}</strong>
                                                            </a>
                                                        </td>
                                                        <td data-title='Distribution Pattern' style={tdStyle} dangerouslySetInnerHTML={{ __html: item.distribution }}></td>
                                                        <td data-title='Release Date' style={tdStyle}>
                                                            {item.release_date}
                                                        </td>
                                                        <td data-title='Comments' style={tdStyle}>
                                                            {item.change_comment}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row '>
                        <HomePageAds cls='ads_970 mt-7' format='horizontal' />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReleaseChanges;

