import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Loader from '../../components/Loader';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';

const $ = require('jquery');
export async function getStaticProps() {
  // Fetch SEO data
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + '/movie-genres/');
  const SEOdata = await res.json();

  //genre page
  let GenrelistData = await fetch(process.env.NEXT_PUBLIC_SD_API + '/movie-genre/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  GenrelistData = await GenrelistData.json();
  return {
    props: { GenrelistData, SEOdata },
    revalidate: 10, // In seconds
  };
}

const Genrelist = ({ GenrelistData, SEOdata }) => {
  return (
    <>
      <Head>
        {SEOdata.children[0].children.map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>
      <AdminEditLink data={GenrelistData} />
      <section className='genrelisting subfilmy'>
        <div className='container'>
          <div className='top_txt'>
            <h1 className='h2'>{GenrelistData.page_title}</h1>
          </div>

          <div className='genrelistbox grid gap16'>
            {GenrelistData.genre_list &&
              GenrelistData.genre_list.map((item, index) => (
                <div className='genrelistitem' key={index}>
                  <Link href={GenrelistData.page_link + item.select_genre.toLowerCase()}>
                    <figure className='pvr'>
                      <img src={item.genre_image} alt='' className='objctimg_box' />
                      <figcaption className='genmiddlename'>{item.select_genre}</figcaption>
                    </figure>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Genrelist;
