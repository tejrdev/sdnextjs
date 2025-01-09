import Link from 'next/link';

const AddListing = () => {
  return (
    <div className='addbusiness py-5 border-t border-b border-gray-300 my-8'>
      <div className='container flex flex-wrap justify-between max-w-4xl'>
        <div className='addbsinfo df fww  '>
          <figure className='buicobox'>
            <img src={process.env.NEXT_PUBLIC_MENU_URL + 'wp-content/themes/screendollars-live/assets/images/buico.svg'} alt='' />
          </figure>
          <div className='addbs_detail'>
            <h4>Can't find your listing?</h4>
            <p>It’s both free and easy to add a new listing to the Screendollars Directory.</p>
          </div>
        </div>
        <div className='bus_btn sm:mt-2'>
          <Link href='/contact-us/' className='btn'>
            Add listing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
