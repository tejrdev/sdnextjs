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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'category/industry-news');
  const data = await res.json();

  // IndustryNewsData page static data
  let IndustryNewsData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/industry-news/&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  IndustryNewsData = await IndustryNewsData.json();

  return {
    props: { data, IndustryNewsData },
    revalidate: 10, // In seconds
  };
}

const IndustryNews = ({ data , IndustryNewsData }) => {
   const [IndustryNewsDataLoaded, setIndustryNewsDataLoaded] = useState(false);
  // const [IndustryNewsData, setIndustryNewsData] = useState([]);
  const [IndustryNewsPages, setIndustryNewsPages] = useState([]);
  const [IndustryNewsPage, setIndustryNewsPage] = useState(1);
  const [IndustryNewsListData, setIndustryNewsListData] = useState(IndustryNewsData);

  const setCurrentPage = (currentPage) => {
    setIndustryNewsPage(currentPage);
  };

  useEffect(() => {
    loadIndustryNewsData();
  }, [IndustryNewsPage]);

  const loadIndustryNewsData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/industry-news/&page_no=' + IndustryNewsPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        // if (IndustryNewsPage === 1) {
        //   setIndustryNewsData(res.data);
           setIndustryNewsDataLoaded(true);
        // }
        setIndustryNewsListData(res.data);
        setIndustryNewsPages(res.data.category_post.total_page);
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
          {IndustryNewsDataLoaded && (<CategotyNavigation data={IndustryNewsData.menu_items} />)}
          <ArticleHead title={IndustryNewsData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={IndustryNewsData} />
                <Info data={IndustryNewsListData} setCurrentPage={setCurrentPage} totalPages={IndustryNewsPages} />
              </div>
            </div>
          </section>
        </>
      
    </>
  );
};

export default IndustryNews;
