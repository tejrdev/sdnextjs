import Link from 'next/link';

type AdVariant = 'fullwidth' | 'rectangle' | 'sidebar' | 'leaderboard' | 'banner';

interface AdPlaceholderProps {
    variant?: AdVariant;
    className?: string;
    id?: string;
    showLink?: boolean;
    minHeight?: string | null;
    sectionClass?: string;
    containerClass?: string;
    withWrapper?: boolean;
}

interface VariantStyle {
    container: string;
    inner: string;
    label: string;
}

const showAds = process.env.NEXT_PUBLIC_SHOW_ADS === 'true' ? true : false;

/**
 * AdPlaceholder Component - Reusable ad placement container
 * @param variant - Ad size variant
 * @param className - Additional classes for the ad box
 * @param id - Unique ID for the ad slot
 * @param showLink - Show "Advertise Here" link
 * @param minHeight - Custom minimum height
 * @param sectionClass - Classes for the section wrapper (default: 'ad-section py-6')
 * @param containerClass - Classes for the container (default: 'container')
 * @param withWrapper - Include section and container wrapper (default: true)
 */
function AdPlaceholder({
    variant = 'fullwidth',
    className = '',
    id = 'ad-slot',
    showLink = true,
    minHeight = null,
    sectionClass = 'ad-section py-6',
    containerClass = 'container',
    withWrapper = true
}: AdPlaceholderProps) {
    // Define sizes based on variant
    const variantStyles: Record<AdVariant, VariantStyle> = {
        fullwidth: {
            container: 'w-full',
            inner: 'min-h-[90px] md:min-h-[100px]',
            label: 'ADVERTISEMENT'
        },
        leaderboard: {
            container: 'w-full mx-auto',
            inner: 'min-h-[90px]',
            label: 'ADVERTISEMENT'
        },
        rectangle: {
            container: 'w-full max-w-[300px]',
            inner: 'min-h-[250px]',
            label: 'ADVERTISEMENT'
        },
        sidebar: {
            container: 'w-full max-w-[300px]',
            inner: 'min-h-[600px]',
            label: 'ADVERTISEMENT'
        },
        banner: {
            container: 'w-full max-w-[468px] mx-auto',
            inner: 'min-h-[60px]',
            label: 'AD'
        }
    };

    const styles = variantStyles[variant] || variantStyles.fullwidth;

    // The core ad content
    const adContent = (
        <div
            id={id}
            className={`ad-placeholder ${styles.container} ${className}`}
        >
            <div
                className={`
                    ${!minHeight ? styles.inner : ''}
                    border-2 border-gray-300 dark:border-gray-600
                    bg-gray-50 dark:bg-gray-800/50
                    rounded-md
                    flex items-center justify-center
                    transition-colors duration-300
                    hover:border-gray-400 dark:hover:border-gray-500
                `}
                style={minHeight ? { minHeight } : {}}
            >
                <div className="text-center">
                    <span className="text-xs tracking-[0.2em] text-gray-400 dark:text-gray-500 font-medium uppercase">
                        {styles.label}
                    </span>
                    {showLink && (
                        <Link
                            href="/advertise-with-us/#adscontact"
                            className="block mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Advertise Here
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );

    if (!showAds) return null;

    // Return with wrapper (section + container) or just the ad content
    if (withWrapper) {
        return (
            <section className={sectionClass}>
                <div className={containerClass}>
                    {adContent}
                </div>
            </section>
        );
    }

    return adContent;
}

export default AdPlaceholder;
