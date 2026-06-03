import HeadComponent from '@/components/HeadComponent';
import { GetStaticProps } from 'next';

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface NonStopNewsItem {
    id: string | number;
    img: string;
    title: string;
    text: string;
    [key: string]: any;
}

interface NonStopNewsData {
    non_stop_news_title?: string;
    non_stop_news?: NonStopNewsItem[];
    [key: string]: any;
}

interface NonStopNewsProps {
    data: SEOData;
    NonStopNewsData: NonStopNewsData;
}

export const getStaticProps: GetStaticProps<NonStopNewsProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'non-stop-news');
    const data: SEOData = await res.json();

    // non stop news static data
    const NonStopNewsDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/non_stop_news/detail_page_news.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const NonStopNewsData: NonStopNewsData = await NonStopNewsDataResponse.json();

    return { props: { data, NonStopNewsData } };
};

const NonStopNews = ({ data, NonStopNewsData }: NonStopNewsProps) => {
    return (
        <>
            <HeadComponent data={data} />
            <section className='newslinebox sec_spacing'>
                <div className='container' id='nonstop_list_data'>
                    <div className='top_txt text-center'>
                        <h1 className='h2 btmline'>Nonstop News</h1>
                    </div>
                    <div className='newsline_block twocol_news df fww'>
                        <h3 className='newsline_datebox'>
                            {NonStopNewsData.non_stop_news_title} <i className='far fa-angle-right'></i>
                        </h3>
                        {NonStopNewsData?.non_stop_news && NonStopNewsData?.non_stop_news?.length > 0
                            ? NonStopNewsData.non_stop_news.map((item, index) => {
                                return (
                                    <div className='newsline_item' id={String(item.id)} key={index}>
                                        <div className='newaline_inner'>
                                            <figure className='pvr'>
                                                <img src={item.img} alt='' className='objctimg_box' />
                                            </figure>
                                            <div className='newsline_iteminfo'>
                                                <h4>{item.title}</h4>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            : null}
                    </div>
                </div>
                <input type='hidden' id='infi_non_next' value='105629' />
                <div className='distributer_secload pvr df fww'>
                    <div className='boxloader hide' id='directory_home_loader'>
                        <div className='loadersmall'></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NonStopNews;

