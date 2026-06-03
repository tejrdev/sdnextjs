import Image from 'next/image';
import sponcerads from '@/public/images/Insight_cinema_solutions_banners_800x200.jpg';
import sponceradsmobile from '@/public/images/Insight_cinema_solutions_banners_300x250mob.jpg';

const SponcerAds = ({ showads }) => {
  return (
    <div className='sponcerads'>
      <div className='container'>
        <figure className='text-center mt-2 border-t border-gray-300 pt-3 sm:block hidden'>
          <figcaption className='text-center mb-2 font-semibold capitalize'>
            {showads ? 'Review Listing Campaign sponsored by ' : 'Sponsored by '} <span className=' block sm:inline'>INSIGHT Cinema Solutions</span>
          </figcaption>
          <a href='https://insightcinemasolutions.com/?src=screendollars' target='_blank'>
            <img loading='lazy' src={sponcerads.src} alt='sponcerads' width={800} height={sponcerads.height} />
          </a>
        </figure>
        <figure className='text-center  mt-3 border-t border-gray-300 pt-3 sm:hidden'>
          <figcaption className='text-center mb-2 font-semibold capitalize'>
            {showads ? 'Review Listing Campaign sponsored by ' : 'Sponsored by '} <span className=' block sm:inline text-lg'>INSIGHT Cinema Solutions</span>
          </figcaption>
          <a href='https://insightcinemasolutions.com/?src=screendollars' target='_blank'>
            <img loading='lazy' src={sponceradsmobile.src} alt='sponcerads' width={300} height={sponcerads.height} />
          </a>
        </figure>
      </div>
    </div>
  );
};

export default SponcerAds;
