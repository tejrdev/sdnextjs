import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaTag } from "react-icons/fa";
import { motion } from "motion/react"
import { FadeinUp } from '@/components/Anim/FadeinUp';
import _1844Ent from '../../public/images/Logo-1844-e1622649367511.png';

interface Cardinfo {
  cardinfo?: {
    'label_link'?: string;
    'title'?: string;
    'img'?: string;
    'sub_title'?: string;
    'url'?: string;
    'label'?: string;
    'link'?: string;
  };
  nobg?: boolean;
}

export const Logocard = ({ cardinfo, nobg }: Cardinfo) => {
  let link = '#';
  if (cardinfo?.url) {
    link = cardinfo.url;
  } else if (cardinfo?.label_link) {
    link = cardinfo.label_link;
  } else if (cardinfo?.link) {
    link = cardinfo.link;
  }
  return (
    <>
      {cardinfo && (
        <div className={`card flex flex-wrap items-start rounded-md p-3 w-80  ${nobg ? 'border border-gray-400' : 'bg-gray-100'}`}>
          {(cardinfo.label === 'Theatre' || cardinfo.sub_title === 'Theatre') ?
            <figure className='w-24 relative flex justify-center items-center border border-gray-400 min-h-14 rounded-lg'>
              <img src={cardinfo?.img ?? _1844Ent.src} alt='' loading='lazy' className='max-h-14 objimg rounded-lg' />
            </figure> :
            <figure className='w-24 px-2 py-1 flex justify-center items-center border border-gray-400 min-h-16 rounded-lg'>
              <img src={cardinfo?.img ?? _1844Ent.src} alt='' loading='lazy' className='max-h-14' />
            </figure>
          }
          <div className='cardinfo recentcard pl-3 md:pl-5'>
            <h5>
              <Link href={link}>{cardinfo.title}</Link>
            </h5>
            <p className='m-0'> <FaTag className='inline-block text-gray-600 rotate-90 text-xs mb-[2px] mr-1' />
              {cardinfo.label ? cardinfo.label : cardinfo.sub_title}</p>
          </div>
        </div>
      )}
    </>
  );
};

const Listingsearch = ({ data }: any) => {
  const [searchData, setSearchData] = useState([]);
  const [searchDataLoaded, setSearchDataLoaded] = useState(false);
  const SearchDirectory = (e: any) => {
    e.preventDefault();
    const search = e.target[0].value;
    if (search !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_SD_API + '/directory/directory_search.php?s=' + search + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
        .then((res) => {
          setSearchData(res.data.search);
          setSearchDataLoaded(true);
        })
        .catch((err) => console.log(err));
    } else {
      setSearchData([]);
      setSearchDataLoaded(false);
    }
  };
  return (
    <motion.section
      variants={FadeinUp}
      initial="init"
      whileInView="anim"
      viewport={{ once: true }}
      className='srchlisting secspace' id='srchlisting'>
      <div className='container'>
        <div className='top_txt text-center'>
          <h2>{data.title}</h2>
          <p className='max-w-3xl mx-auto'>{data.content}</p>
          <form onSubmit={SearchDirectory}>
            <div className='formgroup flex max-w-lg mx-auto relative'>
              <input type='text' className='pr-12' placeholder='Enter Distributor, Exhibitor, Theatre, Vendor or Film Festival' />
              <button type='submit' className='-ml-2 border border-gray-600 bg-gold w-12'>
                <i className='far fa-search'></i>
              </button>
            </div>
          </form>
        </div>
        {searchDataLoaded && <div className='srchresult flex-wrap gap-3 mt-5 justify-center flex '>
          {searchData.length > 0 ? searchData.map((item, index) => <Logocard cardinfo={item} key={index} />) : <p className='text-center w-full'>No results found</p>}
        </div>}
      </div>
    </motion.section>
  );
};

export default Listingsearch;
