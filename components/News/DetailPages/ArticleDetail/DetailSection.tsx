import Link from 'next/link';
import AdminEditLink from '../../../../components/DetailPages/AdminEditLink';
import Faq from '@/components/Faq/Faq';
import Sidebar from '@/components/shared/Sidebar';

interface StarRatingProps {
    rating?: number;
    maxStars?: number;
}

// Star Rating Component
const StarRating = ({ rating = 0, maxStars = 5 }: StarRatingProps) => {
    const renderStars = () => {
        const stars: JSX.Element[] = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= maxStars; i++) {
            if (i <= fullStars) {
                // Full star
                stars.push(
                    <span key={i} className="text-yellow-400 text-4xl leading-none">
                        ★
                    </span>
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                // Half star
                stars.push(
                    <span key={i} className="text-4xl leading-none relative">
                        <span className="text-gray-500">☆</span>
                        <span className="absolute inset-0 text-yellow-400 overflow-hidden" style={{ width: '50%' }}>★</span>
                    </span>
                );
            } else {
                // Empty star
                stars.push(
                    <span key={i} className="text-gray-500 text-4xl leading-none">
                        ☆
                    </span>
                );
            }
        }

        return stars;
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
                {renderStars()}
            </div>
        </div>
    );
};

interface RecentPost {
    link?: string;
    img?: string;
    title?: string;
    p_date?: string;
}

interface VendorPdfItem {
    select_image?: string;
    select_pdf_file?: {
        url?: string;
    };
    title?: string;
}

interface SpotlightData {
    vendor_url?: string;
    vendor_title?: string;
    vendor_pdf?: VendorPdfItem[];
}

interface PreviousPost {
    link?: string;
    img?: string;
    title?: string;
}

interface NextPost {
    links?: string;
    img?: string;
    title?: string;
}

interface DetailSectionProps {
    data: {
        read_time?: string;
        internal_movie_rating?: number;
        article_content?: string;
        faq_content?: any[];
        original_source?: string;
        source_article?: string;
        previous?: PreviousPost;
        next?: NextPost;
        spolight_data?: SpotlightData;
        newsletters_title?: string;
        newsletters_contnet?: string;
        conditions_of_use_title?: string;
        conditions_of_use_content?: string;
        category_list_display?: string;
        recent_posts?: RecentPost[];
        [key: string]: any;
    };
    category?: string;
}

const DetailSection = ({ data, category = '' }: DetailSectionProps) => {

    return (
        <section className='artdetailarea sportart'>
            <AdminEditLink data={data} />
            <div className='container'>
                <div className='artdtlbox subartbox df fww'>
                    <div className='artdtlbox_left subartbox_left'>
                        {/* Dynamic Star Rating Component */}
                        {data.internal_movie_rating && data.internal_movie_rating > 0 && (
                            <div className='star-rating mb-4'>
                                <StarRating rating={data.internal_movie_rating} />
                            </div>
                        )}
                        <div className='article-content' dangerouslySetInnerHTML={{ __html: data.article_content || '' }}></div>
                        {data.faq_content && data.faq_content.length > 0 && <Faq data={data.faq_content} />}

                        {data.original_source && (
                            <div className='article-original-link'>
                                <a href={data.source_article} target='_blank' rel="noopener noreferrer">
                                    <strong>{data.original_source}</strong>
                                </a>
                            </div>
                        )}
                        <div className='art_nav'>
                            <div className='front-show social_share'>
                                <div className='addtoany_shortcode'></div>
                            </div>
                        </div>

                        {data?.spolight_data && data.spolight_data?.vendor_pdf && (
                            <div className='spolight_data pt-6 lg:pt-8 w-full'>
                                <h3>
                                    <Link href={data.spolight_data.vendor_url || '#'}>{data.spolight_data.vendor_title}</Link>
                                </h3>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    {data.spolight_data?.vendor_pdf?.map((item, index) => (
                                        <div key={index} className='relative '>
                                            {item?.select_image && (
                                                <Link href={item?.select_pdf_file?.url || '#'} target='_blank' className='block border border-gray-300 rounded-lg'>
                                                    <img src={item?.select_image} alt={item?.title || ''} className='p-1 ' />
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </section>
    );
};

export default DetailSection;

