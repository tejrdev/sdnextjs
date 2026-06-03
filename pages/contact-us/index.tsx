import ContactForm from '@/components/Contact/ContactForm';
import contactmedia from '@/public/images/contactmedia.jpg';
import axios, { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import HeadComponent from '@/components/HeadComponent';
import Script from 'next/script';
import { GetStaticProps } from 'next';


// Type declarations for grecaptcha
declare global {
    interface Window {
        grecaptcha?: {
            render: (container: HTMLElement | string, options: {
                sitekey: string;
                callback?: (token: string) => void;
                'expired-callback'?: () => void;
                'error-callback'?: () => void;
            }) => number;
            reset: () => void;
        };
    }
}

interface SEOData {
    tag?: unknown[];
    children?: unknown[];
    [key: string]: any;
}

interface ContactPageData {
    left_block_title?: string;
    form_content?: string;
    logo?: string;
    logo_alt?: string;
    contact_location?: string;
    contact_location_link?: string;
    location_icon?: string;
    contact_number?: string;
    call_link?: string;
    call_icon?: string;
    email_address?: string;
    email_address_link?: string;
    email_address_icon?: string;
    content_message?: string;
    [key: string]: any;
}

interface ContactUsProps {
    data: SEOData;
    ContactpageData: ContactPageData;
}

type RecaptchaStatus = '' | 'loading' | 'verified' | 'failed';

export const getStaticProps: GetStaticProps<ContactUsProps> = async () => {
    // Fetch data from external API
    const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'contact-us');
    const data = await res.json();

    // contact page static data
    let ContactpageData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/contact_us_page?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    ContactpageData = await ContactpageData.json();

    return {
        props: { data, ContactpageData },
        revalidate: 10,
    };
};

const ContactUs = ({ data, ContactpageData }: ContactUsProps) => {

    const [yourname, setYourName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [youremail, setEmailid] = useState<string>('');
    const [organization, setOrganization] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [commentsm, setCommentsm] = useState<string>('');
    const [EmailFormClass, setEmailFormClass] = useState<string>('wpcf7-form');
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [recaptchaStatus, setRecaptchaStatus] = useState<RecaptchaStatus>(''); // 'loading', 'verified', 'failed'

    // reCAPTCHA callback function
    const onRecaptchaChange = (token: string): void => {
        setRecaptchaToken(token);
    };

    // Verify reCAPTCHA token with Google's API
    const verifyRecaptchaToken = async (token: string): Promise<boolean> => {
        try {
            setRecaptchaStatus('loading');

            const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const axiosConfig: AxiosRequestConfig = {
                headers: { 'Content-Type': 'application/json' },
            };

            let response;
            if (isLocalhost) {
                axiosConfig.baseURL = 'http://localhost:3000';
                response = await axios.post('/api/verify-recaptcha', { token }, axiosConfig);
            } else {
                response = await axios.post('/api/verify-recaptcha', { token }, axiosConfig);
            }

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

    // Load reCAPTCHA script (skip for localhost)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        if (isLocalhost) {
            setIsRecaptchaLoaded(true); // Mark as loaded for localhost
            return;
        }

        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

        if (!siteKey) {
            setErrorMessage('reCAPTCHA is not properly configured.');
            return;
        }

        const loadRecaptcha = (): void => {
            const container = document.getElementById('recaptcha-container');
            if (!container) return;

            container.innerHTML = '';

            if (window.grecaptcha && window.grecaptcha.render) {
                try {
                    window.grecaptcha.render(container, {
                        sitekey: siteKey,
                        callback: onRecaptchaChange,
                        'expired-callback': () => {
                            setRecaptchaToken('');
                            setErrorMessage('reCAPTCHA has expired. Please complete it again.');
                        },
                        'error-callback': () => {
                            setRecaptchaToken('');
                            setErrorMessage('reCAPTCHA error. Please try again.');
                        }
                    });
                    setIsRecaptchaLoaded(true);
                } catch (error) {
                    setErrorMessage('Failed to load reCAPTCHA. Please refresh the page.');
                }
            } else {
                setErrorMessage('reCAPTCHA script not loaded. Please refresh the page.');
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
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Skip reCAPTCHA for localhost development
        const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (!isLocalhost) {
            // Check if reCAPTCHA is completed (production only)
            if (!recaptchaToken) {
                setErrorMessage('Please complete the reCAPTCHA verification.');
                setEmailFormClass('wpcf7-form invalid');
                return;
            }

            // Verify reCAPTCHA token with Google (production only)
            const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
            if (!isRecaptchaValid) {
                setErrorMessage('reCAPTCHA verification failed. Please try again.');
                setEmailFormClass('wpcf7-form invalid');
                if (window.grecaptcha && window.grecaptcha.reset) {
                    window.grecaptcha.reset();
                }
                setRecaptchaToken('');
                return;
            }
        }

        // Reset error and success states
        setErrorMessage('');
        setSuccessMessage('');
        setEmailFormClass('wpcf7-form');
        setIsSubmitting(true);

        // Create form data using state values
        const formData = new FormData();
        formData.append('your-name', yourname);
        formData.append('last-name', lastname);
        formData.append('your-email', youremail);
        formData.append('your-organization', organization);
        formData.append('your-tele', tel);
        formData.append('your-web', website);
        formData.append('your-message', commentsm);
        formData.append('g-recaptcha-response', recaptchaToken);

        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-json/contact-form-7/v1/contact-forms/5/feedback',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.status === 'mail_sent') {
                setEmailFormClass('wpcf7-form sent');
                setSuccessMessage(response.data.message || 'Thank you! Your message has been sent successfully.');
                // Reset all form fields
                setYourName('');
                setLastName('');
                setEmailid('');
                setOrganization('');
                setTel('');
                setWebsite('');
                setCommentsm('');
                setRecaptchaToken('');
                setErrorMessage('');
                setRecaptchaStatus('');
                // Reset reCAPTCHA
                if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.reset) {
                    window.grecaptcha.reset();
                }
            } else {
                setErrorMessage(response.data.message || 'An error occurred. Please try again.');
                setEmailFormClass('wpcf7-form invalid');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setEmailFormClass('wpcf7-form invalid');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        'w-full rounded-full border-0 bg-white px-5 py-3 text-neutral-900 placeholder:text-neutral-500 shadow-none outline-none ring-0 focus:ring-2 focus:ring-orange-400';
    return (
        <>
            <HeadComponent data={data} />
            <section className={'contactpage secspace'}>
                <div className="container">
                    <div className="top_txt">
                        <h1>Contact Screendollars</h1>
                        <p className='text-lg md:text-2xl font-medium'>We'd love to hear from you</p>
                    </div>
                    <div className="contact_info flex flex-wrap justify-between items-start gap-3">
                        <div className="w-full lg:w-1/2">
                            <form onSubmit={handleSubmit} className={EmailFormClass + ' wpcf7-form mailchimp-ext-0.5.62 init rounded-3xl bg-[#1a1a1a] p-3 md:p-6 lg:p-8 shadow-lg'} id='sc-contact-form'>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div className='cnt_field'>
                                        <span className='wpcf7-form-control-wrap' data-name='your-name'>
                                            <input
                                                type='text'
                                                name='your-name'
                                                value={yourname}
                                                size={40}
                                                className={inputClass + ' wpcf7-form-control wpcf7-text placeholder:capitalize'}
                                                placeholder='First Name'
                                                onChange={(e) => setYourName(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                    <div className='cnt_field'>
                                        <span className='wpcf7-form-control-wrap' data-name='last-name'>
                                            <input type='text' name='last-name' value={lastname} size={40} className={inputClass + ' wpcf7-form-control wpcf7-text'} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                                        </span>
                                    </div>
                                    <div className='cnt_field'>
                                        <span className='wpcf7-form-control-wrap' data-name='your-email'>
                                            <input
                                                type='email'
                                                name='your-email'
                                                value={youremail}
                                                size={40}
                                                className={inputClass + ' wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required'}
                                                placeholder='Email'
                                                onChange={(e) => setEmailid(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                    <div className='cnt_field'>
                                        <span className='wpcf7-form-control-wrap' data-name='your-organization'>
                                            <input
                                                type='text'
                                                name='your-organization'
                                                value={organization}
                                                size={40}
                                                className={inputClass + ' wpcf7-form-control wpcf7-text'}
                                                placeholder='Organization'
                                                onChange={(e) => setOrganization(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                    <div className='cnt_field'>
                                        <span className='wpcf7-form-control-wrap' data-name='your-tele'>
                                            <input type='tel' name='your-tele' value={tel} size={40} className={inputClass + ' wpcf7-form-control wpcf7-text wpcf7-tel'} placeholder='Telephone' onChange={(e) => setTel(e.target.value)} />
                                        </span>
                                    </div>
                                    <div className='cnt_field'>
                                        <span className='wpcf7-form-control-wrap' data-name='your-web'>
                                            <input
                                                type='text'
                                                name='your-web'
                                                value={website}
                                                size={40}
                                                className={inputClass + ' wpcf7-form-control wpcf7-text'}
                                                aria-invalid='false'
                                                placeholder='Website'
                                                onChange={(e) => setWebsite(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className='cnt_field mb-5 commentfield'>
                                    <span className='wpcf7-form-control-wrap' data-name='your-message'>
                                        <textarea
                                            name='your-message'
                                            cols={40}
                                            rows={10}
                                            value={commentsm}
                                            className='wpcf7-form-control wpcf7-textarea max-h-36 mt-3 w-full resize-y rounded-2xl border-0 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-orange-400'
                                            placeholder='Question or Comment'
                                            onChange={(e) => setCommentsm(e.target.value)}></textarea>
                                    </span>
                                </div>
                                {/* reCAPTCHA Container - Hidden for localhost */}
                                {typeof window !== 'undefined' &&
                                    window.location.hostname !== 'localhost' &&
                                    window.location.hostname !== '127.0.0.1' && (
                                        <div className='cnt_field mb-5'>
                                            <div id='recaptcha-container'></div>
                                            {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                                                <div className='text-red-500 text-sm'>
                                                    reCAPTCHA is not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.
                                                </div>
                                            )}
                                            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !isRecaptchaLoaded && (
                                                <div className='text-gray-100 text-sm'>
                                                    Loading reCAPTCHA...
                                                </div>
                                            )}
                                            {recaptchaStatus === 'loading' && (
                                                <div className='text-yellow-500 text-sm flex items-center'>
                                                    <span className='animate-spin mr-2'>🔄</span>
                                                    Verifying reCAPTCHA...
                                                </div>
                                            )}
                                            {recaptchaStatus === 'verified' && (
                                                <div className='text-green-500 text-sm flex items-center'>
                                                    <span className='mr-2'>✅</span>
                                                    reCAPTCHA verified successfully!
                                                </div>
                                            )}
                                            {recaptchaStatus === 'failed' && (
                                                <div className='text-red-500 text-sm flex items-center'>
                                                    <span className='mr-2'>❌</span>
                                                    reCAPTCHA verification failed. Please try again.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className='cnt_field mt-6 flex flex-col items-center gap-3 md:mt-8'>

                                    <button type='submit' className='w-[55%] min-w-[200px] rounded-full bg-[#f7a508] px-8 py-3 font-bold text-black transition hover:bg-orange-400 disabled:opacity-60 disabled:text-white' disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                    {/* {isSubmitting && <span className='wpcf7-spinner'></span>} */}
                                </div>
                                {errorMessage && (
                                    <div className='wpcf7-error_message'>
                                        <p className='wpcf7-not-valid-tip error text-red-500 text-center mt-2'>{errorMessage}</p>
                                    </div>
                                )}
                                {successMessage && (
                                    <div className='wpcf7-success_message'>
                                        <p className='wpcf7-not-valid-tip success text-green-500 text-center mt-2'>{successMessage}</p>
                                    </div>
                                )}
                            </form>

                            <div
                                className='sd_contact_message hide'
                                dangerouslySetInnerHTML={{
                                    __html: ContactpageData.content_message || '',
                                }}></div>

                        </div>
                        <div className="contact_media w-full lg:w-[calc(50%-1.5rem)]">
                            <figure className='w-full mb-3'>
                                <a href="tel:+19784944150" target="_blank"><img src={contactmedia.src} alt="contact_media" /></a>
                            </figure>
                            <div className="flex flex-wrap gap-3 pt-1 md:gap-4">

                                <a
                                    href="tel:+19784944150" target="_blank"
                                    className="group inline-flex items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black shadow-sm transition-all duration-100 ease-out hover:-translate-y-0.5 hover:border-neutral-800 hover:bg-neutral-50 hover:shadow-md hover:shadow-neutral-900/10 active:translate-y-0 active:shadow-sm glightboxmsg">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-black text-white transition-all ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>

                                    </span>
                                    <span className="pr-3 inline-block ">+1 978-494-4150</span>
                                </a>
                                <a
                                    href="mailto:contactus@screendollars.com" target="_blank"
                                    className="group inline-flex items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black shadow-sm transition-all duration-100 ease-out hover:-translate-y-0.5 hover:border-neutral-800 hover:bg-neutral-50 hover:shadow-md hover:shadow-neutral-900/10 active:translate-y-0 active:shadow-sm glightboxinfo">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-black text-white transition-all ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                    </span>
                                    <span className="pr-3 inline-block "> contactus@screendollars.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;

