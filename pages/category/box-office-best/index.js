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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'category/box-office-best');
  const data = await res.json();

  return { props: { data } };
}

const BoxOfficeBest = ({ data }) => {
  const [BoxOfficeBestDataLoaded, setBoxOfficeBestDataLoaded] = useState(false);
  const [BoxOfficeBestData, setBoxOfficeBestData] = useState([]);
  const [BoxOfficeBestPages, setBoxOfficeBestPages] = useState([]);
  const [BoxOfficeBestPage, setBoxOfficeBestPage] = useState(1);
  const [BoxOfficeBestListData, setBoxOfficeBestListData] = useState([]);

  const setCurrentPage = (currentPage) => {
    setBoxOfficeBestPage(currentPage);
  };

  useEffect(() => {
    loadBoxOfficeBestData();
  }, [BoxOfficeBestPage]);

  const loadBoxOfficeBestData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API +
          '/news_page/news_category.php?url=' +
          process.env.NEXT_PUBLIC_MENU_URL +
          'category/box-office-best/&page_no=' +
          BoxOfficeBestPage +
          '&api_token=' +
          process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        if (BoxOfficeBestPage === 1) {
          setBoxOfficeBestData(res.data);
          setBoxOfficeBestDataLoaded(true);
        }
        setBoxOfficeBestListData(res.data);
        setBoxOfficeBestPages(res.data.category_post.total_page);
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
      {BoxOfficeBestDataLoaded ? (
        <>
          <CategotyNavigation data={BoxOfficeBestData.menu_items} />
          <ArticleHead title={BoxOfficeBestData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={BoxOfficeBestData} />
                <Info data={BoxOfficeBestListData} setCurrentPage={setCurrentPage} totalPages={BoxOfficeBestPages} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BoxOfficeBest;
