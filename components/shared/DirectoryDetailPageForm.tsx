'use client';

import { useEffect, useId, useRef, useState } from 'react';
import axios from 'axios';
import router from 'next/router';

const MESSAGE_BOX_SELECTOR = '[data-sd-form-message]';

export type DirectoryDetailPageFormProps = {
    recipientTitle: string;
    emailDistributor?: string;
    sendMessageOrg?: string;
};

const DirectoryDetailPageForm = ({
    recipientTitle,
    emailDistributor = '',
    sendMessageOrg = '',
}: DirectoryDetailPageFormProps) => {
    const instanceId = useId().replace(/:/g, '');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [organization, setOrganization] = useState('');
    const [telephone, setTelephone] = useState('');
    const [titleField, setTitleField] = useState('');
    const [comments, setComments] = useState('');
    const [emailFormClass, setEmailFormClass] = useState('wpcf7-form');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateFormMessageBox = (formEl: HTMLFormElement, message: string, tone: 'success' | 'error') => {
        const messageEl = formEl.querySelector(MESSAGE_BOX_SELECTOR);
        if (!(messageEl instanceof HTMLElement)) return;
        messageEl.textContent = message;
        messageEl.classList.remove('hidden', 'border-green-600/40', 'bg-green-50', 'text-green-900', 'border-red-600/40', 'bg-red-50', 'text-red-900');
        if (tone === 'success') {
            messageEl.classList.add('border-green-600/40', 'bg-green-50', 'text-green-900');
        } else {
            messageEl.classList.add('border-red-600/40', 'bg-red-50', 'text-red-900');
        }
    };

    const clearFormMessageBox = (formEl: HTMLFormElement) => {
        const messageEl = formEl.querySelector(MESSAGE_BOX_SELECTOR);
        if (!(messageEl instanceof HTMLElement)) return;
        messageEl.textContent = '';
        messageEl.classList.add('hidden');
        messageEl.classList.remove('border-green-600/40', 'bg-green-50', 'text-green-900', 'border-red-600/40', 'bg-red-50', 'text-red-900');
    };

    const resetFormFields = () => {
        setName('');
        setEmail('');
        setSubject('');
        setOrganization('');
        setTelephone('');
        setTitleField('');
        setComments('');
    };

    const processSubmit = async (formEl: HTMLFormElement) => {
        clearFormMessageBox(formEl);
        setIsSubmitting(true);
        setEmailFormClass('wpcf7-form');

        try {
            const form_data = new FormData(formEl);
            form_data.set('page-url', process.env.NEXT_PUBLIC_FRONTEND_URL + router.asPath);
            form_data.set('page-title', recipientTitle);
            form_data.set('email-distributor', emailDistributor);
            form_data.set('send_message_org', sendMessageOrg);

            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-json/contact-form-7/v1/contact-forms/1625/feedback', form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });


            if (response.data.status === 'mail_sent') {
                setEmailFormClass('wpcf7-form sent');
                const message = `Thank you! Your message has been sent to ${recipientTitle}.`;
                updateFormMessageBox(formEl, message, 'success');
                formEl.reset();
                resetFormFields();
            } else if (response.data.status === 'validation_failed' && response.data.invalid_fields?.length) {
                setEmailFormClass('wpcf7-form invalid');
                const detail = response.data.invalid_fields.map((f) => f.message).join(' ');
                const message = response.data.message ? `${response.data.message} ${detail}` : detail;
                updateFormMessageBox(formEl, message, 'error');
            } else {
                setEmailFormClass('wpcf7-form invalid');
                const message = response.data.message || 'Something went wrong. Please try again.';
                updateFormMessageBox(formEl, message, 'error');
            }
        } catch (error: unknown) {
            console.error('Form submission error:', error);
            setEmailFormClass('wpcf7-form invalid');
            const err = error as { response?: { data?: { message?: string } } };
            const message = err.response?.data?.message || 'Failed to submit. Please try again.';
            updateFormMessageBox(formEl, message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const processSubmitRef = useRef<(formEl: HTMLFormElement) => Promise<void>>(processSubmit);
    processSubmitRef.current = processSubmit;
    /** GLightbox moves inline content outside React's root, so React's onSubmit never runs. Capture at document. */
    useEffect(() => {
        const handler = (e: Event) => {
            const el = e.target;
            if (!(el instanceof HTMLFormElement)) return;
            if (el.getAttribute('data-sd-directory-form') !== instanceId) return;
            e.preventDefault();
            e.stopPropagation();
            void processSubmitRef.current(el);
        };
        document.addEventListener('submit', handler, true);
        return () => document.removeEventListener('submit', handler, true);
    }, [instanceId]);

    return (
        <div id='directory-detail-page-form' className="relative  mfp-hide formpopbox">
            <div className="formpop_info">
                <div className="fpinfo_head">
                    <h4>
                        Send Message to{' '}
                        <span>{recipientTitle}</span>
                    </h4>
                    <button className="myglightclose w-8 h-8 top-[-3px] right-0 absolute text-gray-700 rounded-md">
                        ✖
                    </button>
                </div>
                <div className="fp_body df fww">
                    <div className="fp_sendmsgform">
                        <div className="fp_form">
                            <div role="form" className="wpcf7" lang="en-US" dir="ltr">
                                <div className="screen-reader-response">
                                    <p role="status" aria-live="polite" aria-atomic="true"></p>
                                    <ul></ul>
                                </div>
                                <form
                                    className={emailFormClass}
                                    id={instanceId}
                                    lang="en-US"
                                    dir="ltr"
                                    data-sd-directory-form={instanceId}>
                                    <div className="fm_formrow">
                                        <div className="fromgroup">
                                            <span className="wpcf7-form-control-wrap" data-name="message-name">
                                                <input
                                                    type="text"
                                                    name="message-name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    size={40}
                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                                    placeholder="Name"
                                                    required
                                                />
                                            </span>
                                        </div>
                                        <div className="fromgroup">
                                            <span className="wpcf7-form-control-wrap" data-name="message-email">
                                                <input
                                                    type="email"
                                                    name="message-email"
                                                    value={email}
                                                    size={40}
                                                    className="wpcf7-text wpcf7-email"
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </span>
                                        </div>

                                        <div className="fromgroup state_selectbox">
                                            <span className="wpcf7-form-control-wrap" data-name="text-state">
                                                <input
                                                    type="text"
                                                    name="message-subject"
                                                    value={subject}
                                                    size={40}
                                                    className="wpcf7-text wpcf7-subject"
                                                    placeholder="Subject"
                                                    onChange={(e) => setSubject(e.target.value)}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="fm_formrow last">
                                        <div className="fromgroup">
                                            <span className="wpcf7-form-control-wrap" data-name="message-phone">
                                                <input
                                                    type="text"
                                                    name="message-phone"
                                                    value={telephone}
                                                    size={40}
                                                    className="wpcf7-form-control wpcf7-text"
                                                    aria-invalid="false"
                                                    placeholder="Phone"
                                                    onChange={(e) => setTelephone(e.target.value)}
                                                />
                                            </span>
                                        </div>
                                        <div className="fromgroup">
                                            <span className="wpcf7-form-control-wrap" data-name="message-title">
                                                <input
                                                    type="text"
                                                    name="message-title"
                                                    value={titleField}
                                                    size={40}
                                                    className="wpcf7-form-control wpcf7-text"
                                                    aria-invalid="false"
                                                    placeholder="Title"
                                                    onChange={(e) => setTitleField(e.target.value)}
                                                />
                                            </span>
                                        </div>
                                        <div className="fromgroup">
                                            <span className="wpcf7-form-control-wrap" data-name="message-Organization">
                                                <input
                                                    type="text"
                                                    name="message-Organization"
                                                    value={organization}
                                                    size={40}
                                                    className="wpcf7-form-control wpcf7-text"
                                                    aria-invalid="false"
                                                    placeholder="Company or Organization"
                                                    onChange={(e) => setOrganization(e.target.value)}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="fm_formrow full">
                                        <div className="fromgroup">
                                            <span className="wpcf7-form-control-wrap" data-name="message-message">
                                                <textarea
                                                    name="message-message"
                                                    value={comments}
                                                    cols={40}
                                                    rows={10}
                                                    className="wpcf7-form-control wpcf7-textarea"
                                                    placeholder="Message, Questions or Comments"
                                                    onChange={(e) => setComments(e.target.value)}
                                                    required
                                                />
                                            </span>
                                        </div>

                                        <div className="submitbtn text-center mfp-prevent-close">
                                            <input
                                                type="submit"
                                                value="send message"
                                                disabled={isSubmitting}
                                                className="wpcf7-form-control wpcf7-submit mfp-prevent-close disabled:opacity-50 disabled:cursor-not-allowed"
                                            />
                                            <span
                                                className="wpcf7-spinner"
                                                style={{ visibility: isSubmitting ? 'visible' : 'hidden' }}
                                            />
                                        </div>
                                        <div
                                            data-sd-form-message
                                            role="alert"
                                            aria-live="polite"
                                            className="hidden mb-4 rounded-md border px-3 py-2.5 text-sm text-center"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectoryDetailPageForm;
