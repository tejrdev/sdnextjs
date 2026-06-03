import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import { useState } from 'react';
import { TileCard } from './TileCardType';
import BoxOfficeTileCard from './BoxOfficeTilleCard';
import { TopTitle, AllYearSummery } from '../../../../types/boxofficeresults';

const Allyearsummery = ({ data }: AllYearSummery) => {
  const [open, setOpen] = useState(new Array<boolean>(data.length).fill(false));
  const SliderSetting = {
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 300,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 526,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {data.map((item, index) => (
        <section className={'boxf_ysummery border border-solid border-gray-400 rounded-md p-2 sm:p-4 mb-7'} key={index}>
          <div className='topsumry grid lg:flex mb-5 pb-5 border-b border-solid space-y-5 auto-fill-[120px] sm:auto-fill-[200px]'>
            <h2 className='text-gold text-center max-w-36 flex items-center justify-center sm:justify-normal '>{item.year}</h2>
            <div className='text-center '>
              <p className='m-0'>Dates / Film Weeks</p>
              <strong>
                {item.year_date} / {item.total_week}
              </strong>
            </div>
            <div className='text-center lg:text-left max-w-44 sm:px-7 px-2'>
              <p className='m-0'>±LY</p>
              <strong className={'text-green-400' + (item.ly < 0 ? ' redtxt' : '')}>{item.ly && parseFloat(item.ly.toString()).toFixed(1)} %</strong>
            </div>
            <div className='text-center lg:text-left'>
              <p className='m-0'>Releases To-Date</p>
              <strong>{item.movies_total}</strong>
            </div>
            <div className='text-center'>
              <p className='m-0'>Total To-Date</p>
              <strong>${item.total && item.total.toLocaleString()}</strong>
            </div>
            <div className='text-center lg:text-left max-w-44'>
              <p
                className='m-0'
                onClick={() => {
                  const arr = open;
                  arr[index] = !arr[index];
                  setOpen([...arr]);
                }}>
                <strong className='seeresult text-gold relative pl-5 underline block leading-snug cursor-pointer'>See Quarterly Results</strong>
              </p>
            </div>
          </div>
          <div className='top_movies'>
            <h3>Top Titles</h3>
            <div className='topmovie_slider relative slicktoparrow '>
              <Slider {...SliderSetting} className='abtinfo_slider roundslickarrow'>
                {item?.top_movies?.map((movie: TopTitle, i: number) => (
                  <div className='card px-2 pb-[2px]' key={i}>
                    <div className='cardin border border-gray-400 rounded-md p-3'>
                      {movie.link && (
                        <h5 className='mb-2'>
                          <Link href={movie.link} title={`${movie.title} | Rating: ${movie?.rating} | Distributor: ${movie?.distributor}`} className='block text-black hover:text-blue'>
                            {i + 1}-{movie.title}
                          </Link>
                        </h5>
                      )}

                      {/* <p>{movie.distributor}</p> */}
                      <p className='m-0'>${movie.total && parseInt(movie.total).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className={'yersqurters boxofice_cards grid gap-2 sm:gap-5 ' + (open[index] ? 'open mt-5 pt-5 border-t border-solid' : '')}>
              {item.quarter?.map((q_data, i) => {
                if (q_data.data.total === null) return null;
                return <BoxOfficeTileCard currentLayout={'AY'} item={q_data.data} toggleon={false} index={i} isOpen={open[index]} />;
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Allyearsummery;
