import axios, { AxiosRequestConfig } from 'axios';
import Link from 'next/link';
import Script from 'next/script';
import { useState, FormEvent, useEffect, useRef, useCallback } from 'react';

declare global {
    interface Window {
        grecaptcha?: {
            render: (
                container: HTMLElement | string,
                options: {
                    sitekey: string;
                    callback?: (token: string) => void;
                    'expired-callback'?: () => void;
                    'error-callback'?: () => void;
                }
            ) => number;
            reset: () => void;
        };
    }
}

type RecaptchaStatus = '' | 'loading' | 'verified' | 'failed';

const SIDEBAR_RECAPTCHA_CONTAINER_ID = 'sidebar-recaptcha-container';

const Sidebar = ({ requestFrom = '' }: { requestFrom?: string }) => {
    const newsletters_title = 'Sign up for the Screendollars Newsletter';
    const newsletters_content = 'Information For Professionals In Exhibition, Film And Entertainment';

    const NewsCategories = [
        {
            link: '/news/industry-news/',
            name: 'Industry News'
        },
        {
            link: '/news/box-office-outlook/',
            name: 'Box Office Outlook'
        },
        {
            link: '/news/dick-walshs-industry-update/',
            name: 'Industry Update'
        },
        {
            link: '/news/hollywood-report/',
            name: 'Hollywood Report'
        },
    ]
    const BlogCategories = [
        {
            link: '/blog/editorials/',
            name: 'Editorials'
        },
        {
            link: '/blog/lists/',
            name: 'All Time Lists'
        },
        {
            link: '/blog/celebrity-spotlight/',
            name: 'Celebrity Spotlight'
        },
    ]
    const categories = requestFrom === 'news' ? NewsCategories : BlogCategories;
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
    const [recaptchaStatus, setRecaptchaStatus] = useState<RecaptchaStatus>('');
    const [showRecaptchaUi, setShowRecaptchaUi] = useState(false);

    const onRecaptchaChange = useCallback((token: string) => {
        setRecaptchaToken(token);
    }, []);

    const verifyRecaptchaToken = async (token: string): Promise<boolean> => {
        try {
            setRecaptchaStatus('loading');

            const isLocalhost = false
            // typeof window !== 'undefined' &&
            // (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const axiosConfig: AxiosRequestConfig = {
                headers: { 'Content-Type': 'application/json' },
            };

            if (isLocalhost) {
                axiosConfig.baseURL = 'http://localhost:3000';
            }

            const response = await axios.post('/api/verify-recaptcha', { token }, axiosConfig);

            if (response.data.success) {
                setRecaptchaStatus('verified');
            } else {
                setRecaptchaStatus('failed');
            }

            return response.data.success;
        } catch (error) {
            console.error('reCAPTCHA verification error:', error);
            setRecaptchaStatus('failed');
            return false;
        }
    };
    const rightSidebarRef = useRef<HTMLDivElement>(null);
    const sidebarOriginalTopRef = useRef<number>(0);
    const [isSticky, setIsSticky] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');


    // Store original sidebar position on mount
    useEffect(() => {
        if (rightSidebarRef.current) {
            sidebarOriginalTopRef.current = rightSidebarRef.current.offsetTop;
        }
    }, []);

    // Handle sticky sidebar on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const direction = currentScrollY > lastScrollY ? 'down' : 'up';
            setScrollDirection(direction);
            setLastScrollY(currentScrollY);

            if (!rightSidebarRef.current) return;

            // Find the "Recommended for you" section
            const recommendedSection = document.querySelector('.art_sliderarea.singleartslider');

            if (recommendedSection && rightSidebarRef.current) {
                const sidebarRect = rightSidebarRef.current.getBoundingClientRect();
                const recommendedRect = recommendedSection.getBoundingClientRect();

                // Get the sidebar's original position (before sticky)
                const sidebarOriginalTop = sidebarOriginalTopRef.current;

                // Calculate positions relative to viewport
                const recommendedTop = recommendedRect.top;
                const sidebarBottom = sidebarRect.bottom;
                // const sidebarHeight = sidebarRect.height;

                // Check if we've scrolled past the sidebar's original position
                const pastOriginalPosition = currentScrollY >= sidebarOriginalTop - 20; // 20px threshold

                // Check if sidebar bottom would overlap with recommended section top
                // We want to stop sticky when sidebar bottom reaches recommended section top
                const wouldOverlap = sidebarBottom >= recommendedTop - 20;

                // Enable sticky when:
                // 1. Scrolling up AND
                // 2. We've scrolled past the original position AND
                // 3. Sidebar hasn't reached the recommended section yet
                if (direction === 'up' && pastOriginalPosition && !wouldOverlap) {
                    setIsSticky(true);
                }
                // Disable sticky when:
                // 1. Scrolling down OR
                // 2. Sidebar has reached or would overlap the recommended section OR
                // 3. We're above the original position
                else if (direction === 'down' || wouldOverlap || !pastOriginalPosition) {
                    setIsSticky(false);
                }
            } else {
                // If recommended section not found, enable sticky on scroll up after original position
                const pastOriginalPosition = currentScrollY >= sidebarOriginalTopRef.current - 20;
                if (direction === 'up' && pastOriginalPosition) {
                    setIsSticky(true);
                } else if (direction === 'down' || !pastOriginalPosition) {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, scrollDirection]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        setShowRecaptchaUi(!isLocalhost);

        if (isLocalhost) {
            setIsRecaptchaLoaded(true);
            return;
        }

        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (!siteKey) {
            setSubmitMessage('reCAPTCHA is not properly configured.');
            return;
        }

        const loadRecaptcha = (): void => {
            const container = document.getElementById(SIDEBAR_RECAPTCHA_CONTAINER_ID);
            if (!container) return;

            container.innerHTML = '';

            if (window.grecaptcha && window.grecaptcha.render) {
                try {
                    window.grecaptcha.render(container, {
                        sitekey: siteKey,
                        callback: onRecaptchaChange,
                        'expired-callback': () => {
                            setRecaptchaToken('');
                            setSubmitMessage('reCAPTCHA has expired. Please complete it again.');
                        },
                        'error-callback': () => {
                            setRecaptchaToken('');
                            setSubmitMessage('reCAPTCHA error. Please try again.');
                        },
                    });
                    setIsRecaptchaLoaded(true);
                } catch {
                    setSubmitMessage('Failed to load reCAPTCHA. Please refresh the page.');
                }
            } else {
                setSubmitMessage('reCAPTCHA script not loaded. Please refresh the page.');
            }
        };

        const checkRecaptcha = (): void => {
            if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
                loadRecaptcha();
            } else {
                setTimeout(checkRecaptcha, 100);
            }
        };

        setTimeout(checkRecaptcha, 500);
    }, [onRecaptchaChange]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitMessage('');

        const isLocalhost =
            typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (!isLocalhost) {
            if (!recaptchaToken) {
                setSubmitMessage('Please complete the reCAPTCHA verification.');
                return;
            }

            const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
            if (!isRecaptchaValid) {
                setSubmitMessage('reCAPTCHA verification failed. Please try again.');
                if (window.grecaptcha && window.grecaptcha.reset) {
                    window.grecaptcha.reset();
                }
                setRecaptchaToken('');
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const form_data = new FormData();
            form_data.append('your-email', email);
            if (!isLocalhost && recaptchaToken) {
                form_data.append('g-recaptcha-response', recaptchaToken);
            }

            const response = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-json/contact-form-7/v1/contact-forms/946/feedback',
                form_data,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.status === 'mail_sent') {
                setSubmitMessage('Thank you for subscribing!');
                setEmail('');
                setRecaptchaToken('');
                setRecaptchaStatus('');
                if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.reset) {
                    window.grecaptcha.reset();
                }
            } else {
                setSubmitMessage(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error: any) {
            console.error('Form submission error:', error);
            setSubmitMessage(error.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Script
                src="https://www.google.com/recaptcha/api.js?render=explicit"
                strategy="afterInteractive"
                onError={() => {
                    setSubmitMessage('Failed to load reCAPTCHA. Please check your internet connection.');
                }}
            />

            <div ref={rightSidebarRef}
                className={`artdtlbox_right subartbox_right ${isSticky ? 'sticky-sidebar' : ''}`}
            >
                <div className="side_block">
                    <div className="sideblck_top">
                        <h4>{requestFrom === 'news' ? 'News ' : 'Blog '}Categories</h4>
                    </div>
                    <ul className="cat_listing">
                        {categories?.map((item: any, index: number) => {
                            return (
                                <li key={index}>
                                    <Link href={item.link}>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="dtlsubscribebox bg-gold-yellow p-5 sm:p-8">
                    <h3>{newsletters_title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: newsletters_content || '' }}></p>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="flex flex-col">

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className=""
                                required
                            />
                        </div>

                        {showRecaptchaUi && (
                            <div className="mt-4">
                                <div id={SIDEBAR_RECAPTCHA_CONTAINER_ID} />
                                {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                                    <p className="text-red-400 text-sm mt-2">
                                        reCAPTCHA is not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
                                    </p>
                                )}
                                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !isRecaptchaLoaded && (
                                    <p className="text-blue-300 text-sm mt-2">Loading reCAPTCHA...</p>
                                )}
                                {recaptchaStatus === 'loading' && (
                                    <p className="text-yellow-300 text-sm mt-2 flex items-center gap-2">
                                        <span className="animate-spin">🔄</span>
                                        Verifying reCAPTCHA...
                                    </p>
                                )}
                                {recaptchaStatus === 'verified' && (
                                    <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
                                        <span>✅</span>
                                        reCAPTCHA verified successfully!
                                    </p>
                                )}
                                {recaptchaStatus === 'failed' && (
                                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                        <span>❌</span>
                                        reCAPTCHA verification failed. Please try again.
                                    </p>
                                )}
                            </div>
                        )}
                        {submitMessage && (
                            <p className={`mt-2 text-sm ${submitMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                                {submitMessage}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black w-full text-white hover:bg-gold hover:text-black transition-all duration-500 p-2 rounded-none my-3 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Submitting...' : 'Subscribe'}
                        </button>

                    </form>
                    <p className='text-sm m-0'>By subscribing you agree to with our <Link href="/privacy-policy" target='_blank'>Privacy Policy.</Link></p>
                </div>
                <div className="add_300place"></div>
            </div>
        </>
    )
}
export default Sidebar;