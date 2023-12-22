import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loader from '../../../components/Loader';
import dt from 'datatables.net-dt';
import CategoryNavigation from '../../../components/FilmData/DetailPages/CategoryNavigation';
import HomePageAds from '../../../components/Homepage/HomePageAds';

const $ = require('jquery');
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data/ratings-updates');
  const data = await res.json();

  //RatingUpdatesData static data
  let RatingUpdatesData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/ratings_updates.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  RatingUpdatesData = await RatingUpdatesData.json();

  return {
    props: { data, RatingUpdatesData },
    revalidate: 10, // In seconds
  };
}

const tdStyle = {
  border: '1px solid rgb(197, 197, 197)',
  borderCollapse: 'collapse',
  padding: '6px',
};

const RatingUpdates = ({ data, RatingUpdatesData }) => {
  const [RatingUpdatesDataLoaded, setRatingUpdatesDataLoaded] = useState(false);
  //const [RatingUpdatesData, setRatingUpdatesData] = useState([]);

  useEffect(() => {
    $.fn.DataTable = dt;
    $('#mppa-datatable').DataTable({
      columns: [{ data: 'title' }, { data: 'Distributor' }, { data: 'Genre' }, { data: 'Type' }, { data: 'Pattern/Platform' }, { data: 'release_date' }, { data: 'rating' }, { data: 'comment' }],
      paging: false,
      searching: false,
      responsive: false,
      autoWidth: false,
      //bSort: false,
      columnDefs: [{ orderable: false, targets: [2, 5, 6, 7] }],
      //order: [[0, 'asc']]
      order: [],
    });
    loadRatingUpdatesData();
  }, []);

  const loadRatingUpdatesData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_pages/ratings_updates.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        //setRatingUpdatesData(res.data);
        setRatingUpdatesDataLoaded(true);
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
      <CategoryNavigation />
      {/*RatingUpdatesDataLoaded ? (*/
        <section className="stdchanges subfilmy">
          <div className="container">
            <div className="info_block">
              <div className="info_box printarea">
                <div className="top_txt middletitle_print">
                  <div className="top_info">
                    <h2 className="h3">{RatingUpdatesData.title}</h2>
                  </div>
                  <div className="downloadbtn">
                    <span className="pritbtn">Print</span>
                  </div>
                </div>
                <div className="info_txt printbox ">
                  <div className="studio_change tablebox">
                    <table className="responsive dataTable twotblhead" id="sr-datatable">
                      <thead>
                        <tr>
                          <th colSpan="3" style={{ tdStyle }}></th>
                          <th colSpan="3" style={{ tdStyle }}>
                            Distribution
                          </th>
                          <th colSpan="1" style={{ tdStyle }}></th>
                          <th colSpan="1" style={{ tdStyle }}></th>
                        </tr>
                        <tr>
                          <th data-title="Title">Title</th>
                          <th data-title="Distributor">Distributor</th>
                          <th data-title="Genre">Genre</th>
                          <th data-title="Type">Type</th>
                          <th data-title="Pattern / Platform">Wide</th>
                          <th data-title="Release Date">Release Date</th>
                          <th data-title="Rating">Rating</th>
                          <th data-title="Comments">Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RatingUpdatesData.rating_data.map((item, index) => {
                          return (
                            <tr className={`box-office-res-row ` + (index % 2) === 0 ? 'even' : 'odd'} role="row" key={index}>
                              <td data-title="Title" style={{ tdStyle }}>
                                <a href={item.link}>
                                  <strong>{item.title}</strong>
                                </a>
                              </td>
                              <td data-title="Distributor" style={{ tdStyle }}>
                                <a href={item.distributor_link}>
                                  <strong>{item.distributor_name}</strong>
                                </a>
                              </td>
                              <td data-title="Genre" style={{ tdStyle }}>
                                {item.genre}
                              </td>
                              <td data-title="Distribution Type" style={{ tdStyle }}>
                                {item.type}
                              </td>
                              <td
                                data-title="Distribution Pattern"
                                style={{ tdStyle }}
                                dangerouslySetInnerHTML={{
                                  __html: item.distribution,
                                }}
                              ></td>
                              <td data-title="Release Date" style={{ tdStyle }}>
                                {item.release_date}
                              </td>
                              <td data-title="Rating" style={{ tdStyle }}>
                                {item.rating}
                              </td>
                              <td data-title="Comments" style={{ tdStyle }}>
                                {item.ratings_comments}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <HomePageAds cls="ads_970" format="horizontal" />
            </div>
          </div>
        </section>
      /*) : (
        <Loader />
      )*/}
    </>
  );
};

export default RatingUpdates;
