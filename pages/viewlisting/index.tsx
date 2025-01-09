import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Page404 from '@/components/Page404';

const ViewListing = () => {
  const router = useRouter();
  const [searchID, setsearchID] = useState('');
  const [ListingNotFound, setListingNotFound] = useState(false);
  const id: string = router.query?.id?.toString() || '';

  const checkforListing = async (listingId: string) => {
    // const res = await fetch(process.env.NEXT_PUBLIC_SD_API + '/viewlisting?listing=' + listingId);
    // const data = await res.json();
    const data = { listing_found: true, listingURL: '/theatres/cinemark-bistro-renaissance-marketplace-and-xd/' };
    if (data.listing_found === true) {
      localStorage.setItem('requestFromQRCode', 'true');
      //redirect to listing page
      router.push(data.listingURL);
    } else {
      setListingNotFound(true);
    }
  };

  const searchListing = (e: any) => {
    e.preventDefault();
    checkforListing(searchID);
  };

  const onSearchChange = (e: any) => {
    e.preventDefault();
    setsearchID(e.target.value);
  };

  useEffect(() => {
    if (id !== '') {
      checkforListing(id);
    }
  }, [router.query]);

  return (
    <>
      {ListingNotFound ? (
        <>
          <Head>
            <meta name='robots' content='noindex' />
          </Head>
          <Page404 />
        </>
      ) : (
        <div className='container'>
          <form action='' className='dircsearch_list pvr mx-auto xsm:mx-0' onSubmit={searchListing}>
            <input type='text' name='' id='' value={searchID} onChange={onSearchChange} placeholder='Search Listing' className='w-100 dark:border-gray-300 dark:bg-transparent focus:bg-transparent dark:text-white' />
            <button type='submit' id='top_search_header'>
              <i className='far fa-search dark:text-white'></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ViewListing;
