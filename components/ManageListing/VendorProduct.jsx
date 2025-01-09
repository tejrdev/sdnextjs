import { useState } from 'react';
import AddProduct from './AddProduct';
import Loader from '../Loader';

const VendorProduct = ({ data, userLoggedIn, ListingURL, ListingType, ReRenderComponent, secTitle }) => {
  const [dragStartIndex, setDragStartIndex] = useState(-1);
  const [blnShowLoader, setblnShowLoader] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [error, setError] = useState(false);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [sectionTitle, setSectionTitle] = useState(secTitle ? secTitle : 'Products');

  const handleDragStart = (index, e) => {
    setDragStartIndex(index);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const bx = data;
    const sourceData = bx[dragStartIndex];
    bx[dragStartIndex] = bx[index];
    bx[index] = sourceData;
    ReRenderComponent(bx);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //wil be called from add product
  const updateProducts = (products) => {
    ReRenderComponent(products);
  };

  //to save the ordering of products
  const saveProducts = async (e) => {
    e.preventDefault();
    $('.warningtxt').addClass('hide');
    setblnShowLoader(true);
    const formData = new FormData();
    formData.append('email', userLoggedIn);
    formData.append('listingTypeUrl', ListingURL);
    formData.append('listingType', ListingType);
    formData.append('product_filter', true);
    formData.append('title_of_products', sectionTitle);
    formData.append('products_services', JSON.stringify(data));
    formData.append('deletedImageIds', deletedImageIds);

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
          // console.log(uploadedProduct);
          setDeletedImageIds([]);
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

  //to remove the product
  const RemoveProduct = (e, index) => {
    const products = data;
    const imageId = products[index].image_id;
    products.splice(index, 1);
    ReRenderComponent(products);
    setDeletedImageIds([...deletedImageIds, imageId]);
    $('.warningtxt').removeClass('hide');
  };

  return (
    <section className='vendorproduct toplinesec'>
      <div className='container'>
        <div className='top_txt'>
          <h2 className='h3 m-0'>Products & Services</h2>
        </div>
        <div className='manage_vendorsectitle'>
          <label htmlFor=''>Section Title</label>
          <input
            type='text'
            placeholder='Products'
            value={sectionTitle}
            onChange={(e) => {
              setSectionTitle(e.target.value);
            }}
          />
        </div>
        <div className='manageservices_listing'>
          <h2 className='h3'>
            Products & Services Listing <small>(Drag &amp; Drop Media To Change The Order...)</small>
          </h2>
        </div>
        <div className='manageservices_listingbox grid'>
          {data.map((item, index) => {
            return (
              <div className='manageservices_item' image_id={item.image_id} draggable='true' key={index} onDragStart={(e) => handleDragStart(index, e)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(index, e)}>
                <a href={item.url} className='blacktxt'>
                  <figure>
                    <img src={item.image} alt='' />
                  </figure>
                  <div className='info'>
                    <h4>{item.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                  </div>
                  <span className='btn'>{item.url_label}</span>
                </a>

                <div className='text-center'>
                  <span
                    className='redtxt removeimg pointer '
                    onClick={(e) => {
                      RemoveProduct(e, index);
                    }}>
                    Remove Product <i className='fas fa-trash'></i>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-100 redtxt text-center hide warningtxt'>
          <h5 className='m-0'>Save the modifications to update the products.</h5>
        </div>
        <div className='galleryupdatebtn text-center'>
          <button className='submitbtn btn' name='Update gallery' onClick={saveProducts}>
            Save
          </button>
        </div>
        {blnShowLoader && (
          <div className='managloading container'>
            <div className='lodarhight'>
              <Loader />
            </div>
          </div>
        )}
        <div className='text-center'>{resMessage !== '' && <div className={error ? 'errormsg' : 'successmsg'}> {resMessage}</div>}</div>
        <AddProduct userLoggedIn={userLoggedIn} ListingURL={ListingURL} ListingType={ListingType} onProductAdd={updateProducts} />
      </div>
    </section>
  );
};

export default VendorProduct;
