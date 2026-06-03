import { useState } from 'react'
import Image from 'next/image';
import Countday from '../../countdownday/countdown';

const Releasedates = ({ data }) => {
   const isFutureRelease = data.release_date_count_down < 30 && data.release_date_count_down != '' ? true : false;
   return (
      <div className='releaseinfo py-11 sm:py-8 md:pt-16'>
         <div className="container">
            <div className="posterbox df fww">

               <div className={`movierelease_info df fww gap-4 sm:gap-11 md:gap-28 items-start`}>
                  <div className="card mb-5 lg:min-w-96">
                     <h2>Release Date</h2>
                     <p className='mb-0'>{data.release_date}</p>
                     
                  </div>
                  <div className="card">
                     <h2>Other Key Dates</h2>
                     {data.extra_release_dates.length > 0 || isFutureRelease ? (
                        <div className='releasinginfo_dates'>
                           <div className='limitdate'>
                              {isFutureRelease && (
                                 <>
                                    {data.release_date_info}
                                    <span className='releasedateinfo'>
                                       <Countday data={data.release_date_count_down} />
                                    </span>
                                 </>
                              )}
                              {data.extra_release_dates &&
                                 data.extra_release_dates.map((date, i) => {
                                    if (isFutureRelease && i === 0) return;
                                    const isReleaseStep = date.steps;
                                    if (isReleaseStep) {
                                       return (
                                          <ul className='pl-4 mb-0' key={i}>
                                             <li>{date.release_date + ' | ' + date.pattern}</li>
                                          </ul>
                                       );
                                    }
                                    // const pattern = date.pattern !== '' ? date.pattern + ' | ' : '';
                                    const distributior = date.distributior_name !== data.dis_title ? date.distributior_name : '';
                                    const release_name = date.release_name !== '' ? date.release_name + (distributior !== '' ? ' (' + distributior + ') ' : '') + '  | ' : '';
                                    return <p key={i}>{release_name + date.release_date}</p>;
                                 })}
                           </div>
                        </div>
                     ) : null}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Releasedates