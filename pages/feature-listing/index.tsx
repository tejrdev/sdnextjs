import { useState } from 'react';
import Figimage from '@/components/All/Figimage';
import Tabs from '@/components/All/Tabs';
import Tab from '@/components/All/Tabs';
import Faq from '@/components/Faq/Faq';
import Stillquery from '@/components/Faq/Stillquery';
import Listingsearch from '../../components/Directory/Listingsearch';
import FeaturedListsec from '../../components/Directory/FeaturedList';
import Priceingclaim from '../../components/Directory/Priceingclaim';
import HeadComponent from '@/components/HeadComponent';
import { GetStaticProps } from 'next';

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface VisibilityItem {
    icon?: string;
    title?: string;
    content?: string;
    [key: string]: any;
}

interface DirectoryListItem {
    title: string;
    list_content?: string;
    [key: string]: any;
}

interface ListingData {
    title?: string;
    content?: string;
    img?: string;
    visibility_title?: string;
    visibility_content?: string;
    visibility_list?: VisibilityItem[];
    directory_title?: string;
    directory_content?: string;
    directory_list: DirectoryListItem[];
    featured_list?: any;
    faqs?: any;
    [key: string]: any;
}

interface FeatureListingProps {
    data: SEOData;
    listingData: ListingData;
}

export const getStaticProps: GetStaticProps<FeatureListingProps> = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'feature-list-home-page');
    const data = await res.json();

    let listingDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/featured-list/lending_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const listingData: ListingData = await listingDataResponse.json();

    return {
        props: { data, listingData },
        revalidate: 10, // In seconds
    };
};

const Featurelisting = ({ data, listingData }: FeatureListingProps) => {
    const [isActive, setIsActive] = useState<number | null>(0);
    const [tabactive, setTabactive] = useState<string>(listingData.directory_list[0]?.title || '');

    const tabnameclick = (item: DirectoryListItem, i: number): void => {
        setTabactive(item.title);
        setIsActive(i === isActive ? null : i);
    };

    const SearchData = {
        title: 'Search for a listing',
        content: 'Enter company or organization name. We do our best to include everyone.',
    };

    return (
        <>
            <HeadComponent data={data} />
            <div className='Featurelisting'>
                <section className='insteintro secspace'>
                    <div className='container'>
                        <div className='top_txt text-center'>
                            {<h1 className='uppercase animtitle'>{listingData.title}</h1>}
                            <div className='h4 normal'>{listingData.content}</div>
                        </div>

                        <div className='ctabox text-center'>
                            <a href='#' className='btn uppercase'>
                                {' '}
                                Learn More{' '}
                            </a>
                            {/* <a href='#' className='ghostbtn uppercase goldbtn'> Discover More </a> */}
                        </div>

                        {listingData.img && (
                            <div className='introvideo text-center'>
                                <Figimage src={listingData.img} width={1200} height={727} alt={'pro banner'} />
                            </div>
                        )}
                    </div>
                </section>
                <section className='featurevisibiity secspace'>
                    <div className='container'>
                        <div className='top_txt text-center'>
                            <h2>{listingData.visibility_title}</h2>
                            <p className='max-w-2xl mx-auto'>{listingData.visibility_content}</p>
                        </div>
                        <div className='fvbox grid text-center'>
                            {listingData.visibility_list?.map((item, i) => (
                                <div className='fvitem' key={i}>
                                    <figure className='mx-auto size-28 mb-2 flex items-center justify-center'>
                                        <img src={item?.icon} alt='' className='max-h-full' />
                                    </figure>
                                    <h3>{item?.title}</h3>
                                    <p>{item?.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className='fvcta text-center'>
                            <a href='#srchlisting' className='btn uppercase'>
                                Find Your Listing{' '}
                            </a>
                        </div>
                    </div>
                </section>
                <section className='featurechoos secspace'>
                    <div className='container'>
                        <div className='fcbox sm:flex flex-wrap'>
                            <div className='fcboxleft sm:w-1/2 sm:pr-7'>
                                <h2 className='md:max-w-lg leading-10'>{listingData.directory_title}</h2>
                                <p>{listingData.directory_content}</p>
                                <p>
                                    <strong>Select Who You Are To See Benifits</strong>
                                </p>
                                <ul className='fctabsbtn'>
                                    {listingData.directory_list.map((item, i) => (
                                        <li onClick={() => tabnameclick(item, i)} className={' uppercase ' + (i === isActive ? 'active btn' : 'ghostbtn goldbtn')} key={i}>
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='fcboxright sm:w-1/2'>
                                <div className='fcboxinfo'>
                                    <Tabs tabonname={tabactive}>
                                        {listingData.directory_list.map((item, i) => (
                                            <Tab {...({ label: item.title } as any)} key={i}>
                                                <div className='fcboxinfo_item' dangerouslySetInnerHTML={{ __html: item.list_content || '' }}></div>
                                            </Tab>
                                        ))}
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* this section is removed for now >> <section className="strimline secspace">
        <div className="container">
           <div className="top_txt df fww">
              <h2>Streamline Your Directory Listing Sponsorship Process</h2>
              <p>Our Directory Listing Sponsorship Process Is Designed To Be User-Friendly And Efficient. We Provide Personalized Support And Guidance At Every Step, Ensuring A Smooth Experience From Start To Finish. Whether You're A Filmmaker, Production Company, Or Service Provider, Our Sponsorship Program Offers Valuable Opportunities To Showcase Your Work And Connect With Industry Professionals.</p>
           </div>
           <div className="strimlinebox grid">
              {Array.from({ length: 3 }).map((_, i) =>
                 <div className="strimlitem" key={i}>
                    <figure><span className="placebox"></span></figure>
                    <h3>Step {i + 1}: Contact Us</h3>
                    <p>Take Advantage Of Our Easy And Efficient Process To Claim And Sponsor Your Directory Listing. From Initial Contact To Final Implementation, We Provide A Step-By-Step Guide To Ensure A Seamless Experience.</p>
                 </div>
              )}
           </div>
           <div className="strimlinecta">
              <a href="#" className='btn uppercase'> find your listing </a>
              <a href='#' className='ghostbtn uppercase goldbtn'> Discover More </a>
           </div>
        </div>
     </section> */}
                <FeaturedListsec data={listingData.featured_list} />
                <Priceingclaim />
                <Listingsearch data={SearchData} />
                <section className='featuringfaq secspace'>
                    <Faq data={listingData.faqs} center />
                    <div className='container'>
                        <Stillquery nopro={false} />
                    </div>
                </section>
            </div>
        </>
    );
};

export default Featurelisting;

