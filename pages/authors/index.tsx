import Link from 'next/link';
import HeadComponent from '@/components/HeadComponent';
import { SEOData } from '@/types/aboutsd';
import { useState } from 'react';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';


export async function getStaticProps() {
    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SEO_LINK}author`,
            key: 'SEOdata',
            defaultData: {},
        },
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/author/author-list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'AuthorsData',
            defaultData: {},
        },
    ];
    return await getStaticPropsWithErrorHandling(fetchConfigs);
}

const Authors: React.FC<{ SEOdata: SEOData, AuthorsData: any }> = ({ SEOdata, AuthorsData }) => {
    const [showAll, setShowAll] = useState(false);
    const authorsList = AuthorsData?.author_data || [];
    const displayedAuthors = showAll ? authorsList : authorsList.slice(0, 8);
    const hasMoreAuthors = authorsList.length > 8;
    const canonical_url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/authors/`;

    return (
        <>
            <HeadComponent data={SEOdata} canonical_url={canonical_url} />
            <AdminEditLink data={AuthorsData} />
            <div className="newsbanner_item relative z-[1]">
                <div className="mediainfo absolute top-0 left-0 w-full h-full z-[-1]">
                    <img src={AuthorsData.img_url} alt='Authors List' className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" />
                    <div className="imgfig bg-gradient-to-r from-gray-900 to-transparent absolute top-0 left-0 w-full h-full"></div>

                </div>
                <div className="container text-white ">
                    <div className="2xl:max-w-[88%] w-full pt-20 pb-5 sm:pt-28 xl:pt-36">
                        <h1 className="leading-snug">{AuthorsData.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: AuthorsData.description }}></p>
                    </div>
                </div>
            </div>
            <section className="author_list py-6 md:py-10 lg:py-16">
                <div className="container">
                    <div className="author_list_box grid grid-cols-[repeat(auto-fit,minmax(226px,1fr))] gap-7">
                        {displayedAuthors.map((author: any, index: number) => (
                            <div className="author_list_item relative h-full" key={index}>
                                <div className="bg-white rounded-lg border border-black p-3 flex flex-col items-center text-center h-full">
                                    <Link href={`/author/${author.author}`}><img
                                        src={author.profile_picture}
                                        alt={author.name}
                                        className="w-[150px] h-[150px] rounded-full object-cover mb-4 bg-gray-100"
                                    />
                                    </Link>
                                    <h3 className="font-bold text-xl text-black mb-1"><Link href={`/author/${author.author}`}>{author.name}</Link></h3>
                                    {author.organization && <p className="text-base text-gray-600 mb-1 font-medium">{author.organization}</p>}
                                    {author.designation && <p className="text-sm text-gray-600 mb-0">{author.designation}</p>}
                                    {/* <Link href={`/author/${author.author}`}>
                                        <button
                                            type="button"
                                            className="px-6 py-1 rounded-2xl border border-black font-bold text-black bg-white hover:bg-gray-200 transition-colors"
                                        >
                                            Know Now
                                        </button>
                                    </Link> */}
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasMoreAuthors && !showAll && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={() => setShowAll(true)}
                                className="border border-gray-900 rounded-lg px-8 py-3 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
                            >
                                See More
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
export default Authors;
