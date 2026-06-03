import { FaRegBookmark } from 'react-icons/fa6';
import { FaBookmark } from 'react-icons/fa6';
import React, { useState } from 'react';
import Link from 'next/link';

const Aritem = ({ figpadding = 'pb-[62%] xsm:pb-[52%] lg:pb-[48%]', newstag = false, item }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => setIsActive((prevState) => !prevState);

  const truncateContent = (content: string, maxLength: number = 250) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };

  return (
    <div className='card sm:basis-[calc(50%-12px)] mb-2'>
      <Link href={item.artical_link ? item.artical_link : item.link ? item.link : item.links} className='text-black hover:text-black'>
        <figure className={'pvr mb-4 ' + figpadding}>
          <img src={item.artical_img || item.img} alt='' className='objctimg_box' />
        </figure>
      </Link>
      <div className='datesave flex flex-wrap justify-between items-start'>
        <div className='datetime flex flex-wrap'>
          <p className='mr-6 mb-2 text-sm'>{item.date || item.date_time || item.published_date}</p>
          <p className='mr-4 mb-2  text-sm flex items-center'>{item.read_time && <>
            <span className='mr-2 w-5'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" /></svg></span>
            {item.read_time}
          </>
          }
          </p>
        </div>
        {/* <div onClick={toggleActive} className='cursor-pointer mt-1'>
          {isActive ? <FaBookmark /> : <FaRegBookmark />}
        </div> */}
      </div>
      <h3 className='leading-snug line-clamp-2'>
        <Link href={item.artical_link ? item.artical_link : item.link ? item.link : item.links} className='text-black hover:text-black' title={item.title}>
          {item.artical_title || item.title}
        </Link>
      </h3>
      {item.content && (
        <p className='text-base text-gray-600 mt-2' dangerouslySetInnerHTML={{ __html: truncateContent(item.content) }}></p>
      )}

      {/* <p>
            <a href="#" title="" target="_blank" rel="noreferrer">
               <span className="newscastimg bgimage" style={{ background: 'url(' + aritemdata.media_src + ')' }}></span>
               <span className="mediasrc">{aritemdata.media_name}</span>
            </a>
         </p> */}
      {newstag && item.article_tag && (
        <ul className='list-none ml-0 mb-2'>
          <li className='bg-slate-200 capitalize inline-block p-1 px-2 text-sm'>{item.article_tag}</li>
        </ul>
      )}
      {newstag && item.source && (
        <a href={item.source_url} title={item.title} target="_blank" rel="noreferrer">
          <span
            className="newscastimg bgimage"
            style={{
              background: 'url(' + item.source_icon + ')',
            }}
          ></span>
          <span className="mediasrc">{item.source}</span>
        </a>
      )}
      {item.artical_cat && item.artical_cat.length > 0 && item.artical_cat.map((cat, index) => (
        <ul className='list-none ml-0 mb-2' key={index}>
          <li className='bg-slate-200 capitalize inline-block p-1 px-2 text-sm'>{cat.cat_name}</li>
        </ul>
      ))}
    </div>
  );
};

export default Aritem;
