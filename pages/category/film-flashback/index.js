import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import ArticleHead from '../../../components/News/DetailPages/ArticleHead';
import CategotyNavigation from '../../../components/News/DetailPages/CategotyNavigation';
import Info from '../../../components/News/DetailPages/Info';
import Sidebar from '../../../components/News/DetailPages/Sidebar';
import Loader from '../../../components/Loader';



export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'category/film-flashback');
  const data = await res.json();

  // filmfleshback page static data
  let FilmFlashbackData = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/film-flashback/&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  FilmFlashbackData = await FilmFlashbackData.json();

  return {
    props: { data, FilmFlashbackData },
    revalidate: 10, // In seconds
  };
};


const FilmFlashback = ({ data , FilmFlashbackData }) => {
   const [FilmFlashbackDataLoaded, setFilmFlashbackDataLoaded] = useState(false);
  // const [FilmFlashbackData, setFilmFlashbackData] = useState([]);
  const [FilmFlashbackPages, setFilmFlashbackPages] = useState([]);
  const [FilmFlashbackPage, setFilmFlashbackPage] = useState(1);
  const [FilmFlashbackListData, setFilmFlashbackListData] = useState(FilmFlashbackData);

  const setCurrentPage = (currentPage) => {
    setFilmFlashbackPage(currentPage);
  };

  useEffect(() => {
    loadFilmFlashbackData();
  }, [FilmFlashbackPage]);

  const loadFilmFlashbackData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/film-flashback/&page_no=' + FilmFlashbackPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        // if (FilmFlashbackPage === 1) {
        //   setFilmFlashbackData(res.data);
           setFilmFlashbackDataLoaded(true);
        // }
        setFilmFlashbackListData(res.data);
        setFilmFlashbackPages(res.data.category_post.total_page);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Head >
        {(data.children[0].children).map( (item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if(name !== ''){
                return <meta key={index} name={item.name} content={item.content} />;
                } else{
                return <meta key={index} property={item.property} content={item.content} />;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return (
                  <script key={index} type={item.type} class={item.class} 
                     dangerouslySetInnerHTML={{ __html: item.html }}>
                  </script>
                );
              default:
                return null;
            }
          })}
      </Head>
      
        <>
          {FilmFlashbackDataLoaded && (<CategotyNavigation data={FilmFlashbackData.menu_items} />)}
          <ArticleHead title={FilmFlashbackData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={FilmFlashbackData} />
                <Info data={FilmFlashbackListData} setCurrentPage={setCurrentPage} totalPages={FilmFlashbackPages} requestFrom="FilmFlashback" />
              </div>
            </div>
          </section>
        </>
      
    </>
  );
};

export default FilmFlashback;
