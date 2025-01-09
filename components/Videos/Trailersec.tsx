import Link from 'next/link'
import React from 'react'
import playicoimg from '../../public/images/playicov2.png';

const Trailersec = () => {
   return (
      <div className='trailersec pt-9 sm:pt-10 md:pt-11'>
         <div className="container">
            <div className="top_txt flex justify-between">
               <h2 className='dark:text-gold'>New Trailers</h2>
               <Link href="#" className='underline dark:text-gold'>View all</Link>
            </div>
            <div className="trailersecbox flex flex-wrap -mx-2 border-b border-gray-300">
               {Array.from({ length: 4 }).map((__, i) =>
                  <div className="item xsm:w-1/2 md:w-1/3 lg:w-1/4 px-2" key={i}>
                     <a title="" className="popvid popyoutube text-black" href={"#"}>
                        <div className="relative rounded-md mb-3 overflow-hidden">
                           <div className="pb-40 bgimage" style={{ background: 'url(https://picsum.photos/289/160)', }} ></div>
                           <span className="playico"><span><img src={playicoimg.src} width='25' alt="play" /> </span></span>
                           {/* <div className="hmvid_duration">{'2:32'}</div> */}
                        </div>
                        <div className="pb-3">
                           <h5 className='font-normal dark:text-white mb-0'>Saturday Night (2024) | New Trailer | Screendollars</h5>
                           <p className='dark:text-white'>Clip</p>
                        </div>
                     </a>
                  </div>
               )}

            </div>
         </div>
      </div>
   )
}

export default Trailersec