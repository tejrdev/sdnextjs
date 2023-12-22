import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Loader from '../../components/Loader';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Pagination from '../../components/Directory/ListingPages/Pagination';
// import RankMathSEO from '../../RankMathSEO';

const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API for SEO
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'talent');
  const data = await res.json();

  // Talent_Data page static data
  let Talent_Data = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/detail_pages/talent_listing.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  Talent_Data = await Talent_Data.json();

  return {
    props: { data, Talent_Data },
    revalidate: 10, // In seconds
  };
}
const Talent_list_data = ({ data, Talent_Data }) => {
  let slideloop = Talent_Data.trending_talent.talents.length > 6 ? true : false;
  const SliderSetting = {
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 300,
    infinite: slideloop,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: false,
    arrows: true,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [Talent_listing_data, setTalent_listing_data] = useState(false);
  //const [Talent_Data, setTalent_Data] = useState([]);
  const [Talent_listPages, setTalent_listPages] = useState([]);
  const [Talent_listPage, setTalent_listPage] = useState(1);
  const [TalentListData, setTalentListData] = useState([]);
  const [Talent_listDataLoaded, setTalent_listDataLoaded] = useState(false);
  const [TalentSearch, setTalentSearch] = useState('');
  const [Talent_Count, setTalent_Count] = useState(0);

  const setCurrentPage = (currentPage) => {
    setTalent_listPage(currentPage);
  };

  useEffect(() => {
    load_api_call();
  }, []);

  useEffect(() => {
    if (TalentSearch !== '') {
      load_talent_search();
    }
  }, [Talent_listPage]);

  useEffect(() => {
    $('.vidhero .vidhero_info .readmore_btn , .person_introbox .readmore_btn , .readmore_btn').click(function () {
      $(this).parent().toggleClass('open');
      $(this).hide();
    });
    var totalHeight = 0;
    $('.person_info')
      .children()
      .each(function () {
        totalHeight = totalHeight + $(this).outerHeight(true);
      });
    if (totalHeight > 410) {
      $('.person_introbox .person_info').css('height', '355px');
    } else { 
      $('.person_info + .readmore_btn').hide();
    }
  }, [Talent_listing_data]);

  const load_api_call = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/talent_listing.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        //setTalent_Data(res.data);

        //setTalent_listing_data(true);
      })
      .catch((err) => console.log(err));
  };

  const load_talent_search = (search) => {
    if (search !== '') {
      axios
        .get(process.env.NEXT_PUBLIC_SD_API + '/detail_pages/talent_search.php?s_text=' + search + '&page_no=' + Talent_listPage + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
        .then((res) => {
          setTalentListData(res.data);
          setTalent_listDataLoaded(true);
          setTalent_listPages(res.data.max_page);
          setTalent_Count(res.data.total_talent);
        })
        .catch((err) => console.log(err));
    }
  };

  const onSearchChange = (e) => {
    setTalentSearch(e.target.value);
    load_talent_search(e.target.value);
  };

  const onSearchClicked = (e) => {
    e.preventDefault();
    load_talent_search(TalentSearch);
  };
  return (
    <>
      <Head >
        {(data.children[0].children).map( (item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if(name !== ''){
                return <meta key={index} name={item.name} content={item.content} />;
                } else{
                return <meta key={index} property={item.property} content={item.content}/>;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return (
                  <script key={index} type={item.type} class={item.class} 
                     dangerouslySetInnerHTML={{ __html: item.html }}>
                  </script>
                );
              default:
                return null;
            }
          })}
      </Head>
      
        <>
          {Talent_Data.trending_talent.talents &&
            Talent_Data.trending_talent.talents.map((items, i) => {
              if (i < 1) {
                return (
                  <section className="personintro moviecast_talent">
                    <div className="container">
                      <div className="top_txt df fww just-between">
                        <h3>
                          {Talent_Data.trending_talent.title} <i className="fal fa-angle-right"></i>
                        </h3>
                      </div>
                      <div className="person_introbox">
                        <div className="personpc">
                          <a href={items.link} title={items.title}>
                            <figure className="personpcbox pvr">
                              <img src={items.img} alt="" className="objctimg_box" />
                            </figure>
                          </a>
                        </div>
                        <div className="person_info">
                          <h3>
                            <a href={items.link} title={items.title}>
                              {items.title}
                            </a>
                          </h3>
                          <div className="actorsocial_bio">
                            <h5>
                              <strong>{items.telent_have} </strong>
                            </h5>
                          </div>
                          <div className="persnolinfo">
                            {items.birthdate ? <p>Birthdate: {items.birthdate}</p> : ''}
                            {items.birthplace ? <p>Birthplace: {items.birthplace}</p> : ''}
                          </div>

                          <div
                            className=""
                            dangerouslySetInnerHTML={{
                              __html: items.content,
                            }}
                          ></div>
                        </div>
                        <div className="readmore_btn">Read More</div>

                        {items.talent_social_media && items.talent_social_media.length ? (
                          <div className="timepersonsocial df fww">
                            <p>Social Media:</p>
                            <ul className="inbio_box">
                              {items.talent_social_media.map((so_data, keys) => {
                                return (
                                  <li key={keys}>
                                    <a href={so_data.link} target="_blank" title={so_data.name}>
                                      <i className={'fab ' + so_data.class} aria-hidden="true"></i>
                                      <span>{so_data.name}</span>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </section>
                );
              }
            })}

          {Talent_Data.trending_talent.talents.length > 2 ? (
            <section className="casts">
              <div className="container">
                <div className="castin">
                  <Slider {...SliderSetting} className="roundslickarrow">
                    {Talent_Data.trending_talent.talents.map((items_data, index) => {
                      if (index >= 1) {
                        return (
                          <div className="catcrewcol">
                            <ul className="castcrew_people">
                              <li>
                                <a href={items_data.link}>
                                  <div
                                    className="cast_pic bgimage"
                                    style={{
                                      backgroundImage: 'url(' + items_data.img + ')',
                                    }}
                                  ></div>
                                  <div className="cast_info">
                                    <h5>{items_data.title}</h5>
                                    <p>{items_data.telent_have}</p>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        );
                      }
                    })}
                  </Slider>
                </div>
              </div>
            </section>
          ) : (
            ' '
          )}

          {Talent_Data.brithday_talent.talents.length > 1 ? (
            <section className="casts dlsecspace printdochide toplinesec">
              <div className="container">
                <div className="castin">
                  <div className="top_txt df fww just-between">
                    <h3>
                      {Talent_Data.brithday_talent.title} <i className="fal fa-angle-right"></i>
                    </h3>
                  </div>
                  <Slider {...SliderSetting} className="roundslickarrow">
                    {Talent_Data.brithday_talent.talents &&
                      Talent_Data.brithday_talent.talents.map((b_data, pindex) => {
                        return (
                          <div className="catcrewcol">
                            <ul className="castcrew_people">
                              <li>
                                <a href={b_data.link}>
                                  <div
                                    className="cast_pic bgimage"
                                    style={{
                                      backgroundImage: 'url(' + b_data.img + ')',
                                    }}
                                  ></div>
                                  <div className="cast_info">
                                    <h5>{b_data.name}</h5>
                                    <p>{b_data.dates}</p>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            </section>
          ) : (
            ' '
          )}

          {Talent_Data.popular_talent.talents.length > 1 ? (
            <section className="talentlist dlsecspace printdochide toplinesec">
              <div className="container">
                <div className="top_txt df fww just-between">
                  <div className="top_txtitle">
                    <h3>
                      Everyone <i className="fal fa-angle-right"></i>
                    </h3>
                    <p>
                      <strong>({Talent_Count ? Talent_Count : Talent_Data.popular_talent.total_talents} People)</strong>
                    </p>
                  </div>
                  <div className="top_filter df fww">
                    <div className="talentsrch">
                      <input type="input" id="" name="" placeholder="Ex: Chris Evans, Tom Holand, Etc..." value={TalentSearch} onChange={(e) => onSearchChange(e)} />
                      <button type="submit" onClick={onSearchClicked}>
                        <i className="far fa-search"></i>
                      </button>
                    </div>
                    <p>Filtered By Most Popular</p>
                  </div>
                </div>
                <div className="talentlistbox">
                  <ul className="castcrew_people grid gap16">
                    {Talent_listDataLoaded
                      ? TalentListData.talent &&
                        TalentListData.talent.map((b_data, bindex) => {
                          return (
                            <li key={bindex}>
                              <div className="cast_pic pvr">
                                <a href={b_data.link}>
                                  <img src={b_data.img} alt="" className="objctimg_box" />
                                </a>
                              </div>
                              <div className="cast_info">
                                <h5>
                                  <a href={b_data.link}>{b_data.name}</a>
                                </h5>
                                <p>{b_data.telent_have && <p>{b_data.telent_have}</p>}</p>
                              </div>
                            </li>
                          );
                        })
                      : Talent_Data.popular_talent.talents &&
                        Talent_Data.popular_talent.talents.map((b_data, bindex) => {
                          return (
                            <li key={bindex}>
                              <div className="cast_pic pvr">
                                <a href={b_data.link}>
                                  <img src={b_data.img} alt="" className="objctimg_box" />
                                </a>
                              </div>
                              <div className="cast_info">
                                <h5>
                                  <a href={b_data.link}>{b_data.name}</a>
                                </h5>
                                <p>{b_data.movie_link && <a href={b_data.movie_link}>{b_data.movie_name}</a>}</p>
                              </div>
                            </li>
                          );
                        })}
                  </ul>
                  {Talent_listDataLoaded && TalentListData.talent && <Pagination setCurrentPage={setCurrentPage} totalPages={Talent_listPages} requestFrom="Talent" />}
                </div>
              </div>
            </section>
          ) : (
            ' '
          )}
        </>
      
    </>
  );
};

export default Talent_list_data;
