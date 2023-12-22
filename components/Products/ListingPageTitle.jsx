import Image from 'next/image';

const ListingPageTitle = ({ titledisc, media }) => {
  return (
    <section className='listingpageTitle secspace'>
      <div className='container'>
        <div className='listinginner df fww'>
          {media && (
            <figure>
              <Image src={media} alt='' width={741} height={185} />
            </figure>
          )}

          <div className='listingtitleDisc'>
            <p className='uppercase'>{titledisc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingPageTitle;
