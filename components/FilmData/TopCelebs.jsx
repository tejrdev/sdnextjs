import React from 'react';
import Link from 'next/link';

const TopCelebs = ({ data }) => {
  return (
    <div className='topceleb'>
      <div className='container'>
        <div className='seclinespace'>
          <div className='top_txt df fww just-between mb-2'>
            <h2>
              <Link href='/celebrities'>Top Celebs </Link>
            </h2>
            <div className='fmresult_view df fww'>
              <div className='view_btn'>
                <Link href='/celebrities' className='btn'>
                  View All
                </Link>
              </div>
            </div>
          </div>
          <ul className='castcrew_people grid gap16 auto-fill-[126px]'>
            {data?.map((item, index) => (
              <li className='' key={index}>
                <div className='cast_pic pvr'>
                  <Link href={item.link}>
                    <img src={item.img} alt='' class='objctimg_box object-top' loading='lazy' />
                  </Link>
                </div>
                <div className='cast_info'>
                  <h5>
                    <Link href={item.link}>{item.title}</Link>
                  </h5>
                  {item.movies?.title ? (
                    <p>
                      <Link href={item.movies?.link}>{item.movies?.title}</Link>
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopCelebs;
