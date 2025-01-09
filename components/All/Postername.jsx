import Link from 'next/link';
import sdplaceholder2 from '../../public/sdplaceholder2.jpg';

const Postername = ({ poster, posteralt = '', hideopen = false }) => {
  return (
    <div className='poster_item max-w-[230px]'>
      <Link href={poster.link}>
        <div className='posterboxcap relative text-center px-2'>
          <figure className='pvr'>
            {/* <img src={poster.img} className='objctimg_box' alt={posteralt} /> */}
            <img src={(poster.img === null || poster.img === 'https://live.screendollars.com/wp-content/uploads/2020/05/no-img.jpg' || poster.img === 'https://live.screendollars.com/wp-content/themes/screendollars-live/assets/images/noimgico.jpg') ? sdplaceholder2.src : poster.img} alt={posteralt} className='objctimg_box' />
          </figure>
          <h6>
            {poster.title}
            {hideopen === true ? "" : <span dangerouslySetInnerHTML={{ __html: poster.release_date }}></span>}
          </h6>
        </div>
      </Link>
    </div>
  );
};

export default Postername;
