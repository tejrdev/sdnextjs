import { useEffect } from 'react';
import imgData from '../../data.json';
import Link from 'next/link';

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
    <div id={divId}>
      {data &&
        data.map((item, index) => {
          return (
            <div className='alldist_listbox df fww' key={index}>
              <div className='alldist_media pvr'>
                {item.sponser_class && item.sponser_class.trim() === 'sponsorship' ? (
                  <div className='startsponser'>
                    <div className='starico'>
                      <i className='fas fa-star'></i>
                    </div>
                    sponsor
                  </div>
                ) : null}

                <a href={item.link} title={item.title}>
                  <img src={item.img ? item.img : ''} alt='' className='objctimg_box' />
                </a>
              </div>
              <div className='alldist_listiteminfo pvr'>
                {/*
              {tag === 'theatre' && <span class="favheart"><i class="far fa-heart"></i></span>}
                */}
                <h2 className='h4'>
                  <Link href={tag === 'theatre' || tag === 'exhibitor' || tag === 'filmfestival' ? item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '') : item.link.replace(process.env.NEXT_PUBLIC_MENU_URL, '')} title={item.title} dangerouslySetInnerHTML={{ __html: item.title }}></Link>
                  {tag === 'theatre' && item.display_drive_in_icon ? (
                    <span>
                      {' '}
                      <img className='diveiconlist' src={imgData.drive_in} alt='Drive In' />
                    </span>
                  ) : null}
                </h2>
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
                    {item.hq && (
                      <p className='theater_info'>
                        <strong>Headquarters</strong> - {item.hq}
                      </p>
                    )}
                    {item.location && (
                      <p className='theater_info'>
                        <strong>Locations </strong> - {item.location}
                      </p>
                    )}
                    {item.screens && (
                      <p className='theater_info'>
                        <strong>Screens </strong> - {item.screens}
                      </p>
                    )}
                  </>
                ) : null}
                {tag === 'theatre' ? (
                  <>
                    <p>
                      <strong>
                        <a href={item.exhibitor_parent_link}>
                          <strong>{item.exhibitor_parent_title}</strong>
                        </a>
                      </strong>
                    </p>
                    <p>{item.hq}</p>
                    <p>
                      {item.screens} {item.screens > 1 ? 'Screens' : 'Screen'}
                    </p>
                  </>
                ) : null}
                {tag === 'filmfestival' ? (
                  <>
                    <p>
                      <strong>{item.genre.toString().replace(/,/g, ', ')}</strong>
                    </p>
                    <p>
                      {item.venue}, {item.country}
                    </p>
                    {item.upcoming.up_start_date !== '' && (
                      <p>
                        Upcoming Dates: {item.upcoming.up_start_date} - {item.upcoming.up_end_date}
                      </p>
                    )}
                  </>
                ) : null}
                <p>{tag === 'filmfestival' ? '' : item.content}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DistributorList;
