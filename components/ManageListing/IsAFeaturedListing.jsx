import Link from 'next/link';

const IsAFeaturedListing = ({ data, ListingURL }) => {
  return (
    <section className='listingupgrad '>
      <div className='container pvr border-t border-gray-400 pt-4'>
        <p
          dangerouslySetInnerHTML={{
            __html: data.featured_content_title,
          }}></p>
        <div className='ctas space-x-3'>
          {!data.is_featured && (
            <Link href='/get-featured/' className='btn uppercase my-2'>
              become a featured listing
            </Link>
          )}
          <Link href={ListingURL.replace(process.env.NEXT_PUBLIC_FRONTEND_URL, window.location.origin) + '?qrclaim=true'} target='_blank' className='btn uppercase my-2'>
            View Listing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IsAFeaturedListing;
