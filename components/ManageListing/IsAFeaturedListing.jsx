import Link from 'next/link';

const IsAFeaturedListing = ({ data }) => {
  return (
    <section className='listingupgrad '>
      <div className='container pvr'>
        <p
          dangerouslySetInnerHTML={{
            __html: data.featured_content_title,
          }}></p>
        {!data.is_featured && (
          <Link href='/get-featured/' className='btn uppercase'>
            become a featured listing
          </Link>
        )}
      </div>
    </section>
  );
};

export default IsAFeaturedListing;
