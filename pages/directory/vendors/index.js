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
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + "directory/vendors");
  const data = await res.json();

  // vandor page static data
  let vendorsData = await fetch(process.env.NEXT_PUBLIC_SD_API + "/directory_vendors/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN);
  vendorsData = await vendorsData.json();

  return {
    props: { data, vendorsData },
    revalidate: 10, // In seconds
  };
}

const Vendors = ({ data, vendorsData }) => {
  // const [vendorsDataLoaded, setVendorsDataLoaded] = useState(false);
  // const [vendorsData, setVendorsData] = useState([]);
  const [vendorListData, setVendorListData] = useState(vendorsData.vendor_list);
  const [vendorPages, setVendorPages] = useState([]);
  const [vendorTypes, setVendorTypes] = useState("");
  const [vendorPage, setVendorPage] = useState(1);
  const [HideLoader, setHideLoader] = useState(false);

  const setCurrentPage = (currentPage) => {
    setVendorPage(currentPage);
  };

  const setDistributerFilter = (vendorType) => {
    setVendorTypes(vendorType);
    setVendorPage(1);
    $('#distibuotr-pagination .page-numbers[data-page="1"]').click();
  };
  useEffect(() => {
    loadVendorsData();
  }, [vendorTypes, vendorPage]);
  const loadVendorsData = () => {
    setHideLoader(false);
    let directory_API = process.env.NEXT_PUBLIC_SD_API + "/directory_vendors/?api_token=" + process.env.NEXT_PUBLIC_API_TOKEN;
    if (vendorTypes !== "") {
      directory_API += "&category=" + vendorTypes;
    }
    if (vendorPage !== 1) {
      directory_API += "&page_no=" + vendorPage;
    }
    axios
      .get(directory_API)
      .then((res) => {
        // if (vendorPage === 1) {
        //   setVendorsData(res.data);
        //   setVendorsDataLoaded(true);
        // }
        setVendorListData(res.data.vendor_list);
        setVendorPages(res.data.total_page_number);
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
                    <a href={vendorsData.parent_link} title={vendorsData.parent_title}>
                      <span>{vendorsData.parent_title}</span>
                    </a>
                  </li>
                  <li>
                    <a href={vendorsData.page_link} title={vendorsData.page_title}>
                      {vendorsData.page_title}
                    </a>
                  </li>
                </ul>
              </div>
              <Filters setDistributerFilter={setDistributerFilter} data={vendorsData.filter_options} tag='vendor' />
              <div className='dist_listdetails'>
                {vendorsData.sponder_data ? <Sponsers data={vendorsData.sponder_data} tag='vendor' /> : ""}
                <section className='alldist_list'>
                  <div className='top_txt df fww'>
                    <h3>All Vendors</h3>
                    <p>Sorted Alphabatically A - Z</p>
                  </div>
                  <DistributorList data={vendorListData} tag='vendor' />
                </section>
                <Pagination totalPages={vendorPages} setCurrentPage={setCurrentPage} />
                <OtherSponsors />

                <HomePageAds cls='adds_728' format='horizontal' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendors;
