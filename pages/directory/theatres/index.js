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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + "directory/theatres");
  const data = await res.json();

  // Theater page static data
  let theatresData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/directory_theatres/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  theatresData = await theatresData.json();

  return {
    props: { data, theatresData },
    revalidate: 10, // In seconds
  };
}

const Theatres = ({ data, theatresData }) => {
  // const [theatresDataLoaded, setTheatresDataLoaded] = useState(false);
  // const [theatresData, setTheatresData] = useState([]);
  const [theatreListData, setTheatreListData] = useState(theatresData.theator_list);
  const [theatrePages, setTheatrePages] = useState([]);
  const [theatreTypes, setTheatreTypes] = useState("");
  const [theatrePage, setTheatrePage] = useState(1);
  const [exibutor_id, setexibutor_id] = useState("");
  const [HideLoader, setHideLoader] = useState(false);

  const setCurrentPage = (currentPage) => {
    setTheatrePage(currentPage);
  };

  const setFilter_theatre = (theatre_exibutor) => {
    setTheatrePage(1);
    setexibutor_id(theatre_exibutor);
  };

  const setDistributerFilter = (theatreType) => {
    setTheatreTypes(theatreType);
    setTheatrePage(1);
    $('#distibuotr-pagination .page-numbers[data-page="1"]').click();
  };
  useEffect(() => {
    loadTheatresData();
  }, [theatreTypes, theatrePage, exibutor_id]);

  const loadTheatresData = () => {
    setHideLoader(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + "/directory_theatres/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN;
    if (theatreTypes !== "") {
      directory_API += "&state=" + theatreTypes;
    }

    directory_API += "&page_no=" + theatrePage;

    if (exibutor_id !== "") {
      directory_API += "&exhibitor=" + exibutor_id;
    }
    axios
      .get(directory_API)
      .then((res) => {
        // if (theatrePage === 1) {
        //   setTheatresData(res.data);
        //   setTheatresDataLoaded(true);
        // }
        setTheatreListData(res.data.theator_list);
        setTheatrePages(res.data.total_page_number);

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
                    <a href={theatresData.parent_link} title={theatresData.parent_title}>
                      <span>{theatresData.parent_title}</span>
                    </a>
                  </li>
                  <li>
                    <a href={theatresData.page_link} title={theatresData.page_title}>
                      {theatresData.page_title}
                    </a>
                  </li>
                </ul>
              </div>
              <Filters setDistributerFilter={setDistributerFilter} data={theatresData.filter_options.split(",")} tag='theatre' custom_options={theatresData.filter_exhibitor} setFilter_theatre={setFilter_theatre} />
              <div className='dist_listdetails'>
                {theatresData.sponder_data ? <Sponsers data={theatresData.sponder_data} tag='theatre' /> : ""}
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <h3>Locations</h3>
                  </div>
                  <DistributorList data={theatreListData} tag='theatre' />
                </section>
                <Pagination totalPages={theatrePages} setCurrentPage={setCurrentPage} />
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

export default Theatres;
