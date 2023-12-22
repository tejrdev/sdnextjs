import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";

//cpmponents
import DistributorList from "../../../components/Directory/ListingPages/DistributorList";
import Filters from "../../../components/Directory/ListingPages/Filters";
import Pagination from "../../../components/Directory/ListingPages/Pagination";
import Sponsers from "../../../components/Directory/ListingPages/Sponsers";
import OtherSponsors from "../../../components/Directory/ListingPages/OtherSponsors";
import AddListing from "../../../components/Directory/ListingPages/AddListing";
import Loader from "../../../components/Loader";
import MenuNavigation from "../../../components/Directory/ListingPages/MenuNavigation";
import HomePageAds from "../../../components/Homepage/HomePageAds";

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + "directory/film-festivals");
  const data = await res.json();

  // filmfestival page static data
  let filmfestivalsData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/directory_film_festivals/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  filmfestivalsData = await filmfestivalsData.json();

  return {
    props: { data, filmfestivalsData },
    revalidate: 10, // In seconds
  };
}

const FilmFestival = ({ data, filmfestivalsData }) => {
  // const [filmfestivalsDataLoaded, setFilmFestivalsDataLoaded] = useState(false);
  // const [filmfestivalsData, setFilmFestivalsData] = useState([]);
  const [filmfestivalListData, setFilmFestivalListData] = useState(filmfestivalsData.film_fastival_list);
  const [filmfestivalPages, setFilmFestivalPages] = useState([]);
  const [filmfestivalTypes, setFilmFestivalTypes] = useState("");
  const [filmfestivalPage, setFilmFestivalPage] = useState(1);
  const [HideLoader, setHideLoader] = useState(false);

  const setCurrentPage = (currentPage) => {
    setFilmFestivalPage(currentPage);
  };

  const setDistributerFilter = (filmfestivalType) => {
    setFilmFestivalTypes(filmfestivalType);
    setFilmFestivalPage(1);
    $('#distibuotr-pagination .page-numbers[data-page="1"]').click();
  };
  useEffect(() => {
    loadFilmFestivalsData();
  }, [filmfestivalTypes, filmfestivalPage]);

  const loadFilmFestivalsData = () => {
    setHideLoader(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + "/directory_film_festivals/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN;
    if (filmfestivalTypes !== "") {
      directory_API += "&cat=" + filmfestivalTypes;
    }
    if (filmfestivalPage !== 1) {
      directory_API += "&page_no=" + filmfestivalPage;
    }
    axios
      .get(directory_API)
      .then((res) => {
        // if (filmfestivalPage === 1) {
        //   setFilmFestivalsData(res.data);
        //   setFilmFestivalsDataLoaded(true);
        // }
        setFilmFestivalListData(res.data.film_fastival_list);
        setFilmFestivalPages(res.data.total_page_number);
        setHideLoader(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        {data.children[0].children.map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case "TITLE":
              return <title key={index}>{item.html}</title>;
            case "META":
              const name = item.name || "";
              if (name !== "") {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case "LINK":
              return <link key={index} rel={item.rel} href={item.href} />;
            case "SCRIPT":
              return <script key={index} type={item.type} class={item.class} dangerouslySetInnerHTML={{ __html: item.html }}></script>;
            default:
              return null;
          }
        })}
      </Head>
      <MenuNavigation />
      <div className='distlisting'>
        <div className='container'>
          <div className='distlist_box'>
            <div className='distsponsor_box df fww'>
              <div className='distbreadcrumb'>
                <ul>
                  <li>
                    <a href={filmfestivalsData.parent_link} title={filmfestivalsData.parent_title}>
                      <span>{filmfestivalsData.parent_title}</span>
                    </a>
                  </li>
                  <li>
                    <a href={filmfestivalsData.page_link} title={filmfestivalsData.page_title}>
                      {filmfestivalsData.page_title}
                    </a>
                  </li>
                </ul>
              </div>
              <Filters setDistributerFilter={setDistributerFilter} data={filmfestivalsData.filter_options} tag='filmfestival' />
              <div className='dist_listdetails'>
                {filmfestivalsData.sponder_data ? <Sponsers data={filmfestivalsData.sponder_data} tag='filmfestival' /> : ""}
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <h1 className="h3">All Film Festivals</h1>
                    <p>Sorted Alphabatically A - Z</p>
                  </div>
                  <DistributorList data={filmfestivalListData} tag='filmfestival' />
                </section>
                <Pagination totalPages={filmfestivalPages} setCurrentPage={setCurrentPage} />
                <OtherSponsors />
                {/* <AddListing /> */}
                <HomePageAds cls='adds_728' format='horizontal' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmFestival;
