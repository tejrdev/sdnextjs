import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ListingDetailComponent from '@/components/ManageListing/ListingDetailComponent';
import SingleImage from '@/components/ManageListing/SingleImage';
import ImageGallery from '@/components/ManageListing/ImageGallery';
import IsAFeaturedListing from '@/components/ManageListing/IsAFeaturedListing';
import SelectedListing from '@/components/ManageListing/SelectedListing';
import ViewListingComponent from '@/components/ManageListing/ViewListingComponent';
import VendorProduct from '@/components/ManageListing/VendorProduct';

function Managelisting() {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [username, setUsername] = useState('');
  const [ListingURL, setListingURL] = useState('');
  const [ListingType, setListingType] = useState('');
  const [ListingData, setListingData] = useState([]);
  const [ListingDataLoaded, setListingDataLoaded] = useState(false);
  const [ListingDetailDataLoaded, setListingDetailDataLoaded] = useState(false);
  const [ListingDetailData, setListingDetailData] = useState([]);
  const [selectedSlider, setSelectedSlider] = useState(0);
  const [ApprovedListingExist, setApprovedListingExist] = useState(true);

  const loadListingData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/manage_claim_by_user.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&email=' + userLoggedIn + '&timestamp=' + new Date().getTime())
      .then((res) => {
        setListingData(res.data);
        res.data.claiming_list ? setListingDataLoaded(true) : setApprovedListingExist(false);
      })
      .catch((err) => console.log(err));
  };
  const loadListingDetailData = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_SD_API +
          '/claim-listing/manage_claim_by_user.php?api_token=' +
          process.env.NEXT_PUBLIC_API_TOKEN +
          '&email=' +
          userLoggedIn +
          '&listingTypeUrl=' +
          ListingURL +
          '&listingType=' +
          ListingType +
          '&timestamp=' +
          new Date().getTime()
      )
      .then((res) => {
        setListingDetailData(res.data);
        setListingDetailDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('email')) {
      localStorage.removeItem('email');
      router.push('/login');
    }
    setUserLoggedIn(localStorage.getItem('email'));
    setUsername(localStorage.getItem('username'));
    // loadListingData();
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      loadListingData();
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (ListingURL !== '') {
      loadListingDetailData();
    }
  }, [ListingURL]);

  useEffect(() => {
    const selectFirst = () => {
      if (ListingData.claiming_list.length) {
        const selected = ListingData.claiming_list[0].claim_for;
        const claim_type = ListingData.claiming_list[0].claim_type;
        setListingURL(selected);
        setListingType(claim_type);
        setSelectedSlider(0);
        const sel_listingId = selected.replace(process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + claim_type + '/', '');
        localStorage.setItem('listing_type', claim_type);
        localStorage.setItem('listing_id', sel_listingId);
        localStorage.setItem('listing_title', ListingData.claiming_list[0].title);
      }
    };

    if (ListingDataLoaded) {
      const length = ListingData?.claiming_list?.filter((item) => item.approved).length;
      if (length > 0) {
        let blnListingSelected = false;
        setApprovedListingExist(true);
        const sel_listingId = localStorage.getItem('listing_id') || '';
        const sel_listingType = localStorage.getItem('listing_type') || '';
        if (sel_listingId !== '' && sel_listingType !== '') {
          const sel_listingUrl = process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + sel_listingType + '/' + sel_listingId;
          ListingData.claiming_list.filter((item, index) => {
            if (item.claim_for === sel_listingUrl) {
              setSelectedSlider(index);
              setListingURL(item.claim_for);
              setListingType(item.claim_type);
              blnListingSelected = true;
            }
          });
        } else {
          selectFirst();
        }
        if (!blnListingSelected) selectFirst();
      } else {
        setApprovedListingExist(false);
      }
    }
  }, [ListingDataLoaded]);

  const manageListingDataSlider = (claim, index) => {
    const selected = claim.claim_for;
    const listingType = claim.claim_type;
    const listingTitle = claim.title;
    if (selected !== ListingURL) {
      setListingDetailDataLoaded(false);
      setListingDetailData([]);
      setListingURL(selected);
      setListingType(listingType);
      setSelectedSlider(index);
      const listingId = selected.replace(process.env.NEXT_PUBLIC_FRONTEND_URL + '/' + listingType + '/', '');
      localStorage.setItem('listing_type', listingType);
      localStorage.setItem('listing_id', listingId);
      localStorage.setItem('listing_title', listingTitle);
    }
  };
  const RefreshComponent = (data) => {
    setListingDetailData({
      ...ListingDetailData,
      products_services: data,
    });
  };
  return (
    <main>
      {ListingDataLoaded && (
        <>
          <ViewListingComponent user={username} />
          {ApprovedListingExist ? (
            <>
              <SelectedListing data={ListingData.claiming_list} callToAction={manageListingDataSlider} selectedSlider={selectedSlider} />
              {ListingDetailDataLoaded ? (
                <>
                  <IsAFeaturedListing data={ListingDetailData} ListingURL={ListingURL} />
                  <ListingDetailComponent data={ListingDetailData} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} />
                  <SingleImage userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} image={ListingDetailData.banner_image} requestFor='bannerImage' />
                  <SingleImage userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} image={ListingDetailData.profile_image} requestFor='profileImage' />
                  {ListingType == 'vendors' && ListingDetailData.products_services && (
                    <VendorProduct
                      data={ListingDetailData.products_services}
                      userLoggedIn={userLoggedIn}
                      ListingURL={ListingURL}
                      ListingType={ListingType}
                      ReRenderComponent={RefreshComponent}
                      secTitle={ListingDetailData.title_of_products}
                    />
                  )}
                  <ImageGallery data={ListingDetailData} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} requestFrom='GalleryImage' />
                  <SingleImage userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} image={ListingDetailData.promo_imgs} requestFor='promoImage' />
                </>
              ) : (
                <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
                  <div className='secloder'>
                    <div className='secspinner'></div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className='container'>
              <p>
                <strong>No listing found</strong>
              </p>
            </div>
          )}
        </>
      )}
      {!ApprovedListingExist && (
        <div className='container'>
          <p>
            <strong>No listing found</strong>
          </p>
        </div>
      )}
    </main>
  );
}

export default Managelisting;
