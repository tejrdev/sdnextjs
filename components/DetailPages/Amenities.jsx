import Image from 'next/image';

import Full_Bar from '@/public/aminities/Food-and-Concessions.svg';
import IMAX from '@/public/aminities/imax.svg';
import Premium_Large_Format from '@/public/aminities/Premium-large-format.svg';
import Laser from '@/public/aminities/laser-projection.svg';
import threeD from '@/public/aminities/3d.svg';
import RealD_3D from '@/public/aminities/real-3d.svg';
import Film_mm from '@/public/aminities/35_70 mm.svg';
import Film_mm70 from '@/public/aminities/70-mm.svg';
import Dolby_Atmos from '@/public/aminities/dolby_atoms.svg';
import Dolby_Cinema from '@/public/aminities/dolby_cinema.svg';
import Recliner from '@/public/aminities/recliner.svg';
import fourDx from '@/public/aminities/4dx.svg';
import Beer_Wine from '@/public/aminities/beer-wine-alcohol.svg';
import Dine_In_Restaurant from '@/public/aminities/dine-in.svg';
import Arcade from '@/public/aminities/arcade.svg';
import Bowling from '@/public/aminities/bowling.svg';
import Party_Space from '@/public/aminities/party.svg';
import Mobile_Online from '@/public/aminities/online-ticketing.svg';
import Kiosk from '@/public/aminities/kiosk.svg';
import Cash_Only from '@/public/aminities/only-cash.svg';
import Wheelchair_Access from '@/public/aminities/wheelchair.svg';
import Assisted_Listening from '@/public/aminities/Assisted-Listening.svg';
import Sensory_Friendly_Screenings from '@/public/aminities/Sensory-Friendly-Screenings.svg';
import Free_Parking from '@/public/aminities/parking.svg';
import ScreenX from '@/public/aminities/screen-X.svg';
import Stadium from '@/public/aminities/stadium-seating.svg';
import D_BOX from '@/public/aminities/DBOX.svg';
import dtsx from '@/public/aminities/DtsX.svg';
import Sony_4K from '@/public/aminities/sony_4K.svg';
import fourD_E_Motion from '@/public/aminities/4D-E-Motion.svg';
import Heated_Seats from '@/public/aminities/Heated_seats.svg';
import MX4D from '@/public/aminities/MX4D.svg';
import Xtreme from '@/public/aminities/Xtreme.svg';
import Membership_Rewards from '@/public/aminities/Membership_Rewards_A.svg';
import Reserved_Seating from '@/public/aminities/Reserved_Seating.svg';
import Delivery from '@/public/aminities/Delivery.svg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';



const Amenities = ({ aminity }) => {
  const Amenitiesicon = {
    'Full Bar': Full_Bar,
    'IMAX': IMAX,
    'ScreenX': ScreenX,
    'Premium Large Format': Premium_Large_Format,
    'Laser': Laser,
    '3D': threeD,
    'RealD 3D': RealD_3D,
    'Classic 35/70mm Film': Film_mm,
    '70mm Film': Film_mm70,
    'Dolby Atmos': Dolby_Atmos,
    'Dolby Cinema': Dolby_Cinema,
    'Recliner': Recliner,
    'Stadium': Stadium,
    '4DX': fourDx,
    'Beer/Wine': Beer_Wine,
    'Dine-In/Restaurant': Dine_In_Restaurant,
    'Arcade': Arcade,
    'Bowling': Bowling,
    'Party Space': Party_Space,
    'Mobile/Online': Mobile_Online,
    'Kiosk': Kiosk,
    'Cash Only': Cash_Only,
    'Wheelchair Access': Wheelchair_Access,
    'Assisted Listening': Assisted_Listening,
    'Sensory-Friendly': Sensory_Friendly_Screenings,
    'Free Parking': Free_Parking,
    'D-Box': D_BOX,
    'DTS:X': dtsx,
    'Sony 4K': Sony_4K,
    '4D E-Motion': fourD_E_Motion,
    'Heated Seats': Heated_Seats,
    'MX4D': MX4D,
    'Xtreme': Xtreme,
    'Membership Rewards': Membership_Rewards,
    'Reserved Seating': Reserved_Seating,
    'Delivery': Delivery,
  };

  const ameniticount = aminity?.filter(item => item.value !== "Other")?.length;

  const SliderSetting = {
    slidesToShow: 10,
    slidesToScroll: 10,
    speed: 300,
    infinite: ameniticount > 10,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <section className='amenitiesinfo bg-[#ededed] py-4 lg:py-8 px-5 lg:px-0'>
      {/* {JSON.stringify(newaminity, null, 2)} */}
      <div className='container'>
        <div className='top_txt df fww just-between'>
          <h2> Amenities </h2>
        </div>
        <Slider {...SliderSetting} className='amenitiesbox grid text-center roundslickarrowlong'>
          {aminity?.filter(item => item.value !== "Other")?.map((item, i) => (
            <div className='amenitiesitem px-2' key={i}>
              {/* {console.log(item.label, Amenitiesicon[item?.value])} */}
              <figure>
                <Image src={Amenitiesicon[item?.label]} alt={item.label} />
                <figcaption className='text-center'>{item.label}</figcaption>
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Amenities;
