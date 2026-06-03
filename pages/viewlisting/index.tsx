import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Page404 from '@/components/Page404';

interface ClaimListingResponse {
  url?: string;
  error?: string;
  [key: string]: any;
}

const ViewListing = () => {
  const router = useRouter();
  const [searchID, setsearchID] = useState<string>('');
  const [ListingNotFound, setListingNotFound] = useState<boolean>(false);
  const [Error, setError] = useState<string>('');
  const [ShowLoader, setShowLoader] = useState<boolean>(true);
  const id: string = router.query?.id?.toString() || '';

  const checkforListing = useCallback(async (listingId: string) => {
    setShowLoader(true);
    const res = await fetch(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/claim_qr_link.php?id=' + listingId);
    const data: ClaimListingResponse = await res.json();
    // const data = { error: false, url: '/theatres/cinemark-bistro-renaissance-marketplace-and-xd/' };
    if (data.url) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('requestFromQRCode', 'true');
        localStorage.setItem('claimURL', data.url);
      }
      //redirect to listing page
      router.push(data.url);
      // setShowLoader(false);
    } else {
      setListingNotFound(true);
      setError(data.error || 'Listing not found');
      setShowLoader(false);
    }
  }, [router]);

  const searchListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkforListing(searchID);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setsearchID(e.target.value);
  };

  useEffect(() => {
    if (id !== '') {
      checkforListing(id);
    } else {
      setShowLoader(false);
    }
  }, [id, checkforListing]);

  return (
    <>
      {ShowLoader ? (
        <div className='nowshow_sliderbox pvr' style={{ minHeight: 200, marginBottom: 20 }}>
          <div className='secloder'>
            <div className='secspinner'></div>
          </div>
        </div>
      ) : (
        <>
          <div className='emailverifyflow min-h-96 flex flex-wrap items-center content-center'>
            <div className='digitin max-w-md p-8 mx-auto border border-gray-300 my-3'>
              <form onSubmit={searchListing}>
                <h2>Enter Listing Code</h2>
                <input type='text' maxLength={6} name='code' id='code' value={searchID} onChange={onSearchChange} placeholder='Search Listing' className='mb-3' />
                {ListingNotFound && <p className='text-red-500'>{Error}</p>}
                <button type='submit' className='btn uppercase  w-full'>
                  submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewListing;
