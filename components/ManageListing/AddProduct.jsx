import { useState } from 'react';
import Image from 'next/image';
import imgData from '@/components/data.json';
import Loader from '../Loader';

const AddProduct = ({ userLoggedIn, ListingURL, ListingType, onProductAdd }) => {
  const [blnShowLoader, setblnShowLoader] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [error, setError] = useState(false);
  const [ImageFile, setImageFile] = useState(null);
  const [ImageURL, setImageURL] = useState('');
  const [ImageSrc, SetImageSrc] = useState(imgData.poster_img_v);
  const [ProductTitle, setProductTitle] = useState('');
  const [ProductDesc, setProductDesc] = useState('');
  const [CTAText, setCTAText] = useState('');
  const [CTALink, setCTALink] = useState('');
  const uploadProduct = async (event) => {
    event.preventDefault();
    if (ProductTitle === '' || (ImageURL === '' && ImageFile === null)) {
      setError(true);
      setResMessage('Please provide product title and image.');
      setTimeout(() => {
        setError(false);
        setResMessage('');
      }, 2000);
      return false;
    }
    setblnShowLoader(true);

    const formData = new FormData();
    formData.append('email', userLoggedIn);
    formData.append('listingTypeUrl', ListingURL);
    formData.append('listingType', ListingType);
    formData.append('image', ImageFile);
    formData.append('image_url', ImageURL);
    formData.append('product_title', ProductTitle);
    formData.append('product_desc', ProductDesc);
    formData.append('cta_text', CTAText);
    formData.append('cta_link', CTALink);
    formData.append('product_add', true);

    try {
      const data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/claim-listing/vendor_product.php', {
        method: 'post',
        body: formData,
      });
      const uploadedProduct = await data.json();

      if (uploadedProduct) {
        if (uploadedProduct.error !== '') {
          setError(true);
        } else {
          setProductTitle('');
          setProductDesc('');
          setCTAText('');
          setCTALink('');
          onProductAdd(uploadedProduct.products_services);
          removeImage();
        }
        setResMessage(uploadedProduct.note);
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

  const uploadPicture = (e) => {
    e.preventDefault();
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
    $('.vendproduct_add input[type="file"]').val('');
    SetImageSrc(imgData.poster_img_v);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadProduct(e);
      }}
      className='pvr'>
      <div className='vendproduct_add df fww just-between'>
        <div className='vdadd_left'>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Product Name
            </label>
            <div className='from_fieldbox'>
              <input
                type='text'
                name='product_title'
                placeholder='Enter Product Name'
                value={ProductTitle}
                onChange={(e) => {
                  setProductTitle(e.target.value);
                }}
                className='proinputfield'
              />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Product Description {/* (80/150 Character) */}
            </label>
            <div className='from_fieldbox'>
              <textarea
                name='product_desc'
                id=''
                cols='30'
                rows='5'
                value={ProductDesc}
                onChange={(e) => {
                  setProductDesc(e.target.value);
                }}
                className='proinputfield'
                placeholder='Enter Description'></textarea>
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Call To Action Text
            </label>
            <div className='from_fieldbox'>
              <input
                type='text'
                name='CTAText'
                placeholder='Explore Product'
                value={CTAText}
                onChange={(e) => {
                  setCTAText(e.target.value);
                }}
                className='proinputfield'
              />
            </div>
          </div>
          <div className='profile_field'>
            <label htmlFor='' className='labeltxt'>
              Product Page Link
            </label>
            <div className='from_fieldbox'>
              <input
                type='text'
                name='CTALink'
                placeholder='Enter Page Link'
                value={CTALink}
                onChange={(e) => {
                  setCTALink(e.target.value);
                }}
                className='proinputfield'
              />
            </div>
          </div>
        </div>
        <div className='vdadd_right'>
          <div className='proimgbox df fww potrate'>
            <figure className=''>
              <Image src={ImageSrc} width='250' height='153' priority={true} alt='' className='' />
            </figure>
            <div className='proimginfo'>
              <div className='imginurl'>
                <div className='halfbox'>
                  <label className='greytxt'>Choose, Paste, Or Drag And Drop A File Here</label>
                  <input type='file' name='image' onChange={uploadPicture} />

                  <span className='imgsizing greytxt'>
                    <small>(Supported Image Types: JPG, PNG Suggested Max File Size: 2MB )</small>
                  </span>
                </div>
                <div className='halfbox'>
                  <label className='greytxt'>Or Enter Direct Image URL</label>
                  <input type='text' value={ImageURL} onChange={(e) => setImageURL(e.target.value)} placeholder='Add Image Url' className='dblock' />
                </div>
                {/* <button className='ghostbtn goldbtn uppercase' type='submit' name='upload image'>
                  upload image
                </button> */}
                <span className='redtxt removeimg pointer' onClick={removeImage}>
                  Remove Image <i className='fas fa-trash'></i>
                </span>
              </div>{' '}
            </div>
          </div>
        </div>
        <div className='profile_field w100'>
          <button className='ghostbtn uppercase goldbtn' type='submit'>
            Add to Listing
          </button>
        </div>
      </div>
      {blnShowLoader && (
        <div className='managloading container'>
          <div className='lodarhight'>
            <Loader />
          </div>
        </div>
      )}
      <div className='text-center'>{resMessage !== '' && <div className={error ? 'errormsg' : 'successmsg'}> {resMessage}</div>}</div>
    </form>
  );
};

export default AddProduct;
