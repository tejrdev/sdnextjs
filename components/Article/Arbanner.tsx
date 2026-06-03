import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import React, { useState } from 'react';

const Arbanner = ({ item }: { item: any }) => {
   const [isActive, setIsActive] = useState(false);

   const toggleActive = () => {
      setIsActive(prevState => !prevState);
   };
   return (
      <section className='arbanner xl:mt-12 md:mt-8 mb-5 sm:mb-10'>
         <div className="container">
            <div className="card">
               <a href={item.links} className="text-black hover:text-black">
                  <figure className="pvr pb-[62%] xsm:pb-[52%] sm:pb-[38%] mb-4">
                     <img src={item.img} alt="" className='objctimg_box' />
                  </figure>
               </a>
               <div className="datesave flex flex-wrap justify-between items-start">
                  <div className="datetime flex flex-wrap items-start">
                     <p className='mr-6  text-sm mt-0.5'>{item.published_date}</p>
                     <p className='mr-4 mb-2  text-sm flex items-center'>{item.read_time && <>
                        <span className='mr-2 w-5'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" /></svg></span>
                        {item.read_time}
                     </>
                     }
                     </p>
                  </div>
                  {/* <div onClick={toggleActive} className="cursor-pointer">
                     {isActive ? <FaBookmark /> : <FaRegBookmark />}</div> */}
               </div>
               <h2><a href={item.links} className="text-black hover:text-black">{item.title}</a></h2>

            </div>
         </div>
      </section>
   )
}

export default Arbanner