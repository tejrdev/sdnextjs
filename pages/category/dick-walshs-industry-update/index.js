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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'category/dick-walshs-industry-update');
  const data = await res.json();

  // IndustryUpdateData page static data
  let IndustryUpdateData = await fetch(
  process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/dick-walshs-industry-update/&page_no=' + 1 + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  IndustryUpdateData = await IndustryUpdateData.json();

  return {
    props: { data, IndustryUpdateData },
    revalidate: 10, // In seconds
  };
}

const IndustryUpdate = ({ data , IndustryUpdateData }) => {
  const [IndustryUpdateDataLoaded, setIndustryUpdateDataLoaded] = useState(false);
  //const [IndustryUpdateData, setIndustryUpdateData] = useState([]);
  const [IndustryUpdatePages, setIndustryUpdatePages] = useState([]);
  const [IndustryUpdatePage, setIndustryUpdatePage] = useState(1);
  const [IndustryUpdateListData, setIndustryUpdateListData] = useState(IndustryUpdateData);

  const setCurrentPage = (currentPage) => {
    setIndustryUpdatePage(currentPage);
  };

  useEffect(() => {
    loadIndustryUpdateData();
  }, [IndustryUpdatePage]);

  const loadIndustryUpdateData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API + '/news_page/news_category.php?url=' + process.env.NEXT_PUBLIC_MENU_URL + 'category/dick-walshs-industry-update/&page_no=' + IndustryUpdatePage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        // if (IndustryUpdatePage === 1) {
        //   setIndustryUpdateData(res.data);
           setIndustryUpdateDataLoaded(true);
        // }
        setIndustryUpdateListData(res.data);
        setIndustryUpdatePages(res.data.category_post.total_page);
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
          {IndustryUpdateDataLoaded &&(<CategotyNavigation data={IndustryUpdateData.menu_items} />)}
          <ArticleHead title={IndustryUpdateData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={IndustryUpdateData} />
                <Info data={IndustryUpdateListData} setCurrentPage={setCurrentPage} totalPages={IndustryUpdatePages} />
              </div>
            </div>
          </section>
        </>
      
    </>
  );
};

export default IndustryUpdate;
