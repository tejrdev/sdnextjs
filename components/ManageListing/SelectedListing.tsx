import { FaTag } from 'react-icons/fa';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import { JSONData } from '@/components/shared/JSONData';

type ActiveHandler = (id: number, object: any) => void;

const SelectedListing = ({ data, callToAction, selectedSlider }) => {
  const activeHandler: ActiveHandler = (i, claim) => {
    callToAction(claim, i);
  };
  const length = (data && data.filter((item: any) => item.approved).length) || 0;
  const SliderSetting = {
    slidesToShow: 4,
    //  speed: 300,
    infinite: length > 4,
    autoplay: false,
    //  autoplaySpeed: 5000,
    //  pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className='selectdlisting my-5'>
      <div className='container'>
        <Slider {...SliderSetting} className='listingsbox roundslickarrow'>
          {data?.map((cardinfo: any, i: number) => {
            if (!cardinfo.approved) return;
            let claimType = '';
            switch (cardinfo.claim_type) {
              case 'theatres':
                claimType = 'Theatre';
                break;
              case 'exhibitors':
                claimType = 'Exhibitor';
                break;
              case 'vendors':
                claimType = 'Vendor';
                break;
              case 'distributors':
                claimType = 'Distributor';
                break;
              case 'film-festivals':
                claimType = 'Film Festival';
                break;
              default:
                //do nothing
                break;
            }
            return (
              <div className={`item p-2 `} key={i}>
                <div className={`card flex flex-wrap items-start rounded-md p-3 w-full cursor-pointer relative ${selectedSlider === i ? 'border-2 border-gold' : 'border border-gray-400'} ${cardinfo.is_featured ? 'featured' : ''}`} onClick={() => activeHandler(i, cardinfo)}>
                  {cardinfo.is_featured && <div className='featuredtag -left-1 top-0'>Featured</div>}
                  {cardinfo.label === 'Theatre' ? (
                    <figure className='w-24 relative flex justify-center items-center border border-gray-400 min-h-14 rounded-lg'>
                      <img src={cardinfo?.img !== '' ? cardinfo?.img : JSONData.poster_img_v} alt='' loading='lazy' className='max-h-14 objimg rounded-lg' />
                    </figure>
                  ) : (
                    <figure className='w-24 px-2 py-1 flex justify-center items-center border border-gray-400 min-h-16 rounded-lg'>
                      <img src={cardinfo?.img !== '' ? cardinfo?.img : JSONData.poster_img_v} alt='' loading='lazy' className='max-h-14' />
                    </figure>
                  )}
                  <div className='cardinfo recentcard pl-3 md:pl-5'>
                    <h5 className='line-clamp-1'> {cardinfo.title} </h5>
                    <p className='m-0'>
                      <FaTag className='inline-block text-gray-600 rotate-90 text-xs mb-[2px] mr-1' />
                      {claimType}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default SelectedListing;
