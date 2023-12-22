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

const $ = require("jquery");

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + "directory/distributors");
  const data = await res.json();

  // distributor page static data
  let distributorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/directory_distributors/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  distributorsData = await distributorsData.json();

  return {
    props: { data, distributorsData },
    revalidate: 10, // In seconds
  };
}

const Distributors = ({ data, distributorsData }) => {
  // const [distributorsDataLoaded, setDistributorsDataLoaded] = useState(false);
  // const [distributorsData, setDistributorsData] = useState([]);
  const [distributorListData, setDistributorListData] = useState(distributorsData.distributors_list);
  const [distributorPages, setDistributorPages] = useState([]);
  const [distributorTypes, setDistributorTypes] = useState("");
  const [distributorPage, setDistributorPage] = useState(1);
  const [HideLoader, setHideLoader] = useState(false);

  const setCurrentPage = (currentPage) => {
    setDistributorPage(currentPage);
  };

  const setDistributerFilter = (distributorType) => {
    setDistributorTypes(distributorType);
    setDistributorPage(1);
    $('#distibuotr-pagination .page-numbers[data-page="1"]').click();
  };
  useEffect(() => {
    loadDistributorsData();
  }, [distributorTypes, distributorPage]);

  const loadDistributorsData = () => {
    setHideLoader(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + "/directory_distributors/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN;
    if (distributorTypes !== "") {
      directory_API += "&distribution_type=" + distributorTypes;
    }
    if (distributorPage !== 1) {
      directory_API += "&page_no=" + distributorPage;
    }
    axios
      .get(directory_API)
      .then((res) => {
        // if (distributorPage === 1) {
        //   setDistributorsData(res.data);
        //   setDistributorsDataLoaded(true);
        // }
        setDistributorListData(res.data.distributors_list);
        setDistributorPages(res.data.distributors_list_total_page_number);
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
                    <a href={distributorsData.parent_link} title={distributorsData.parent_title}>
                      <span>{distributorsData.parent_title}</span>
                    </a>
                  </li>
                  <li>
                    <a href={distributorsData.page_link} title={distributorsData.page_title}>
                      {distributorsData.page_title}
                    </a>
                  </li>
                </ul>
              </div>
              <Filters setDistributerFilter={setDistributerFilter} data={distributorsData.filter_options} tag='distributor' />
              <div className='dist_listdetails'>
                {distributorsData.sponder_data ? <Sponsers data={distributorsData.sponder_data} tag='distributor' /> : ""}
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <h1 className="h3">All Distributors</h1>
                    <p>Sorted Alphabatically A - Z</p>
                  </div>
                  <DistributorList data={distributorListData} tag='distributor' />
                </section>
                <Pagination totalPages={distributorPages} setCurrentPage={setCurrentPage} />
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

export default Distributors;
