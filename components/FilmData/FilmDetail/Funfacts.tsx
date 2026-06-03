import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const Funfacts = ({ data }) => {
   const SliderSetting = {
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 300,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      dots: true,
      arrows: false,
   };
   return (
      <div className='funf bg-gold-yellow py-6 md:py-8 lg:py-12 mt-4 md:mt-8'>
         <div className="container">
            <div className="top_txt">
               <h2>Fun Facts</h2>
            </div>
            <div className="detail">
               <Slider {...SliderSetting} className='funf_slider slick-dotted'>
                  {data?.map((item, index: number) =>
                     <div className='border border-gray-400 rounded-lg p-4 my-4' key={index}>
                        <p className='mb-0' dangerouslySetInnerHTML={{ __html: item.facts }} />
                     </div>
                  )}
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default Funfacts