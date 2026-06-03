import React from 'react'
import Link from 'next/link'
import { GetStaticPaths } from 'next';
import HeadComponent from '@/components/HeadComponent';
import { JSONData } from '@/components/shared/JSONData';
const SEOdata = JSONData.Glossary_SEOData;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}
export async function getStaticProps(context: any) {
    const { az } = context.params as { az: string }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = `{"alphabet" : "${az?.toString().toLowerCase()}", "apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/glossary/glossary-filter.php`, requestOptions as RequestInit);
    const data = await res.json();
    return {
        props: { data, az },
        revalidate: 60, // 1 min
    }
}

const GlossaryAZ = ({ data, az }: { data: any, az: string }) => {
    const GlossaryAZSEO = SEOdata.find((item: any) => item.key === `glossary/${az}`) as any;
    return (
        <>
            <HeadComponent meta_title={GlossaryAZSEO?.metaTitle} meta_description={GlossaryAZSEO?.metaDescription} canonical_url={process.env.NEXT_PUBLIC_FRONTEND_URL + '/glossary/' + az + '/'} />
            <div className='glossaryAZ secspace'>
                <div className="container">
                    <h1 className='mb-4 md:mb-6 lg:mb-8'>Beginning With '{az?.toString().toUpperCase()}'</h1>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-2 font-sans text-black leading-relaxed">
                        {data?.glossary_list.length > 0 ? data?.glossary_list?.map((item: any, index: number) => (
                            <p className="font-normal mb-0" key={index}>
                                <Link className="text-black hover:text-underline" href={`/${item?.url}`}>{item?.title}</Link>
                            </p>
                        )) : <p className="font-normal mb-0">No data found</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GlossaryAZ