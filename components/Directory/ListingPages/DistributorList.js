import { useEffect } from 'react';
import { JSONData } from '@/components/shared/JSONData';
import Link from 'next/link';
import ffnologo from '@/public/images/ffnologo.png';

const DistributorList = ({ data, tag }) => {
  useEffect(() => {
    $('.favheart .fa-heart').click(function () {
      if ($(this).hasClass('fas')) {
        $(this).removeClass('fas').addClass('far').parent().removeClass('redtxt');
      } else {
        $(this).removeClass('far').addClass('fas').parent().addClass('redtxt');
      }
    });
  }, []);

  const divId = tag + '_list_data';
  return (
    <div id={divId} className={tag !== 'theatre' ? 'dirlist grid gap16' : ''}>
      {data &&
        data.map((item, index) => {
          return (
            <div className={'alldist_listbox ' + (tag === 'theatre' ? 'df fww ' : '') + (item.is_featured ? 'featurebox' : '')} key={index}>
              {/* {tag !== 'theatre' ? (
                item.is_featured ? (
                  <h4>
                    <Link href={item.link} title={item.title} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                  </h4>
                ) : null
              ) : null} */}
              {item.is_featured ? <div className={tag === 'theatre' ? 'thfhr featuredtag' : 'featuredtag'}>Featured</div> : null}
              <div className='alldist_media pvr'>
                <Link href={item.link} title={item.title}>
                  <img src={item.img ? item.img : ffnologo.src} alt='' className={tag === 'theatre' ? 'objctimg_box' : ''} loading='lazy' />
                </Link>
              </div>

              <div className='alldist_listiteminfo pvr'>
                <h4>
                  <Link href={item.link} title={item.title} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                  {item.display_drive_in_icon && (
                    <span>
                      <img className='diveiconlist' src={JSONData.drive_in} alt='Drive In' />
                    </span>
                  )}
                </h4>
                {tag === 'distributor' ? (
                  <ul className='df fww tags'>
                    {item.distribution_type.map((singleItem, id) => {
                      return (
                        <li key={id}>
                          <span>{singleItem}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                {tag === 'exhibitor' ? (
                  <>
                    <p className='theater_info'>
                      {item.location && <span>{item.location} Theatres</span>}
                      {item.screens && (
                        <span>
                          , {item.screens} {parseInt(item.screens) > 1 ? 'Screens' : 'Screen'}
                        </span>
                      )}
                      {item.number_of_states && item.number_of_states > 0 && (
                        <span>
                          , {item.number_of_states} {item.number_of_states > 1 ? 'States' : 'State'}
                        </span>
                      )}
                    </p>

                    {item.hq && (
                      <p className='theater_info'>
                        <strong>Based in</strong> {item.hq}
                      </p>
                    )}
                    {item?.states_active && item.states_active.length > 0 && (
                      <p className='theater_info'>
                        <strong>Operates in </strong> {' ' + item?.states_active?.join(', ')}
                      </p>
                    )}
                  </>
                ) : null}
                {tag === 'theatre' ? (
                  <>
                    {/* <p>
                      <strong>
                        <a href={item.exhibitor_parent_link}>
                          <strong>{item.exhibitor_parent_title}</strong>
                        </a>
                      </strong>
                    </p> */}
                    {item.hq && <p>{item.hq}</p>}
                    {item.screens && (
                      <p>
                        {item.screens} {item.screens > 1 ? 'Screens' : 'Screen'}
                      </p>
                    )}
                  </>
                ) : null}
                {tag === 'vendor' ? (
                  <ul className='df fww tags'>
                    {item.category.map((singleItem, id) => {
                      return (
                        <li key={id}>
                          <span>{singleItem}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                {tag === 'filmfestival' ? (
                  <>
                    <ul className='df fww tags'>
                      {item.genre &&
                        item.genre.map((singleItem, id) => {
                          return (
                            <li key={id}>
                              <span>{singleItem.name}</span>
                            </li>
                          );
                        })}
                    </ul>
                    {/* <p>
                      <strong>{item.genre.toString().replace(/,/g, ', ')}</strong>
                    </p> */}
                    <p>{item.venue}</p>
                    {item.upcoming.up_start_date !== '' && (
                      <p>
                        Upcoming Dates: {item.upcoming.up_start_date} - {item.upcoming.up_end_date}
                      </p>
                    )}
                  </>
                ) : null}
                <p>{(tag === 'filmfestival') | (tag === 'vendor') ? '' : item.content}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DistributorList;
