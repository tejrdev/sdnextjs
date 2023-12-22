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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'category/box-office-outlook');
  const data = await res.json();

  // boxoffice outlook page static data
  let BoxOfficeOutlookData = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/box-office-outlook/&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  BoxOfficeOutlookData = await BoxOfficeOutlookData.json();

  return {
    props: { data, BoxOfficeOutlookData },
    revalidate: 10, // In seconds
  };
};


const BoxOfficeOutlook = ({ data , BoxOfficeOutlookData }) => {
  const [BoxOfficeOutlookDataLoaded, setBoxOfficeOutlookDataLoaded] = useState(false);
  // const [BoxOfficeOutlookData, setBoxOfficeOutlookData] = useState([]);
  const [BoxOfficeOutlookPages, setBoxOfficeOutlookPages] = useState([]);
  const [BoxOfficeOutlookPage, setBoxOfficeOutlookPage] = useState(1);
  const [BoxOfficeOutlookListData, setBoxOfficeOutlookListData] = useState(BoxOfficeOutlookData);

  const setCurrentPage = (currentPage) => {
    setBoxOfficeOutlookPage(currentPage);
  };

  useEffect(() => {
    loadBoxOfficeOutlookData();
  }, [BoxOfficeOutlookPage]);

  const loadBoxOfficeOutlookData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/box-office-outlook/&page_no=' + BoxOfficeOutlookPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        // if (BoxOfficeOutlookPage === 1) {
        //   setBoxOfficeOutlookData(res.data);
           setBoxOfficeOutlookDataLoaded(true);
        // }
        setBoxOfficeOutlookListData(res.data);
        setBoxOfficeOutlookPages(res.data.category_post.total_page);
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
          {BoxOfficeOutlookDataLoaded && (<CategotyNavigation data={BoxOfficeOutlookData.menu_items} />)}
          <ArticleHead title={BoxOfficeOutlookData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={BoxOfficeOutlookData} />
                <Info data={BoxOfficeOutlookListData} setCurrentPage={setCurrentPage} totalPages={BoxOfficeOutlookPages} />
              </div>
            </div>
          </section>
        </>
      
    </>
  );
};

export default BoxOfficeOutlook;
