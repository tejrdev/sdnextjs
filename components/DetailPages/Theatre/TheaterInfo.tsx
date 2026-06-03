import React, { useState, useEffect, useRef } from 'react'
import Readmoreless from './Readmoreless';

const TheaterInfo = ({ data, listingType }: { data: any, listingType: string }) => {

    let theatermap = data?.directions?.replace(/#/g, '%20');
    // const demoDescriptionHtml = `
    //     <p>
    //         The 3 Lakes Center for the Arts (TLCFA) in Three Lakes, Wisconsin, is a vibrant community hub that blends history with modern technology to celebrate film, music, and the visual arts.
    //         Housed in a restored Quonset hut theater from 1949, TLCFA features a 2-foot HD screen, 4K projector, Dolby 5.1 surround sound, and 400 watts of power, delivering an unforgettable big-screen experience.
    //     </p>
    //     <p>
    //         Beyond films, the venue hosts live concerts, art classes, lectures, and a variety of events year-round, while its Marie Moore Gallery showcases the works of over 25 local and regional artists.
    //         Whether you are enjoying fresh popcorn at movie night, attending a gallery reception, or joining a workshop, TLCFA offers a welcoming destination for visitors of all ages.
    //     </p>
    //     <p>
    //         The 3 Lakes Center for the Arts (TLCFA) in Three Lakes, Wisconsin, is a vibrant community hub that blends history with modern technology to celebrate film, music, and the visual arts.
    //         Housed in a restored Quonset hut theater from 1949, TLCFA features a 2-foot HD screen, 4K projector, Dolby 5.1 surround sound, and 400 watts of power, delivering an unforgettable big-screen experience.
    //     </p>
    //     <p>
    //         Beyond films, the venue hosts live concerts, art classes, lectures, and a variety of events year-round, while its Marie Moore Gallery showcases the works of over 25 local and regional artists.
    //         Whether you are enjoying fresh popcorn at movie night, attending a gallery reception, or joining a workshop, TLCFA offers a welcoming destination for visitors of all ages.
    //     </p>
    //     <p>
    //         The 3 Lakes Center for the Arts (TLCFA) in Three Lakes, Wisconsin, is a vibrant community hub that blends history with modern technology to celebrate film, music, and the visual arts.
    //         Housed in a restored Quonset hut theater from 1949, TLCFA features a 2-foot HD screen, 4K projector, Dolby 5.1 surround sound, and 400 watts of power, delivering an unforgettable big-screen experience.
    //     </p>
    //     <p>
    //         Beyond films, the venue hosts live concerts, art classes, lectures, and a variety of events year-round, while its Marie Moore Gallery showcases the works of over 25 local and regional artists.
    //         Whether you are enjoying fresh popcorn at movie night, attending a gallery reception, or joining a workshop, TLCFA offers a welcoming destination for visitors of all ages.
    //     </p>
    // `;
    const descriptionHtml = data?.content?.trim();
    // data?.content?.trim() ||

    return (
        <div className='theater-info  py-4 lg:py-8'>
            <div className='container'>
                <div className='theater-info-content flex flex-wrap gap-4'>
                    <div className="leftinfo w-full sm:w-[calc(100%-247px)]">
                        {listingType === 'distributors' && data?.distribution_type && data?.distribution_type?.length > 0 && (
                            <div className='detailtaging'>
                                <ul className='df fww tags printdochide'>
                                    {data?.distribution_type?.map((item: string, i: number) => (
                                        <li key={i}>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {data?.category && data?.category?.length > 0 && (
                            <div className='detailtaging'>
                                <ul className='df fww tags printdochide'>
                                    <li > <span>{data?.category}</span> </li>
                                </ul>
                            </div>
                        )}
                        {
                            listingType === 'film-festivals' && data?.genre && data?.genre?.length > 0 && (
                                <div className='detailtaging'>
                                    <ul className='df fww tags printdochide'>
                                        {data?.genre?.map((item: { name: string }, i: number) => (
                                            <li key={i}>
                                                <span>{item?.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                        <Readmoreless collapsedHeight={286}>{descriptionHtml}</Readmoreless>
                    </div>
                    <div className="rightinfo max-w-[230px]">

                        {data.directions && (
                            <div className='theaterbasics_right printdochide'>
                                <div className='getonmap'>
                                    {/* http://maps.apple.com/?q=5+Mile+Drive-In+Movie+Theater&sll=42.0577278,-86.1158347 */}
                                    <a href={data.directions.replace('google', 'apple')} target='_blank'>
                                        <iframe
                                            width='232'
                                            height='253'
                                            id='gmap_canvas'
                                            src={theatermap + '&t=&z=13&ie=UTF8&iwloc=&output=embed'}
                                            frameBorder={0}
                                            scrolling="no"
                                            marginHeight={0}
                                            marginWidth={0}></iframe>
                                    </a>
                                </div>
                                {/*data.associated_with && data.associated_with.length > 0 && data.associated_with[0] !== '' && (
                    <div className='theater_associate text-center w100'>
                      <p>Associated With</p>
                      <Slider {...SliderSetting} className='associatesider'>
                        {data.associated_with.map((item, i) => (
                          <div className='associateitem text-center' key={i}>
                            <Image src={associated_with[item]} alt='' />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  )*/}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheaterInfo