import HeroVideo from '../../components/Videos/HeroVideo';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import VideoSec from '../../components/Videos/VideoSec';
import CenterSocial from '../../components/Videos/CenterSocial';
import HomePageAds from '../../components/Homepage/HomePageAds';
import AdPlaceholder from '@/components/Homepage/AdPlaceholder';
import HeadComponent from '@/components/HeadComponent';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

interface SEOData {
    tag?: unknown[] | null;
    children?: unknown[];
    [key: string]: any;
}

interface VideoPlayListItem {
    [key: string]: any;
}

interface TopVideoItem {
    id?: string;
    title?: string;
    video_poster?: string;
    [key: string]: any;
}

interface VideosData {
    top_videos?: TopVideoItem[];
    video_play_list?: VideoPlayListItem[];
    [key: string]: any;
}

interface VideosProps {
    SEOdata: SEOData;
    VideosData: VideosData;
}

export const getStaticProps: GetStaticProps<VideosProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'video');
    const SEOdata: SEOData = await res.json();

    // about page static data
    const VideosDataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/video_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const VideosData: VideosData = await VideosDataResponse.json();

    return {
        props: { SEOdata, VideosData },
        revalidate: 10, // In seconds
    };
};

const Videos = ({ SEOdata, VideosData }: VideosProps) => {
    const router = useRouter();

    useEffect(() => {
        // Handle hash navigation when component mounts or hash changes
        const handleHashNavigation = () => {
            if (typeof window !== 'undefined' && window.location.hash) {
                const hash = window.location.hash.substring(1); // Remove the # symbol

                // Try to find the element with the exact hash
                let element = document.getElementById(hash);

                // If not found, try removing trailing slash
                if (!element && hash.endsWith('/')) {
                    const hashWithoutSlash = hash.slice(0, -1);
                    element = document.getElementById(hashWithoutSlash);
                }

                // If still not found, try to find by partial match
                if (!element) {
                    const allElements = document.querySelectorAll('[id]');
                    for (let el of Array.from(allElements)) {
                        if (el instanceof HTMLElement && el.id.toLowerCase().includes(hash.toLowerCase().replace('/', ''))) {
                            element = el;
                            break;
                        }
                    }
                }

                if (element) {
                    // Add a small delay to ensure the page is fully loaded
                    setTimeout(() => {
                        element?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }, 500);
                } else {
                    console.log('Element not found for hash:', hash);
                    // Log all available IDs for debugging
                    const allIds = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
                }
            }
        };

        // Handle initial load with retry mechanism
        const initialLoad = () => {
            handleHashNavigation();

            // If element not found, retry after a delay (for dynamic content)
            if (window.location.hash && !document.getElementById(window.location.hash.substring(1))) {
                setTimeout(() => {
                    handleHashNavigation();
                }, 1000);
            }
        };

        initialLoad();

        // Handle hash changes
        const handleHashChange = () => {
            handleHashNavigation();
        };

        // Handle Next.js route changes
        const handleRouteChange = () => {
            setTimeout(handleHashNavigation, 100);
        };

        window.addEventListener('hashchange', handleHashChange);
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return (
        <>
            <HeadComponent data={SEOdata} />
            <AdminEditLink data={VideosData} />
            {/* <Darkmode /> */}
            <HeroVideo data={VideosData.top_videos} />

            {/* Ad Placement - After Hero Video */}
            <AdPlaceholder
                variant="fullwidth"
                id="video-ad-1"
                sectionClass="video-ad-section py-6"
            />

            {/* <Trailersec /> */}
            {VideosData?.video_play_list?.map((item, index) => {
                return <VideoSec data={item} key={index} index={index} />;
            })}
            <section className='vidads'>
                <div className='container'>
                    {/* This Ads is only supported in server */}
                    <div className='border-b border-gray-300 py-3'>
                        <HomePageAds cls='ads_970' format='horizontal' />
                    </div>
                </div>
            </section>

            {/* Ad Placement - Before Social */}
            <AdPlaceholder
                variant="fullwidth"
                id="video-ad-2"
                sectionClass="video-ad-section py-6"
            />

            <CenterSocial />
            {/* <Dropmassage /> */}
        </>
    );
};

export default Videos;

