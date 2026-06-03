import { ChangeEvent, FormEvent, useState } from 'react';

/** Same-origin Next.js API route; forwards server-side to CONTACT_API_URL (default example.com). */
const CONTACT_SUBMIT_PATH = '/api/contact';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    telephone: string;
    website: string;
    message: string;
};

const initial: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    telephone: '',
    website: '',
    message: '',
};



const ContactForm = () => {
    const [values, setValues] = useState<FormState>(initial);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const update =
        (field: keyof FormState) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setValues((v) => ({ ...v, [field]: e.target.value }));
            };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage(null);

        const payload = {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email: values.email.trim(),
            organization: values.organization.trim(),
            telephone: values.telephone.trim(),
            website: values.website.trim(),
            questionOrComment: values.message.trim(),
        };

        try {
            const res = await fetch(CONTACT_SUBMIT_PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                setStatus('error');
                let detail = `Request failed (${res.status})`;
                try {
                    const errJson = await res.json();
                    if (errJson && typeof errJson.error === 'string') {
                        detail = errJson.error;
                    }
                } catch {
                    /* ignore */
                }
                setErrorMessage(detail);
                return;
            }

            setStatus('success');
            setValues(initial);
        } catch {
            setStatus('error');
            setErrorMessage('Could not reach the server. Please try again.');
        }
    }
    const inputClass =
        'w-full rounded-full border-0 bg-white px-5 py-3 text-neutral-900 placeholder:text-neutral-500 shadow-none outline-none ring-0 focus:ring-2 focus:ring-orange-400';
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl rounded-3xl bg-[#1a1a1a] p-3 md:p-6 lg:p-8 shadow-lg"
        >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First Name"
                    className={inputClass}
                    value={values.firstName}
                    onChange={update('firstName')}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    className={inputClass}
                    value={values.lastName}
                    onChange={update('lastName')}
                    required
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    className={inputClass}
                    value={values.email}
                    onChange={update('email')}
                    required
                />
                <input
                    type="text"
                    name="organization"
                    autoComplete="organization"
                    placeholder="Organization"
                    className={inputClass}
                    value={values.organization}
                    onChange={update('organization')}
                />
                <input
                    type="tel"
                    name="telephone"
                    autoComplete="tel"
                    placeholder="Telephone"
                    className={inputClass}
                    value={values.telephone}
                    onChange={update('telephone')}
                />
                <input
                    type="text"
                    name="website"
                    autoComplete="url"
                    placeholder="Website"
                    className={inputClass}
                    value={values.website}
                    onChange={update('website')}
                />
            </div>

            <textarea
                name="message"
                placeholder="Question or Comment"
                rows={4}
                className="mt-3 w-full resize-y rounded-2xl border-0 bg-white px-5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-orange-400"
                value={values.message}
                onChange={update('message')}
                required
            />

            <div className="mt-6 flex flex-col items-center gap-3 md:mt-8">
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-[55%] min-w-[200px] rounded-full bg-[#f7a508] px-8 py-3 font-bold text-black transition hover:bg-orange-400 disabled:opacity-60"
                >
                    {status === 'submitting' ? 'Submitting…' : 'Submit'}
                </button>
                {status === 'success' && (
                    <p className="text-sm text-green-400">Thanks — your message was sent.</p>
                )}
                {status === 'error' && errorMessage && (
                    <p className="text-center text-sm text-red-400">{errorMessage}</p>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
