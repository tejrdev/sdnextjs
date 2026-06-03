import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import Page404 from '@/components/Page404';
import Link from 'next/link';
import { GetStaticPaths } from 'next';
import FAQSection from '@/components/Faq/Faq';
import router from 'next/router';
import HeadComponent from '@/components/HeadComponent';
import { JSONData } from '@/components/shared/JSONData';
import GlossaryDefaultImage from '@/public/images/glossary_default_banner.jpg';
const SEOdata = JSONData.Glossary_SEOData;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}
export async function getStaticProps(context: any) {
    const { az, detail } = context.params as { az: string, detail: string }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = `{"url" : "${process.env.NEXT_PUBLIC_BACKEND_URL}/glossary/${detail}", "apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}", "alphabet" : "${az.toUpperCase()}"}`;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/glossary/glossary-detail.php`, requestOptions as RequestInit);
    const data = await res.json();
    return {
        props: { data, az, detail },
        revalidate: 60, // 1 min
    }
}

const GlossaryDetail = ({ data, az, detail }: { data: any, az: string, detail: string }) => {
    const GlossaryDetailSEO = SEOdata.find((item: any) => item.key === `glossary/${az}/${detail}/`) as any;
    if (data?.code === 400) {
        return <Page404 />
    }
    return (
        <div className='glossaryDetail'>
            <HeadComponent meta_title={GlossaryDetailSEO?.metaTitle} meta_description={GlossaryDetailSEO?.metaDescription} canonical_url={process.env.NEXT_PUBLIC_FRONTEND_URL + '/glossary/' + az + '/' + detail + '/'} />
            <AdminEditLink data={data} />
            <div className='banner'>
                <figure className='aspect-[1920/340] overflow-hidden  bg-neutral-300 '>
                    <img src={data?.img_url || GlossaryDefaultImage.src} alt='Glossary Detail' width={1920} height={340} loading='lazy' className='w-full h-full object-cover' />
                </figure>
            </div>
            <div className="top_title bg-zinc-900 text-white py-4 md:py-6">
                <div className='container'>
                    <h1>{data?.title}</h1>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="content_inner my-10 md:my-16">
                        <div dangerouslySetInnerHTML={{ __html: data?.content || '' }}></div>
                        <div className='related-words flex flex-wrap gap-4'>
                            <h5>Related Words: </h5>
                            <ul className='related-words-list flex flex-wrap gap-2 m-0'>
                                {data?.related_glossary?.map((word: any, index: number) => (
                                    <li key={word?.id} className='list-none m-0 p-0'>
                                        <Link href={`/${word?.link}`} className='text-black underline hover:no-underline'>
                                            {word?.title}
                                            <span className={` ${index === data?.related_glossary?.length - 1 ? 'hidden' : ''}`}>,</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {data?.faq_content && data?.faq_content.length > 0 && <FAQSection data={data?.faq_content} />}
                    <div className="cta flex justify-center items-center gap-4 mb-10 md:mb-16">
                        <button type='button' className='bg-zinc-900 rounded-full px-12 py-2 text-white font-bold hover:bg-black transition-colors lg:min-w-52' onClick={() => router.back()}>Go Back</button>
                        <button type='button' className='bg-orangegold text-black rounded-full px-12 py-2 font-bold hover:bg-orange-400 transition-colors lg:min-w-52' onClick={() => router.push(`/${data?.next_post}`)}>Next Word</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlossaryDetail