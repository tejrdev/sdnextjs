import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ListingDetailComponent from '@/components/ManageListing/ListingDetailComponent';
import SingleImage from '@/components/ManageListing/SingleImage';
import ImageGallery from '@/components/ManageListing/ImageGallery';
import IsAFeaturedListing from '@/components/ManageListing/IsAFeaturedListing';
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

  const loadListingData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/manage_claim_by_user.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&email=' + userLoggedIn)
      .then((res) => {
        setListingData(res.data);
        setListingDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };
  const loadListingDetailData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/manage_claim_by_user.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&email=' + userLoggedIn + '&listingTypeUrl=' + ListingURL + '&listingType=' + ListingType + '&timestamp=' + new Date().getTime())
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
    if (ListingDataLoaded) {
      const listingId = localStorage.getItem('listing_id');
      const listingType = localStorage.getItem('listing_type');
      if (listingId && listingType) {
        const listingUrl = process.env.NEXT_PUBLIC_LOGIN_URL + listingType + '/' + listingId;
        if ($('select[name="listing"] option[value="' + listingUrl + '"]').length) {
          setListingURL(listingUrl);
          setListingType(listingType);
          $('select[name="listing"]').val(listingUrl);
        }
      }
    }
  }, [ListingDataLoaded]);

  const manageListingData = () => {
    const selected = $('select[name="listing"]').val();
    const listingType = $('select[name="listing"] option[value="' + selected + '"]').attr('type');
    const listingTitle = $('select[name="listing"] option[value="' + selected + '"]').attr('title');
    if (selected !== ListingURL) {
      setListingDetailDataLoaded(false);
      setListingDetailData([]);
      if (selected !== '0') {
        setListingURL(selected);
        setListingType(listingType);
        const listingId = selected.replace(process.env.NEXT_PUBLIC_LOGIN_URL + listingType + '/', '');
        localStorage.setItem('listing_type', listingType);
        localStorage.setItem('listing_id', listingId);
        localStorage.setItem('listing_title', listingTitle);
      }
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
          <ViewListingComponent data={ListingData} user={username} callToAction={manageListingData} />
          {ListingDetailDataLoaded && (
            <>
              <IsAFeaturedListing data={ListingDetailData} />
              <ListingDetailComponent data={ListingDetailData} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} />
              <SingleImage userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} image={ListingDetailData.profile_image} requestFor='profileImage' />
              {ListingType == 'vendors' && ListingDetailData.products_services && <VendorProduct data={ListingDetailData.products_services} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} ReRenderComponent={RefreshComponent} secTitle={ListingDetailData.title_of_products} />}
              <ImageGallery data={ListingDetailData} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} requestFrom='GalleryImage' />
              <SingleImage userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} image={ListingDetailData.promo_imgs} requestFor='promoImage' />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default Managelisting;
