import axios, { AxiosRequestConfig } from 'axios';
import Script from 'next/script';
import { useCallback, useEffect, useState, FormEvent } from 'react';

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

type ContactFromData = {
  title?: string;
  contact_content_img?: string;
};

type RecaptchaStatus = '' | 'loading' | 'verified' | 'failed';

const RECAPTCHA_CONTAINER_ID = 'advertise-recaptcha-container';

export default function ContactFrom({ data }: { data: ContactFromData }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [telephone, setTelephone] = useState('');
  const [website, setWebsite] = useState('');
  const [comments, setComments] = useState('');

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

      const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

      const axiosConfig: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };

      if (isLocalhost) axiosConfig.baseURL = 'http://localhost:3000';

      const response = await axios.post('/api/verify-recaptcha', { token }, axiosConfig);
      if (response.data?.success) setRecaptchaStatus('verified');
      else setRecaptchaStatus('failed');
      return response.data?.success;
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

    const loadRecaptcha = () => {
      const container = document.getElementById(RECAPTCHA_CONTAINER_ID);
      if (!container) return;
      container.innerHTML = '';

      if (window.grecaptcha?.render) {
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

    const check = () => {
      if (window.grecaptcha && typeof window.grecaptcha.render === 'function') loadRecaptcha();
      else setTimeout(check, 100);
    };

    setTimeout(check, 500);
  }, [onRecaptchaChange]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage('');
    setIsSubmitting(true);

    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    try {
      if (!isLocalhost) {
        if (!recaptchaToken) {
          setSubmitMessage('Please complete the reCAPTCHA verification.');
          return;
        }
        const ok = await verifyRecaptchaToken(recaptchaToken);
        if (!ok) {
          setSubmitMessage('reCAPTCHA verification failed. Please try again.');
          window.grecaptcha?.reset?.();
          setRecaptchaToken('');
          return;
        }
      }

      const formData = new FormData();
      formData.append('key-name', name);
      formData.append('key-lastname', lastname);
      formData.append('key-email', email);
      formData.append('key-Organization', organization);
      formData.append('key-Telephone', telephone);
      formData.append('key-Website', website);
      formData.append('textarea-892', comments);
      if (!isLocalhost && recaptchaToken) formData.append('g-recaptcha-response', recaptchaToken);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/contact-form-7/v1/contact-forms/65283/feedback`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data?.status === 'mail_sent') {
        setSubmitMessage(response.data?.message || 'Thank you! Your message has been sent successfully.');
        setName('');
        setLastname('');
        setEmail('');
        setOrganization('');
        setTelephone('');
        setWebsite('');
        setComments('');
        setRecaptchaToken('');
        setRecaptchaStatus('');
        window.grecaptcha?.reset?.();
      } else {
        setSubmitMessage(response.data?.message || 'Something went wrong. Please try again.');
      }
    } catch (error: any) {
      console.error('Advertise contact submission error:', error);
      setSubmitMessage(error.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactImg = data.contact_content_img;

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onError={() => setSubmitMessage('Failed to load reCAPTCHA. Please check your internet connection.')}
      />

      <section className="addus_contact secspace" id="adscontact">
        <div className="container">
          <div className="addcontbox df fww">
            <div className="addcnt">
              {data.title?.length ? (
                <div className="top_txt">
                  <h3>{data.title}</h3>
                </div>
              ) : null}

              <form className="adscontact_form" onSubmit={handleSubmit} id="sc-advs-form">
                <div className="fromgroup">
                  <input
                    type="text"
                    name="key-name"
                    value={name}
                    size={40}
                    placeholder="First Name*"
                    onChange={(ev) => setName(ev.target.value)}
                    required
                  />
                </div>

                <div className="fromgroup">
                  <input
                    type="text"
                    name="key-lastname"
                    value={lastname}
                    size={40}
                    placeholder="Last Name"
                    onChange={(ev) => setLastname(ev.target.value)}
                  />
                </div>

                <div className="fromgroup">
                  <input
                    type="email"
                    name="key-email"
                    value={email}
                    size={40}
                    placeholder="Email*"
                    onChange={(ev) => setEmail(ev.target.value)}
                    required
                  />
                </div>

                <div className="fromgroup">
                  <input
                    type="text"
                    name="key-Organization"
                    value={organization}
                    size={40}
                    placeholder="Organization"
                    onChange={(ev) => setOrganization(ev.target.value)}
                  />
                </div>

                <div className="fromgroup">
                  <input
                    type="text"
                    name="key-Telephone"
                    value={telephone}
                    size={40}
                    placeholder="Telephone"
                    onChange={(ev) => setTelephone(ev.target.value)}
                  />
                </div>

                <div className="fromgroup">
                  <input
                    type="text"
                    name="key-Website"
                    value={website}
                    size={40}
                    placeholder="Website"
                    onChange={(ev) => setWebsite(ev.target.value)}
                  />
                </div>

                <div className="fromgroup">
                  <textarea
                    name="textarea-892"
                    cols={40}
                    value={comments}
                    rows={10}
                    placeholder="Question or Comment"
                    onChange={(ev) => setComments(ev.target.value)}
                  />
                </div>

                {showRecaptchaUi && (
                  <div className="cnt_field mb-5">
                    <div id={RECAPTCHA_CONTAINER_ID} />
                    {!isRecaptchaLoaded && <div className="text-blue-600 text-sm mt-2">Loading reCAPTCHA...</div>}
                    {recaptchaStatus === 'loading' && <div className="text-yellow-600 text-sm mt-2">Verifying reCAPTCHA...</div>}
                    {recaptchaStatus === 'verified' && (
                      <div className="text-green-700 text-sm mt-2">reCAPTCHA verified successfully!</div>
                    )}
                    {recaptchaStatus === 'failed' && (
                      <div className="text-red-500 text-sm mt-2">reCAPTCHA verification failed. Please try again.</div>
                    )}
                  </div>
                )}

                <div className="submitbtn">
                  <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>

                {submitMessage ? <div className="adscontact_message">{submitMessage}</div> : null}
              </form>
            </div>

            <div className="abtmovie_mediabox">
              <div className="abtinfo_slider-img">
                <div className="abtinfo_sliditem">
                  {contactImg?.length ? (
                    <div className="abt_infoslidimg">
                      <img src={contactImg} alt="contact img" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

