import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const Stillquery = ({ nopro }) => {
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  const [fAQs_datastill, setFAQs_datastill] = useState('');
  useEffect(() => {
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, []);
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/faq.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setFAQs_datastill(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const FAQs_data = fAQs_datastill;
  return (
    <>
      {FAQs_data.question_section && (
        <div className={`stillfaq text-center  ${nopro ? 'bg-gray-100' : 'bg-gold-yellow'}`}>
          <h3>{FAQs_data.question_section.title}</h3>
          {/* {FAQs_data.question_section.faq_image && (
                     <div className='faqexpart'>
                        <Image src={FAQs_data.question_section.faq_image} alt='' width={187} height={85} />
                     </div>
                  )} */}
          {FAQs_data.question_section.content && <div className='' dangerouslySetInnerHTML={{ __html: FAQs_data.question_section.content }}></div>}

          {link !== 'pro' && link !== 'default' ? (
            <div className='stillfaqcta'>
              <Link href={FAQs_data.free_trial.link} className='btn uppercase'>
                {FAQs_data.free_trial.text ?? 'start your free trial'}
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  );
};

export default Stillquery;
