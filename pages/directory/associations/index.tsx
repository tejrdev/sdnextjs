import NewsletterSubscriber from '@/components/shared/NewsletterSubscriber';
import Link from 'next/link';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import HeadComponent from '@/components/HeadComponent';


export const getStaticProps = async () => {
    const fetchConfigs = [
        {
            url: `${process.env.NEXT_PUBLIC_SD_API}/directory_associations/associations-list.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
            key: 'associations',
            defaultData: [],
        },
    ];
    return await getStaticPropsWithErrorHandling(fetchConfigs);
};

export default function Associations({ associations }: { associations: any }) {
    const metaTitle = 'Associations';
    const metaDescription = 'Explore leading film and theatre associations across the US and Canada, including Cinema United, NICE, MTAC, ICA, and UDITOA.';
    const canonicalUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/directory/associations/`;

    return (
        <div>
            <HeadComponent meta_title={metaTitle} meta_description={metaDescription} canonical_url={canonicalUrl} />
            <section
                className="py-[clamp(2rem,5vw,3.125rem)] pb-[clamp(1.5rem,4vw,1.875rem)] bg-zinc-100"
                aria-labelledby="associations-title">
                <div className="container">
                    <div className="mb-[clamp(2rem,6vw,3.375rem)]">
                        <div className="top_txt mb-5 md:mb-6 lg:mb-8">
                            <h1 id="associations-title" className=""> {associations.page_title} </h1>
                            <p className="m-0 max-w-[989px] md:text-xl">
                                {associations.content}
                            </p>
                        </div>

                        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                            {associations?.associations_list?.map((association, index: number) => (
                                <article
                                    key={index}
                                    className="max-w-[401px] rounded-[10px] bg-white p-[3px] ">
                                    <div className="aspect-[389/251] overflow-hidden rounded-[7px] bg-neutral-300">
                                        <Link href={association.link}><img src={association.img} alt="" width="389" height="251"
                                            className="block size-full object-cover" loading="lazy" /></Link>
                                    </div>
                                    <div className="p-2.5">
                                        <h2 className="text-lg font-bold leading-tight mb-2">
                                            <Link href={association.link}>{association.title}</Link></h2>
                                        <p className="m-0">{association.content}</p>
                                    </div>
                                </article>
                            ))}


                        </div>
                    </div>
                </div>
            </section>
            <NewsletterSubscriber />
        </div>
    );
}