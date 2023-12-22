import Pagetitle from '@/components/Products/Pagetitle';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import faqexpaet from '@/public/faqexpart.png';
import LayoutPro from '@/components/Layout/LayoutPro';
import Paywall from '@/components/Products/Paywall';

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
          {FAQs_D.question_section && (
            <div className='stillfaq text-center'>
              <h3>{FAQs_D.question_section.title}</h3>
              {FAQs_D.question_section.faq_image && (
                <div className='faqexpart'>
                  <Image src={FAQs_D.question_section.faq_image} alt='' width={187} height={85} />
                </div>
              )}
              {FAQs_D.question_section.content && <div className='' dangerouslySetInnerHTML={{ __html: FAQs_D.question_section.content }}></div>}

              {link !== 'pro' && link !== 'default' ? (
                <div className='stillfaqcta'>
                  <Link href={FAQs_D.free_trial.link} className='btn uppercase'>
                    {FAQs_D.free_trial.text}
                  </Link>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export const Faqitems = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
      {isOpen && <div className='faqinfo' dangerouslySetInnerHTML={{ __html: answer }}></div>}
    </div>
  );
};

//export default Faq

Faq.getLayout = function (page) {
  return <LayoutPro>{page}</LayoutPro>;
};
