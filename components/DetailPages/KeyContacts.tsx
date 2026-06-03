import React, { useState, useEffect } from 'react';
import userproico from '@/public/images/userproico.svg';
import Image from 'next/image';
import 'glightbox/dist/css/glightbox.css';
interface KeyContact {
  name: string;
  contact_title?: string;
  contact_email?: string;
  contact_no?: string;
}

interface KeyContactsData {
  key_contacts: KeyContact[];
}

interface KeyContactsProps {
  data: KeyContactsData;
}

const KeyContacts: React.FC<KeyContactsProps> = ({ data }) => {
  useEffect(() => {
    let lightbox: { destroy: () => void } | null = null;

    import('glightbox').then((mod) => {
      const GLightbox = mod.default;
      lightbox = GLightbox({
        selector: '.glightboxinfo, .glightboxmsg',
        skin: 'round',
        closeButton: false,
        height: 'auto',
        width: '700px',
      });
      document.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && e.target.closest('.myglightclose')) {
          (lightbox as any).close();
        }
      });
    });

    return () => {
      lightbox?.destroy();
    };
  }, [data]);

  if (!data?.key_contacts || data.key_contacts.length === 0) {
    return null;
  }

  return (
    <>
      <div className='disc_keycontact  bg-white mfp-hide border-2 border-gold rounded-md relative p-5' mfp-align-top='' id='disc_keycontact'>
        <button className="myglightclose w-8 h-8 top-[1px] right-[1px] absolute text-gray-700 rounded-md">✖</button>
        <label htmlFor='' className='block mb-[10px] pb-[10px] border-b border-gray-400'>
          <Image src={userproico} alt='' width={20} height={20} />
          Key Contacts{' '}
        </label>
        <ul className='togletxt df fww'>
          {data?.key_contacts.map((item, index) => {
            return (
              <li key={index}>
                <span className='font-medium'>{item.name}</span> <br />
                {item.contact_title ? (
                  <>
                    {' '}
                    {item.contact_title} <br />
                  </>
                ) : (
                  ''
                )}
                {item.contact_email ? (
                  <a href={'mailto:' + item.contact_email}>
                    {' '}
                    {item.contact_email} <br />{' '}
                  </a>
                ) : (
                  ''
                )}
                {item.contact_no ? item.contact_no : ''}
              </li>
            );
          })}
        </ul>
      </div>
      <a className='termtxt printdochide text-black hover:underline glightboxinfo' href='#disc_keycontact' data-effect='mfp-move-from-top'>
        <Image src={userproico} alt='Key Contacts' width={20} height={20} /> Key Contacts
      </a>
    </>
  );
};

export default KeyContacts;
