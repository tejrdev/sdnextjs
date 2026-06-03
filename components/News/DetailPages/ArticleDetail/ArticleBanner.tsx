import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SocialShare from '@/components/shared/SocialShare';
import AuthorData from '@/components/shared/AuthorData';

/** Current detail URL → parent listing by dropping the last path segment (slug / id). */
export function listingPathFromDetailPath(pathWithQuery: string): string {
    const path = pathWithQuery.split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);
    if (segments.length <= 1) return '/';
    segments.pop();
    return '/' + segments.join('/');
}

interface AuthorData {
    name: string;
    profile_picture?: string;
    author: string;
    published_date?: string;
}

interface ArticleBannerProps {
    data: {
        cate_names?: string;
        read_time?: string;
        title?: string;
        img_url?: string;
        img_caption?: string;
        author_data?: AuthorData;
        date?: string;
        posted?: string;
        [key: string]: any;
    };
    /** Optional override if URL-based listing is wrong for a route. */
    backHref?: string;
}

const ArticleBanner = ({ data, backHref }: ArticleBannerProps) => {
    const router = useRouter();
    const listingHref = backHref ?? listingPathFromDetailPath(router.asPath || '');

    return (
        <section className='mt-9 xl:mt-11 artdetailbnr artbnrimg'>
            <AdminEditLink data={data} />

            <div className='container'>
                <div className="all_postlink mb-7">
                    <Link href={listingHref} className='text-black hover:text-blue'>
                        <i className='fas fa-long-arrow-left mr-1'></i> All Posts
                    </Link>
                </div>
                <ul className="list-none ml-0 mb-2 df fww items-start">
                    <li className="bg-slate-200 capitalize inline-block p-1 px-2 text-sm mr-4">{data.cate_names}</li>
                    <li className='my-1'>{data?.read_time && (
                        <p className='flex items-center'>
                            <span className='mr-2 w-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
                                </svg>
                            </span>
                            {data?.read_time}
                        </p>
                    )}</li>
                </ul>
                <h1 className='mb-6'>
                    {data?.movie_url ? <Link href={data?.movie_url} className='text-black hover:text-blue'>{data.title}</Link> :
                        <span className='text-black'>{data.title}</span>
                    }
                </h1>
                <div className=' min-h-96 xl:min-h-[580px] py-[16%] px-7 xl:py-36 relative'>
                    <div className='artdtlhero_img'>
                        <img src={data.img_url} alt='' className='objctimg_box' />
                    </div>
                </div>
                <div className='border-gray-700 my-2 capitalize' dangerouslySetInnerHTML={{ __html: data.img_caption || '' }}></div>
                <div className="postsocialinfo df fww justify-between my-1 items-center">
                    <ul className="list-none ml-0 df fww mb-1 mt-2">
                        {/* {data.author_data?.name && data.author_data?.author && <Link href={`/author/${data.author_data?.author}`} className='text-black hover:text-blue'><li className='mr-7'>By <strong>{data.author_data?.name}</strong></li></Link>} */}
                        {/*<li>Posted on <strong>{data.date || data.posted}</strong></li> */}
                        {data.author_data && <AuthorData data={data.author_data} published_date={data.published_date} />}
                    </ul>
                    <SocialShare title={data.title} />

                </div>
            </div>
        </section>
    );
};

export default ArticleBanner;

