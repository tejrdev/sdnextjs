import Link from 'next/link';

const onBackClick = () => {
  history.back();
};

const Pagetitle = (props) => {
  return (
    <section className={' secspace ' + props.requestFrom === 'sunday_nwes' ? '' : 'protitle'}>
      <div className='container'>
        {props.back && (
          <div className='backlink'>
            <Link href={props.back}>
              <i className='far fa-long-arrow-left'></i>{' '}
              <span>
                <strong>Back To Newsletters</strong>
              </span>
            </Link>
          </div>
        )}
        {props.requestFrom === 'sunday_nwes' ? (
          ''
        ) : (
          <div className='text-center protitle'>
            <h4 className='protag uppercase'>
              <strong>pro exclusive</strong>
            </h4>
          </div>
        )}
        <div className='top_txt text-center'>
          <h1 className='uppercase h2' dangerouslySetInnerHTML={{ __html: props.heading }}></h1>
          <div className='disc' dangerouslySetInnerHTML={{ __html: props.disc }}></div>
        </div>
        {props.button && (
          <div className='ctabtn text-center'>
            <Link href={props.button.link} className='btn uppercase'>
              {props.button.name}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pagetitle;
