import { useState, useEffect } from 'react';
import Image from 'next/image';
import tometoicon from '../../../../public/images/tometoico.svg';
import imdbicon from '../../../../public/images/imdbico.svg';

const FilmographyFilms = ({ data, index, title }) => {
  const [Expanded, setExpanded] = useState(true);

  useEffect(() => {
    const $ = window.jQuery;

    $('.termtxt').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
        open: function () {},
        close: function () {},
      },
    });
  }, []);
  const onFilmographyClick = (e) => {
    e.preventDefault();
    const target = e.target.closest('.filmography_title');
    $(target).next().slideToggle();
    setExpanded(!Expanded);
  };

  return (
    <div className={'filmography_inner ' + (Expanded ? 'active' : '')}>
      <div className='filmography_title' onClick={onFilmographyClick}>
        <span className='togglearrow'>{Expanded ? 'Collapse' : 'Expand'}</span>
        <p>
          <strong>
            {title} ({data.length})
          </strong>
        </p>
      </div>
      <div className='filmography_info df fww just-between'>
        <div className='filmograhyinfo_col'>
          <ul>
            {data.map((moive_list, indexin) => (
              <li className='' key={indexin}>
                {moive_list.not_in_SD ? (
                  <>
                    <span className='yeartxt'>
                      {moive_list.release_year ? moive_list.release_year : <span style={{ width: 36, display: 'inline-block' }}>--</span>} <span className='piping'>|</span>{' '}
                    </span>
                    <div className='movierol'>
                      <strong>{moive_list.movie_title}</strong>
                      {moive_list.characters && (
                        <>
                          <span className='asmid'>as</span> {moive_list.characters}
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className='yeartxt'>
                      {moive_list.release_year} <span className='piping'>|</span>{' '}
                    </span>
                    <div className='movierol'>
                      <a className='termtxt' href={'#filminfopop' + indexin + index} title={moive_list.title}>
                        <strong>{moive_list.title}</strong>
                      </a>
                      <div className='filminfopop white-popup-block mfp-hide' id={'filminfopop' + indexin + index}>
                        <div className='filminfotop df fww'>
                          <figure>
                            <Image src={moive_list.img} width='112' height='170' alt='' />
                          </figure>
                          <div className='filminfotop_txt'>
                            <h4>
                              {moive_list.link ? <a href={moive_list.link}>{moive_list.title}</a> : <span>{moive_list.title}</span>}

                              {/*<span className="favoritebox" title="favorite"><i className="far fa-heart"></i></span>*/}
                            </h4>
                            <ul className='ratinginfo_tags'>
                              {moive_list.release_year && <li>{moive_list.release_year}</li>}
                              {moive_list.rating && moive_list.rating != '' && (
                                <li>
                                  <span>{moive_list.rating}</span>
                                </li>
                              )}
                              {moive_list.runtime && <li>{moive_list.runtime}</li>}
                              {moive_list.genre && <li>{moive_list.genre}</li>}
                            </ul>
                            <ul className='df fww criticratings'>
                              {/*
                                        <li className="sdrating">
                                          <a href="#!" className="ghostbtn">
                                            <span className="scoreico">
                                              <Image src={sdicon} alt=""/>
                                            </span>
                                            <strong>4.3 Rate Now</strong>
                                          </a>
                                        </li>
                                        */}
                              {moive_list.rotten_critics_score && (
                                <li>
                                  <span className='scoreico'>
                                    <Image src={tometoicon} alt='' />
                                  </span>
                                  <label htmlFor=''>{moive_list.rotten_critics_score}</label>
                                </li>
                              )}
                              {moive_list.imdbrating && (
                                <li>
                                  <span className='scoreico'>
                                    <Image src={imdbicon} alt='' />
                                  </span>
                                  <label htmlFor=''>{moive_list.imdbrating}</label>
                                </li>
                              )}
                            </ul>
                            {moive_list.synopsis && <p className='filminfodisc'>{moive_list.synopsis}</p>}
                            {/*console.log(moive_list)*/}
                          </div>
                        </div>
                        <div className='filmbtmpop'>
                          <div className='mvbnr_price sd_m_data'>
                            {moive_list.trailer_link && (
                              <a href={moive_list.link} className='ghostbtn'>
                                More Info
                              </a>
                            )}
                            {/*moive_list.trailer_link && (<a href={moive_list.trailer_link} className="ghostbtn">watch trailer</a>) */}
                            {moive_list.showtimes && (
                              <a href={moive_list.showtimes} className='ghostbtn'>
                                find showtimes
                              </a>
                            )}
                            {moive_list.watch_now && (
                              <a href={moive_list.watch_now} title='Watch Now' className='ghostbtn' target='_blank'>
                                Watch Now
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      {moive_list.character_name && (
                        <>
                          <span className='asmid'>as</span>
                          {moive_list.character_name}
                        </>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilmographyFilms;
