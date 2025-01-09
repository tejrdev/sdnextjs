import Pagetitle from '@/components/Products/Pagetitle';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import faqexpaet from '@/public/faqexpart.png';
import LayoutPro from '@/components/Layout/LayoutPro';
import Paywall from '@/components/Products/Paywall';
import Stillquery from '@/components/Faq/Stillquery';

export async function getStaticProps(context) {
  const { params } = context;
  // static data
  let FAQs_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/faq.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  FAQs_data = await FAQs_data.json();
  //console.log(FAQs_data);

  return {
    props: { FAQs_data },
    revalidate: 10, // In seconds
  };

  //return { props: { data } };
}

export default function Faq({ FAQs_data }) {
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);
  /* console.log(FAQs_data) */
  let FAQs_D = FAQs_data;
  return (
    <div className='profaq'>
      <Pagetitle heading={FAQs_D.faq_page_title} />
      {link !== 'pro' ? ( // && link !== 'default'
        <div className='pagepaywall pvr'>
          <Paywall />
        </div>
      ) : (
        <div className='container'>
          <div className='faqpagebox'>
            {FAQs_D.faq_list && (
              <>
                {FAQs_D.faq_list.map((items, index) => {
                  return (
                    // <p>
                    // {items.title}
                    // <br/>
                    // {items.content}
                    // </p>
                    <Faqitems key={index} question={items.title} answer={items.content} />
                  );
                })}
              </>
            )}
          </div>
          <Stillquery />
        </div>
      )}
    </div>
  );
}
export const Faqitems = ({ question, answer, children, accopen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    accopen && accopen();
  };
  return (
    <div className='faqitem'>
      <div className='faqhead' onClick={handleToggle}>
        <h3>
          {question}{' '}
          <span className={`icon ${isOpen ? 'open' : ''}`}>
            <i className='fas fa-caret-down'></i>
          </span>
        </h3>
      </div>
      {isOpen && <div className='faqinfo'>
        <div dangerouslySetInnerHTML={{ __html: answer }}></div>
        {children && <div className='accinfo'>{children}</div>}
      </div>}
    </div>
  );
};

//export default Faq

Faq.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
