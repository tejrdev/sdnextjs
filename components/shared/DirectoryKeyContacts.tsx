'use client';

import Image from 'next/image';
import userproico from '@/public/images/userproico.svg';

export type DirectoryKeyContact = {
    name?: string;
    contact_title?: string;
    contact_email?: string;
    contact_no?: string;
};

type DirectoryKeyContactsProps = {
    contacts?: DirectoryKeyContact[];
    popupId?: string;
    showTrigger?: boolean;
    triggerClassName?: string;
};

const DirectoryKeyContacts = ({
    contacts = [],
    popupId = 'disc_keycontact',
    showTrigger = false,
    triggerClassName = 'termtxt printdochide text-black hover:underline glightboxinfo',
}: DirectoryKeyContactsProps) => {
    if (!contacts.length) return null;

    return (
        <>
            <div className="disc_keycontact bg-white mfp-hide border-2 border-gold rounded-md relative p-5" id={popupId}>
                <button className="myglightclose w-8 h-8 top-[1px] right-[1px] absolute text-gray-700 rounded-md">✖</button>
                <label className="block mb-[10px] pb-[10px] border-b border-gray-400">
                    <Image src={userproico} alt="" width={20} height={20} />
                    Key Contacts{' '}
                </label>
                <ul className="togletxt df fww">
                    {contacts.map((item, index) => (
                        <li key={index}>
                            {item.name} <br />
                            {item.contact_title ? (
                                <>
                                    {item.contact_title} <br />
                                </>
                            ) : null}
                            {item.contact_email ? (
                                <a href={`mailto:${item.contact_email}`}>
                                    {item.contact_email}
                                    <br />
                                </a>
                            ) : null}
                            {item.contact_no || ''}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DirectoryKeyContacts;
