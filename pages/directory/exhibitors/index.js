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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + "directory/exhibitors");
  const data = await res.json();

  // Exibitor page static data
  let exhibitorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/directory_exhibitors/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  exhibitorsData = await exhibitorsData.json();

  return {
    props: { data, exhibitorsData },
    revalidate: 10, // In seconds
  };
}

const Exhibitors = ({ data, exhibitorsData }) => {
  // const [exhibitorsDataLoaded, setExhibitorsDataLoaded] = useState(false);
  // const [exhibitorsData, setExhibitorsData] = useState([]);
  const [exhibitorListData, setExhibitorListData] = useState(exhibitorsData.exhibitor_list);
  const [exhibitorPages, setExhibitorPages] = useState([]);
  const [exhibitorTypes, setExhibitorTypes] = useState("");
  const [exhibitorPage, setExhibitorPage] = useState(1);
  const [HideLoader, setHideLoader] = useState(false);
  const setCurrentPage = (currentPage) => {
    setExhibitorPage(currentPage);
  };

  const setDistributerFilter = (exhibitorType) => {
    setExhibitorTypes(exhibitorType);
    setExhibitorPages(1);
    $('#distibuotr-pagination .page-numbers[data-page="1"]').click();
  };
  useEffect(() => {
    loadExhibitorsData();
  }, [exhibitorTypes, exhibitorPage]);

  const loadExhibitorsData = () => {
    setHideLoader(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + "/directory_exhibitors/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN;
    if (exhibitorTypes !== "") {
      directory_API += "&state=" + exhibitorTypes;
    }
    if (exhibitorPage !== 1) {
      directory_API += "&page_no=" + exhibitorPage;
    }

    axios
      .get(directory_API)
      .then((res) => {
        // if (exhibitorPage === 1) {
        //   setExhibitorsData(res.data);
        //   setExhibitorsDataLoaded(true);
        // }
        setExhibitorListData(res.data.exhibitor_list);
        setExhibitorPages(res.data.total_page_number);
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
                    <a href={exhibitorsData.parent_link} title={exhibitorsData.parent_title}>
                      <span>{exhibitorsData.parent_title}</span>
                    </a>
                  </li>
                  <li>
                    <a href={exhibitorsData.page_link} title={exhibitorsData.page_title}>
                      {exhibitorsData.page_title}
                    </a>
                  </li>
                </ul>
              </div>
              <Filters setDistributerFilter={setDistributerFilter} data={exhibitorsData.filter_options.split(",")} tag='exhibitor' />
              <div className='dist_listdetails'>
                {exhibitorsData.sponder_data ? <Sponsers data={exhibitorsData.sponder_data} tag='exhibitor' /> : ""}
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <h3>All Exhibitors</h3>
                    <p>Sorted Alphabatically A - Z</p>
                  </div>

                  <DistributorList data={exhibitorListData} tag='exhibitor' />
                </section>
                <Pagination totalPages={exhibitorPages} setCurrentPage={setCurrentPage} />
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

export default Exhibitors;
