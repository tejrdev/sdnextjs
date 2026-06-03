import React from 'react';
import Link from 'next/link';

const Bestpick = ({ data }) => {
  return (
    <section className='bestpick'>
      <div className='container'>
        <div className='seclinespace'>
          <div className='top_txt df fww just-between mb-2'>
            <h2>Screendollars' Best picks</h2>
            <div className='fmresult_view df fww'>
              <div className='view_btn'>
                <Link href='/category/box-office-best/' className='btn'>
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className='grid gap-4 auto-fill-[300px]'>
            {data?.map((item, index) => (
              <div className='card' key={index}>
                <a href={item.link}>
                  <figure className='relative w-full border border-gray-300 rounded-md pb-[55%] mb-2'>
                    <img src={item.img} className='object-cover absolute size-full rounded-md' alt='publication_image' loading='lazy' />
                  </figure>
                  <figcaption>
                    <h5 className='text-black'>{item.title}</h5>
                  </figcaption>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestpick;
