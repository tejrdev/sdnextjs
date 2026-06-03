import { useState, FormEvent, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Script from 'next/script';
import { motion } from 'motion/react';
import { FadeinUp } from '@/components/Anim/FadeinUp';
import { JSONData } from '@/components/shared/JSONData';
import Image from 'next/image';
import SubscriberImage from '@/public/images/sbscribcar.png';

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

const HOME_SUBSCRIBER_RECAPTCHA_ID = 'home-subscriber-recaptcha-container';

export type SubscriberProps = {
    title?: string;
    content?: string;
};

const Subscriber = ({ title = '', content = '' }: SubscriberProps) => {
    const [email, setEmail] = useState('');
    const [addBoxOfficeForecasts, setAddBoxOfficeForecasts] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
    const [recaptchaStatus, setRecaptchaStatus] = useState<RecaptchaStatus>('');
    const [showRecaptchaUi, setShowRecaptchaUi] = useState(false);

    //const displayTitle = title ? title : JSONData.home_newsletter.title;

    const onRecaptchaChange = useCallback((token: string) => {
        setRecaptchaToken(token);
    }, []);

    const verifyRecaptchaToken = async (token: string): Promise<boolean> => {
        try {
            setRecaptchaStatus('loading');

            const isLocalhost =
                typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
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
            const container = document.getElementById(HOME_SUBSCRIBER_RECAPTCHA_ID);
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
            const formData = new FormData();
            formData.append('your-email', email);
            if (addBoxOfficeForecasts) {
                formData.append('wed_fri_newsletter', '1');
            }
            if (!isLocalhost && recaptchaToken) {
                formData.append('g-recaptcha-response', recaptchaToken);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/contact-form-7/v1/contact-forms/946/feedback`,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.status === 'mail_sent') {
                setSubmitMessage(response.data.message || 'Thank you for subscribing!');
                setEmail('');
                setAddBoxOfficeForecasts(false);
                setRecaptchaToken('');
                setRecaptchaStatus('');
                if (!isLocalhost && typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.reset) {
                    window.grecaptcha.reset();
                }
            } else {
                setSubmitMessage(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error: unknown) {
            console.error('Form submission error:', error);
            const err = error as { response?: { data?: { message?: string } } };
            setSubmitMessage(err.response?.data?.message || 'Failed to submit. Please try again.');
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
            <section className="subscribenews sm:py-8 py-5">
                <div className="container">
                    <div className="bg-white rounded-lg overflow-hidden flex flex-col sm:flex-row shadow-md">
                        <div className="w-full sm:w-2/5 flex-shrink-0 border-2 border-stone-900 rounded-l-lg">
                            <Image
                                src={SubscriberImage}
                                alt="Newsletter"
                                width={600}
                                height={400}
                                className="w-full h-full object-cover rounded-l-lg sm:rounded-r-none rounded-t-lg sm:rounded-t-none"
                            />
                        </div>
                        <div className="w-full sm:w-3/5 bg-stone-900 p-6 sm:p-8 flex flex-col justify-center">
                            <div className="newsletter_content max-w-[416px] mx-auto">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                    Stay ahead of the curve
                                </h3>
                                <span className="text-neutral-400 sm:text-lg text-base mb-6">
                                    {content ? (
                                        <strong dangerouslySetInnerHTML={{ __html: content }} />
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: JSONData.home_newsletter.content }} />
                                    )}
                                </span>
                                <form className="newsltr_subscribe_form" onSubmit={handleSubmit}>
                                    <div className="flex flex-col">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="newsltr_subscribe_form_input"
                                            required
                                        />
                                    </div>
                                    <div className="othersubscribes">
                                        <input
                                            type="checkbox"
                                            id="otehrsub"
                                            name="otehrsub"
                                            checked={addBoxOfficeForecasts}
                                            onChange={(ev) => setAddBoxOfficeForecasts(ev.target.checked)}
                                            disabled={isSubmitting}
                                        />
                                        <label htmlFor="otehrsub" className="text-white">
                                            Add Box Office Forecasts (Wednesdays and Friday)
                                        </label>
                                    </div>
                                    {showRecaptchaUi && (
                                        <div className="mt-4">
                                            <div id={HOME_SUBSCRIBER_RECAPTCHA_ID} />
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
                                        <p
                                            className={`mt-2 text-sm ${submitMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                            {submitMessage}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="orangebtn min-w-40 mt-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isSubmitting ? 'Submitting...' : 'Subscribe'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Subscriber;
