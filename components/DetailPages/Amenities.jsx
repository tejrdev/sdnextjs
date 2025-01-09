import Image from 'next/image';

import Food_Concessioons from '@/public/aminities/Food-and-Concessions.svg';
import IMAX from '@/public/aminities/imax.svg';
import Other from '@/public/aminities/Premium-large-format.png';
import Laser from '@/public/aminities/laser-projection.svg';
import threeD from '@/public/aminities/3d.svg';
import realD from '@/public/aminities/real-3d.svg';
import Film_mm from '@/public/aminities/35-mm.svg';
import Film_mm70 from '@/public/aminities/70-mm.svg';
import Dolby from '@/public/aminities/dolby.svg';
import Recliner from '@/public/aminities/recliner.svg';
import fourDx_Immersive from '@/public/aminities/4dx.svg';
import Beer_Service from '@/public/aminities/beer-wine-alcohol.svg';
import DineIn_Foodservice from '@/public/aminities/dine-in.svg';
import Arcade from '@/public/aminities/arcade.svg';
import Bowling from '@/public/aminities/bowling.svg';
import Party_Room from '@/public/aminities/party.svg';
import On_line from '@/public/aminities/online-ticketing.svg';
import Kiosk from '@/public/aminities/kiosk.svg';
import Cash_Only from '@/public/aminities/only-cash.svg';
import Wheelchair_Accessible from '@/public/aminities/wheelchair.svg';
import Assisted_Listening from '@/public/aminities/Assisted-Listening.svg';
import Sensory from '@/public/aminities/Sensory-Friendly-Screenings.svg';
import Parking from '@/public/aminities/parking.svg';
import screenX from '@/public/aminities/screen-X.png';
import stadiumSeat from '@/public/aminities/stadium-seating.png';
import DBOX from '@/public/aminities/DBOX.svg';

const Amenities = ({ aminity }) => {
  const Amenitiesicon = {
    'Full Bar': Food_Concessioons,
    'IMAX': IMAX,
    'screen X': screenX,
    'Other PLF': Other,
    'Laser': Laser,
    '3D': threeD,
    'RealD 3D': realD,
    '35mm Film': Film_mm,
    '70mm Film': Film_mm70,
    'Dolby': Dolby,
    'Recliner': Recliner,
    'Stadium': stadiumSeat,
    '4DX': fourDx_Immersive,
    'Beer Wine': Beer_Service,
    'Dine-In': DineIn_Foodservice,
    'Arcade': Arcade,
    'Bowling': Bowling,
    'Party Room': Party_Room,
    'On-line': On_line,
    'Kiosk': Kiosk,
    'Cash Only': Cash_Only,
    'Wheelchair Accessible': Wheelchair_Accessible,
    'Assisted Listening': Assisted_Listening,
    'Sensory-Friendly Screenings': Sensory,
    'Free Parking': Parking,
    'D-box': DBOX,
  };

  return (
    <section className='amenitiesinfo toplinesec'>
      <div className='container'>
        <div className='top_txt df fww just-between'>
          <h2>
            Amenities <i className='fal fa-angle-right'></i>
          </h2>
        </div>
        <div className='amenitiesbox grid text-center'>
          {aminity.map((item, i) => (
            <div className='amenitiesitem' key={i}>
              <figure>
                <Image src={Amenitiesicon[item.value]} alt={item.value} />
                <figcaption className='text-center'>{item.label}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
