import { useState } from 'react';
import Image from 'next/image';
import ImageUpload from './ImageUpload';
import promoPoster from '@/public/noimg_lanscrap.jpg';

const SingleImage = ({ userLoggedIn, ListingURL, ListingType, image, requestFor }) => {
  const [profileImage, setProfileImage] = useState(image ? image : promoPoster);

  const onImageUpload = (ImageURL) => {
    setProfileImage(ImageURL);
  };
  return (
    <section className='adminprofileimg toplinesec'>
      <div className='container'>
        <div className='top_txt'>
          <h2 className='h3 m-0'>{requestFor === 'promoImage' ? 'Promo Image' : 'Profile Image'}</h2>
        </div>
        <div className='proimgbox df fww potrate'>
          <figure className={requestFor === 'promoImage' ? 'promoimginfo' : 'pvr '}>
            <Image src={profileImage} width={requestFor === 'promoImage' ? 970 : 190} height={requestFor === 'promoImage' ? 250 : 275} priority={true} alt='' className={requestFor === 'promoImage' ? '' : 'objctimg_box'} />
          </figure>
          <div className='proimginfo'>
            <ImageUpload requestFrom={requestFor} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} onImageUpload={onImageUpload} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleImage;
