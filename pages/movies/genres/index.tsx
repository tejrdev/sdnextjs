import Link from 'next/link';
import HeadComponent from '@/components/HeadComponent';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import { GetStaticProps } from 'next';

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface GenreListItem {
    select_genre: string;
    genre_image: string;
    [key: string]: any;
}

interface GenrelistData {
    page_title?: string;
    page_link?: string;
    genre_list?: GenreListItem[];
    [key: string]: any;
}

interface GenrelistProps {
    GenrelistData: GenrelistData;
    SEOdata: SEOData;
}

export const getStaticProps: GetStaticProps<GenrelistProps> = async () => {
    // Fetch SEO data
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '/movies/genres/');
    const SEOdata: SEOData = await res.json();

    //genre page
    const GenrelistDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-genre/index.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const GenrelistData: GenrelistData = await GenrelistDataResponse.json();

    return {
        props: { GenrelistData, SEOdata },
        revalidate: 10,
    };
};

const Genrelist = ({ GenrelistData, SEOdata }: GenrelistProps) => {
    return (
        <>
            <HeadComponent data={SEOdata} />
            <AdminEditLink data={GenrelistData} />
            <section className='genrelisting subfilmy'>
                <div className='container'>
                    <div className='top_txt'>
                        <h1 className='h2'>{GenrelistData.page_title}</h1>
                    </div>

                    <div className='genrelistbox grid gap16'>
                        {GenrelistData.genre_list &&
                            GenrelistData.genre_list.map((item, index) => (
                                <div className='genrelistitem' key={index}>
                                    <Link href={(GenrelistData.page_link || '') + item.select_genre.toLowerCase()}>
                                        <figure className='pvr'>
                                            <img src={item.genre_image} alt='' className='objctimg_box' />
                                            <figcaption className='genmiddlename'>{item.select_genre}</figcaption>
                                        </figure>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Genrelist;

