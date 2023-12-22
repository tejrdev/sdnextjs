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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'category/hollywood-report');
  const data = await res.json();

  // HollywoodReportData page static data
  let HollywoodReportData = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/hollywood-report/&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  HollywoodReportData = await HollywoodReportData.json();

  return {
    props: { data, HollywoodReportData },
    revalidate: 10, // In seconds
  };
}

const HollywoodReport = ({ data , HollywoodReportData }) => {
  const [HollywoodReportDataLoaded, setHollywoodReportDataLoaded] = useState(false);
  //const [HollywoodReportData, setHollywoodReportData] = useState([]);
  const [HollywoodReportPages, setHollywoodReportPages] = useState([]);
  const [HollywoodReportPage, setHollywoodReportPage] = useState(1);
  const [HollywoodReportListData, setHollywoodReportListData] = useState(HollywoodReportData);

  const setCurrentPage = (currentPage) => {
    setHollywoodReportPage(currentPage);
  };

  useEffect(() => {
    loadHollywoodReportData();
  }, [HollywoodReportPage]);

  const loadHollywoodReportData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/hollywood-report/&page_no=' + HollywoodReportPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        // if (HollywoodReportPage === 1) {
        //   setHollywoodReportData(res.data);
           setHollywoodReportDataLoaded(true);
        // }
        setHollywoodReportListData(res.data);
        setHollywoodReportPages(res.data.category_post.total_page);
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
          {HollywoodReportDataLoaded && (<CategotyNavigation data={HollywoodReportData.menu_items} />)}
          <ArticleHead title={HollywoodReportData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={HollywoodReportData} />
                <Info data={HollywoodReportListData} setCurrentPage={setCurrentPage} totalPages={HollywoodReportPages} />
              </div>
            </div>
          </section>
        </>
      
    </>
  );
};

export default HollywoodReport;
