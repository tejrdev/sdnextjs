import { useState } from 'react';
import Loader from '../Loader';
import imgData from '@/components/data.json';
import promoPoster from '@/public/noimg_lanscrap.jpg';

const ImageUpload = ({ requestFrom, userLoggedIn, ListingURL, ListingType, onImageUpload, onSave }) => {
  const [blnShowLoader, setblnShowLoader] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [error, setError] = useState(false);
  const [ImageFile, setImageFile] = useState(null);
  const [ImageURL, setImageURL] = useState('');
  const [ImageCaption, setImageCaption] = useState('');

  let APIEndpoint = process.env.NEXT_PUBLIC_SD_API + '/claim-listing/claim_gallery.php';
  if (requestFrom === 'promoImage') {
    APIEndpoint = process.env.NEXT_PUBLIC_SD_API + '/claim-listing/claim_promo.php';
  }
  const SetImageSrc = (src) => {
    onImageUpload(src);
  };

  const setImageAction = async (event, requestFrom, removePromoImage) => {
    event.preventDefault();
    if (ImageURL === '' && ImageFile === null && !removePromoImage) return;
    setblnShowLoader(true);
    try {
      const formData = new FormData();
      formData.append('email', userLoggedIn);
      formData.append('listingTypeUrl', ListingURL);
      formData.append('listingType', ListingType);
      formData.append('image', ImageFile);
      formData.append('image_url', ImageURL);
      // formData.append('requestFrom', requestFrom);

      removePromoImage ? formData.append('remove_promo', removePromoImage) : formData.append('image_add', true);

      if (requestFrom === 'GalleryImage') {
        formData.append('caption', ImageCaption);
      } else if (requestFrom === 'promoImage') {
        formData.append('promo_image', true);
      } else {
        formData.append('profile_image', true);
      }

      const data = await fetch(APIEndpoint, {
        method: 'post',
        body: formData,
      });
      const uploadedImage = await data.json();
      if (uploadedImage) {
        if (uploadedImage.error !== '') {
          setError(true);
        }
        if (requestFrom === 'GalleryImage') {
          onSave(uploadedImage.gallery_images);
          removeImage();
        } else if (requestFrom === 'promoImage') {
          $('.adminprofileimg .promoimg input[type="file"]').val('');
        } else {
          $('.adminprofileimg .profileimg input[type="file"]').val('');
        }
        setResMessage(uploadedImage.note);
        setTimeout(() => {
          setResMessage('');
          setImageFile(null);
        }, 2000);
      } else {
        console.log('Error Found');
      }
    } catch (err) {
      console.error(err);
    }
    setblnShowLoader(false);
  };

  const uploadPicture = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      var pattern = /image-*/;

      //check for file type
      if (!file.type.match(pattern)) {
        alert('Invalid format, Please select only image files');
        removeImage();
        return;
      }

      //check for file size
      if (file.size > 2 * 1000 * 1000) {
        alert('Image size should be less than 2 mb');
        removeImage();
        return;
      }
      setImageFile(e.target.files[0]);
      SetImageSrc(URL.createObjectURL(e.target.files[0]));
    }
  };
  const removeImage = (e) => {
    setImageFile(null);
    setImageURL('');
    setImageCaption('');
    if (requestFrom === 'GalleryImage') {
      $('.imageaddblock input[type="file"]').val('');
      SetImageSrc(imgData.poster_img_v);
    } else if (requestFrom === 'promoImage') {
      $('.adminprofileimg .promoimg input[type="file"]').val('');
      e && setImageAction(e, requestFrom, true);
      SetImageSrc(promoPoster);
    } else {
      $('.adminprofileimg .profileimg input[type="file"]').val('');
      SetImageSrc(imgData.poster_img_v);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          setImageAction(e, requestFrom);
        }}
        className={(requestFrom === 'promoImage' ? 'promoimg ' : 'profileimg ') + 'pvr'}>
        <div className='imginurl'>
          <div className='halfbox'>
            <label className='greytxt'>Choose, Paste, Or Drag And Drop A File Here</label>
            <input
              type='file'
              name='image'
              onChange={(e) => {
                uploadPicture(e, requestFrom);
              }}
            />

            <span className='imgsizing greytxt'>
              <small>(Supported Image Types: JPG, PNG Suggested Max File Size: 2MB , Dimension: 970X210 px)</small>
            </span>
          </div>
          <div className='halfbox'>
            <label className='greytxt'>Or Enter Direct Image URL</label>
            <input type='text' value={ImageURL} onChange={(e) => setImageURL(e.target.value)} placeholder='Add Image Url' className='dblock' />
          </div>
          {(requestFrom === 'profileImage' || requestFrom === 'promoImage' || requestFrom === 'vendor') && (
            <>
              <button className='ghostbtn goldbtn uppercase' type='submit' name='upload image'>
                upload image
              </button>
              <span className='redtxt removeimg pointer' onClick={removeImage}>
                Remove Image <i className='fas fa-trash'></i>
              </span>
            </>
          )}
        </div>
        {requestFrom === 'GalleryImage' && (
          <>
            <div className='imgincaption halfbox'>
              <label htmlFor='' className='greytxt'>
                Image Caption
              </label>
              <input type='text' placeholder='Add Image Caption' value={ImageCaption} onChange={(e) => setImageCaption(e.target.value)} className='dblock' />
              <button className='ghostbtn goldbtn uppercase' type='submit' name='upload image'>
                Upload image
              </button>
            </div>
            <span className='redtxt removeimg dblock' onClick={removeImage}>
              Remove Image <i className='fas fa-trash'></i>
            </span>
          </>
        )}
        {blnShowLoader && (
          <div className='managloading container'>
            <div className='lodarhight'>
              <Loader />
            </div>
          </div>
        )}
        <div className='text-center'>{resMessage !== '' && <div className={error ? 'errormsg' : 'successmsg'}> {resMessage}</div>}</div>
      </form>
    </>
  );
};

export default ImageUpload;
