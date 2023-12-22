import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ArticleHead from '../ArticleHead';
import Info from '../Info';
import Sidebar from '../Sidebar';
import Loader from '../../../../Loader';
import RankMathSEO from '../../../../RankMathSEO';

const Archives = () => {
  let { year, month } = useParams();
  const [ArchivesDataLoaded, setArchivesDataLoaded] = useState(false);
  const [ArchivesData, setArchivesData] = useState([]);
  const [ArchivesPages, setArchivesPages] = useState([]);
  const [ArchivesPage, setArchivesPage] = useState(1);
  const [ArchivesListData, setArchivesListData] = useState([]);

  const setCurrentPage = (currentPage) => {
    setArchivesPage(currentPage);
  };

  useEffect(() => {
    loadArchivesData();
  }, [ArchivesPage]);

  const loadArchivesData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API +
          '/news_page/news_archive.php?url=' +
          process.env.NEXT_PUBLIC_MENU_URL +
          year +
          '/' +
          month +
          '&page_no=' +
          ArchivesPage +
          '&api_token=' +
          process.env.NEXT_PUBLIC_API_TOKEN
      )
      .then((res) => {
        if (ArchivesPage === 1) {
          setArchivesData(res.data);
          setArchivesDataLoaded(true);
        }
        setArchivesListData(res.data);
        setArchivesPages(res.data.category_post.total_page);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <RankMathSEO />
      {ArchivesDataLoaded ? (
        <>
          <ArticleHead title={ArchivesData.name} />
          <section className="sidebar_blockarea">
            <div className="container">
              <div className="sidebar_blockiner df fww">
                <Sidebar data={ArchivesData} requestFrom="Archives" />
                <Info data={ArchivesListData} setCurrentPage={setCurrentPage} totalPages={ArchivesPages} />
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
export default Archives;
