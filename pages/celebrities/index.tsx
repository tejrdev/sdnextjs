import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../components/Loader';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import Pagination from '../../components/Directory/ListingPages/Pagination';
import CelebsbyMovies from '@/components/Celebs/CelebsbyMovies';
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import Noactorimg from '../../public/images/noactorcastlong.svg';
import HeadComponent from '../../components/HeadComponent';
import { getStaticPropsWithErrorHandling } from '@/utils/staticProps';
import { ErrorDisplay } from '@/components/ErrorBoundary';
import { RiTwitterXFill } from 'react-icons/ri';

import { motion } from 'motion/react';
import { FadeinUp } from '@/components/Anim/FadeinUp';
import Link from 'next/link';
import AdPlaceholder from '@/components/Homepage/AdPlaceholder';

import { Props, TalentData, Talent } from '@/types/celebrities';

export async function getStaticProps() {
  const fetchConfigs = [
    {
      url: `${process.env.NEXT_PUBLIC_SEO_LINK}celebrities`,
      key: 'SEOdata',
      defaultData: {},
    },
    {
      url: `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/talent_listing_new.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`,
      key: 'Talent_Data',
      defaultData: {},
    },
  ];

  return await getStaticPropsWithErrorHandling(fetchConfigs);
}

const Talent_list_data: React.FC<Props> = ({ SEOdata, Talent_Data, error }) => {
  if (error) {
    return <ErrorDisplay error={error} />;
  }
  const slideloop = Talent_Data.trending_talent.talents.length > 6;

  const SliderSetting: any = {
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 300,
    infinite: slideloop,
    autoplay: false,
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [Talent_listPages, setTalent_listPages] = useState<number>(0);
  const [Talent_listPage, setTalent_listPage] = useState<number>(1);
  const [TalentListData, setTalentListData] = useState<Talent[] | null>(Talent_Data.talent_list);
  const [Talent_listDataLoaded, setTalent_listDataLoaded] = useState<boolean>(true);
  const [TalentSearch, setTalentSearch] = useState<string>('');
  const [SelAlphabet, setSelAlphabet] = useState<string>('');
  const [isReadMoreOpen, setIsReadMoreOpen] = useState<boolean>(false);
  const [showReadMoreBtn, setShowReadMoreBtn] = useState<boolean>(false);
  const personInfoRef = useRef<HTMLDivElement>(null);
  const readMoreBtnRef = useRef<HTMLDivElement>(null);

  const setCurrentPage = (currentPage: number): void => {
    setTalent_listPage(currentPage);
  };

  // Handle pagination when page changes and there's an active search/alphabet filter
  useEffect(() => {
    if (TalentSearch !== '' || SelAlphabet !== '') {
      if (SelAlphabet !== '') {
        load_talent_search(SelAlphabet, true, Talent_listPage);
      } else {
        load_talent_search(TalentSearch, false, Talent_listPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Talent_listPage]);

  // Handle readmore button functionality with React
  useEffect(() => {
    if (personInfoRef.current) {
      const personInfo = personInfoRef.current;
      let totalHeight = 0;

      // Calculate total height of children
      Array.from(personInfo.children).forEach((child) => {
        const element = child as HTMLElement;
        totalHeight += element.offsetHeight + parseInt(window.getComputedStyle(element).marginTop) + parseInt(window.getComputedStyle(element).marginBottom);
      });

      if (totalHeight > 410) {
        personInfo.style.height = '355px';
        setShowReadMoreBtn(true);
      } else {
        setShowReadMoreBtn(false);
      }
    }
  }, []);

  const handleReadMore = () => {
    setIsReadMoreOpen(true);
    if (personInfoRef.current) {
      personInfoRef.current.style.height = 'auto';
    }
    if (readMoreBtnRef.current) {
      readMoreBtnRef.current.style.display = 'none';
    }
  };

  const load_talent_search = (search: string, alphabet_search: boolean = false, page: number = 1): void => {
    setTalent_listDataLoaded(false);
    let sd_api = `${process.env.NEXT_PUBLIC_SD_API}/detail_pages/talent_search.php?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}`;
    if (alphabet_search) {
      sd_api += `&start_with=${search}`;
    } else {
      sd_api += `&s_text=${search}`;
    }
    sd_api += `&page_no=${page}`;
    axios
      .get(sd_api)
      .then((res) => {
        setTalent_listDataLoaded(true);
        setTalentListData(res.data.talent);
        setTalent_listPages(res.data.max_page);
        // setTalent_Count(res.data.total_talent);
      })
      .catch((err) => {
        console.error('Error loading talent search:', err);
        setTalent_listDataLoaded(true);
      });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTalentSearch(e.target.value);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const val = (e.target as HTMLInputElement).value;
    if (val !== '' && e.key === 'Enter') {
      setTalent_listPage(1); // Reset to page 1
      setSelAlphabet('');
      load_talent_search(val, false, 1);
    }
  };

  const onSearchClicked = (e: React.FormEvent): void => {
    e.preventDefault();
    setTalent_listPage(1); // Reset to page 1
    setSelAlphabet('');
    load_talent_search(TalentSearch, false, 1);
  };

  const onAlphabetClicked = (e: React.FormEvent): void => {
    e.preventDefault();
    setTalentSearch('');
    const alphabet = (e.currentTarget as HTMLElement).innerText;
    setTalent_listPage(1); // Reset to page 1
    setSelAlphabet(alphabet);
    load_talent_search(alphabet, true, 1);
  };

  return (
    <>
      <HeadComponent data={SEOdata} />
      <AdminEditLink data={Talent_Data} />
      {Talent_Data.trending_talent.talents &&
        Talent_Data.trending_talent?.talents.map((items, i) => {
          if (i < 1) {
            return (
              <section className='personintro moviecast_talent' key={i}>
                <div className='container'>
                  <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className='top_txt df fww just-between'>
                    <h1 className='mb-7'> {Talent_Data.trending_talent.title} </h1>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className='person_introbox'>
                    <div className='personpc'>
                      <Link href={items.link} title={items.title}>
                        <figure className='personpcbox pvr'>
                          <img src={items.img} alt='' className='objctimg_box' />
                        </figure>
                      </Link>
                    </div>
                    <div className={`person_info ${isReadMoreOpen ? 'open' : ''}`} ref={personInfoRef}>
                      <h3>
                        <Link href={items.link} title={items.title}>
                          {items.title}
                        </Link>
                      </h3>
                      <div className='actorsocial_bio'>
                        <h5>
                          <strong>{items.telent_have} </strong>
                        </h5>
                      </div>
                      <div className='persnolinfo'>
                        {items.birthdate ? <p>Birthdate: {items.birthdate}</p> : ''}
                        {items.birthplace ? <p>Birthplace: {items.birthplace}</p> : ''}
                      </div>

                      <div
                        className=''
                        dangerouslySetInnerHTML={{
                          __html: items.content,
                        }}></div>
                    </div>
                    {showReadMoreBtn && !isReadMoreOpen && (
                      <div className='readmore_btn' ref={readMoreBtnRef} onClick={handleReadMore}>
                        Read More
                      </div>
                    )}

                    {items.talent_social_media && items.talent_social_media.length ? (
                      <div className='timepersonsocial df fww'>
                        <p>Social Media:</p>
                        <ul className='inbio_box'>
                          {items.talent_social_media.map((so_data, keys) => {
                            return (
                              <li key={keys}>
                                <a href={so_data.link} target='_blank' title={so_data.name}>
                                  {so_data.class === 'fa-twitter' ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x mt-2" viewBox="0 0 16 16">
                                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                    </svg>
                                    : <i className={`fab ${so_data?.class ? so_data.class : 'fa fa-globe'}`} aria-hidden='true'></i>}
                                  <span className='text-sm'>{so_data.name}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      ''
                    )}
                  </motion.div>
                </div>
              </section>
            );
          }
        })}

      {Talent_Data.trending_talent?.talents?.length > 2 ? (
        <section className='casts'>
          <div className='container'>
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className='castin'>
              <Slider {...SliderSetting} className='roundslickarrow'>
                {Talent_Data.trending_talent.talents.map((items_data, index) => {
                  if (index >= 1) {
                    return (
                      <div className='catcrewcol' key={index}>
                        <ul className='castcrew_people'>
                          <li>
                            <Link href={items_data.link}>
                              <div
                                className='cast_pic bgimage'
                                style={{
                                  backgroundImage: 'url(' + items_data.img.replace(/ /g, '%20') + ')',
                                }}></div>
                              <div className='cast_info'>
                                <h5>{items_data.title}</h5>
                                <p>{items_data.telent_have}</p>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    );
                  }
                })}
              </Slider>
            </motion.div>
          </div>
        </section>
      ) : (
        ' '
      )}

      {Talent_Data.brithday_talent?.talents?.length > 1 ? (
        <section className='casts dlsecspace printdochide toplinesec'>
          <div className='container'>
            <div className='castin'>
              <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='top_txt df fww just-between'>
                <h3>
                  {Talent_Data.brithday_talent.title}
                  {/*  <i className='fal fa-angle-right'></i> */}
                </h3>
              </motion.div>
              <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }}>
                <Slider {...SliderSetting} className='roundslickarrow'>
                  {Talent_Data.brithday_talent.talents &&
                    Talent_Data.brithday_talent.talents.map((b_data, pindex) => {
                      return (
                        <div className='catcrewcol' key={pindex}>
                          <ul className='castcrew_people'>
                            <li>
                              <Link href={b_data.link}>
                                <div
                                  className='cast_pic bgimage'
                                  style={{
                                    background:
                                      'url(' +
                                      (b_data.img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/noactor.svg' ? Noactorimg.src : encodeURI(b_data.img)) +
                                      ')',
                                  }}></div>
                                <div className='cast_info'>
                                  <h5>{b_data.name}</h5>
                                  <p>{b_data.dates}</p>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                </Slider>
              </motion.div>
            </div>
          </div>
        </section>
      ) : (
        ' '
      )}

      {/* Ad Placement - After Birthday Talent */}
      <AdPlaceholder
        variant="fullwidth"
        id="celebrities-ad-1"
        sectionClass="celebrities-ad-section py-6"
      />

      {Talent_Data.popular_talent && <CelebsbyMovies data={Talent_Data.popular_talent} />}


      <section className='talentlist dlsecspace printdochide toplinesec'>
        <div className='container'>
          <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='top_txt df fww just-between'>
            <div className='top_txtitle'>
              <h3>
                Celebrities A-Z <i className='fal fa-angle-right'></i>
              </h3>
              <p>{/* <strong>({Talent_Count ? Talent_Count : PopularTalentListData?.total_talents} People)</strong> */}</p>
            </div>

            <div className='top_filter df fww'>
              <div className='talentsrch'>
                <input type='input' id='' name='' placeholder='Ex: Chris Evans, Tom Holand, Etc...' value={TalentSearch} onChange={(e) => onSearchChange(e)} onKeyDown={(e) => onSearchKeyDown(e)} />
                <button type='submit' onClick={onSearchClicked}>
                  <i className='far fa-search'></i>
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} className='grid gap-2 auto-fill-[22px] sm:auto-fill-[36px] w-full font-bold mb-4'>
            {/* <div className='border border-gold rounded flex items-center justify-center cursor-pointer hover:bg-gold sm:py-1'>All</div> */}
            {[...Array(26)].map((_, i) => (
              <div
                className={`border border-gold rounded flex items-center justify-center cursor-pointer hover:bg-gold sm:py-1 ${SelAlphabet === String.fromCharCode(65 + i) ? 'bg-gold' : ''}`}
                onClick={onAlphabetClicked}
                key={i}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </motion.div>
          <div className='talentlistbox'>
            {Talent_listDataLoaded ? (
              <ul className='castcrew_people grid gap16'>
                {TalentListData?.map((b_data, bindex) => (
                  <motion.li variants={FadeinUp} initial='init' whileInView='anim' viewport={{ once: true }} key={bindex}>
                    <div className='cast_pic pvr'>
                      <Link href={b_data.link}>
                        <img
                          src={b_data.img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/noactor.svg' ? Noactorimg?.src : b_data.img}
                          alt=''
                          className='objctimg_box'
                        />
                      </Link>
                    </div>
                    <div className='cast_info'>
                      <h5>
                        <Link href={b_data.link}>{b_data.name}</Link>
                      </h5>
                      <p>{b_data.telent_have && <p>{b_data.telent_have}</p>}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className='nowshow_sliderbox pvr' style={{ minHeight: 80, marginBottom: 20 }}>
                <div className='secloder'>
                  <div className='secspinner'></div>
                </div>
              </div>
            )}

            {Talent_listDataLoaded && Talent_listPages > 0 && <Pagination setCurrentPage={setCurrentPage} totalPages={Talent_listPages} requestFrom='Talent' currentPage={Talent_listPage} />}
          </div>
        </div>
      </section>
      {/* Ad Placement - After Celebrities A-Z */}
      <AdPlaceholder
        variant="fullwidth"
        id="celebrities-ad-2"
        minHeight="450px"
        sectionClass="celebrities-ad-section py-6"
      />
    </>
  );
};

export default Talent_list_data;
