import { useState } from 'react';
import Image from 'next/image';
import ImageUpload from './ImageUpload';
import Draggallery from '@/components/adminview/gallerydragdrop';
import { JSONData } from '@/components/shared/JSONData';
import Loader from '../Loader';

const ImageGallery = ({ data, userLoggedIn, ListingURL, ListingType, requestFrom }) => {
  const [GalleryImages, setGalleryImages] = useState(data.gallery_images); //requestFrom === 'promoImage' ? data.promo_imgs :
  const [AddGalleryImage, setAddGalleryImage] = useState(JSONData.poster_img_v);
  const [blnShowLoader, setblnShowLoader] = useState(false);
  const [blnUpdateGallery, setUpdateGallery] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [error, setError] = useState(false);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  // if (requestFrom === 'promoImage') {
  //   APIEndpoint = process.env.NEXT_PUBLIC_SD_API + '/claim-listing/claim_promo.php';
  // }
  const updateImageGallery = (src) => {
    setAddGalleryImage(src);
  };

  const handleimgupdate = (boxes, deleteIds) => {
    setGalleryImages(boxes);
    setDeletedImageIds([...deletedImageIds, deleteIds]);
  };
  const handleimgAdd = (boxes) => {
    setUpdateGallery(true);
    setGalleryImages(boxes);
    setAddGalleryImage(JSONData.poster_img_v);
    setTimeout(() => {
      setUpdateGallery(false);
    }, 3000);
  };
  const updateGallery = async () => {
    setblnShowLoader(true);
    $('.warningtxt').addClass('hide');
    const formData = new FormData();
    formData.append('email', userLoggedIn);
    formData.append('listingTypeUrl', ListingURL);
    formData.append('listingType', ListingType);
    formData.append('deletedImageIds', deletedImageIds);
    formData.append('gallery_images', JSON.stringify(GalleryImages));
    formData.append('gallery_filter', true);
    // if (requestFrom === 'promoImage') {
    //   formData.append('promo_images', JSON.stringify(GalleryImages));
    //   formData.append('promo_filter', true);
    // } else {
    //   formData.append('gallery_images', JSON.stringify(GalleryImages));
    //   formData.append('gallery_filter', true);
    // }
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/claim_gallery.php', {
        method: 'post',
        body: formData,
      });
      const uploadedImage = await data.json();

      if (uploadedImage) {
        if (uploadedImage.error !== '') {
          setError(true);
        } else {
          setGalleryImages(uploadedImage.gallery_images);
          // if (requestFrom === 'promoImage') {
          //   setGalleryImages(uploadedImage.promo_imgs);
          // } else {
          //   setGalleryImages(uploadedImage.gallery_images);
          // }
        }
        setResMessage(uploadedImage.note);
        setTimeout(() => {
          setResMessage('');
        }, 2000);
      } else {
        setError(true);
        setResMessage('something went wrong, Please try again!');
      }
    } catch (err) {
      console.error(err);
    }
    setblnShowLoader(false);
  };

  return (
    <>
      <section className='admingallery toplinesec'>
        <div className='container'>
          <div className='top_txt'>
            <h2 className='h3 m-0'>
              Gallery Images <small>(Drag & Drop Media To Change The Order...)</small>
            </h2>
          </div>
          {GalleryImages && <Draggallery gallery={'imagegallery'} data={GalleryImages} dragupdate={handleimgupdate} updateGallery={blnUpdateGallery} />}

          <div className='w-100 redtxt text-center hide warningtxt'>
            <h5 className='m-0'>Save the modifications to update the gallery.</h5>
          </div>
          <div className='galleryupdatebtn text-center'>
            <button className='submitbtn btn' name='Update gallery' onClick={updateGallery}>
              Save
            </button>
          </div>
          {blnShowLoader && (
            <div className='managloading pvr container' style={{ marginBottom: 40 }}>
              <div className='lodarhight'>
                <Loader />
              </div>
            </div>
          )}
          <div className='text-center'>{resMessage !== '' && <div className={error ? 'errormsg' : 'successmsg'}> {resMessage}</div>}</div>
        </div>
      </section>
      <section className='imageaddblock toplinesec'>
        <div className='container'>
          <div className='top_txt'>
            <h2 className='h3 m-0'>Add Gallery Image</h2>
          </div>
          <div className='adminimginputs df fww'>
            <figure className='pvr'>
              <Image src={AddGalleryImage} width='190' height='275' alt='' className='objctimg_box' />
            </figure>
            <div className='imginputsinfo proimginfo'>
              <ImageUpload requestFrom={requestFrom} userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} onImageUpload={updateImageGallery} onSave={handleimgAdd} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageGallery;
