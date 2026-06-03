import React from 'react'

const Technicals = ({ data }) => {
   return (
      <section className='technicals toplinesec '>
         <div className='tecotherinfo'>
            <div className="container">
               <div className="top_txt"></div>
               <div className='tecinfo grid'>
                  {(data.soundmix || data.aspect_ratio) && (
                     <div className='techinfoitem'>
                        <h4> Technical Specifications  </h4>
                        {data.soundmix && (<p> <strong> Sound Mix: </strong> {data.soundmix} </p>)}
                        {data.aspect_ratio && (<p> <strong>Aspect Ratio: </strong> {data.aspect_ratio} </p>)}
                     </div>
                  )}

                  {(data.film_country || data.film_language) && (
                     <div className='techinfoitem'>
                        <h4> Other Details  </h4>
                        {data.film_country && (<p> <strong> Country of Origin: </strong> {data.film_country} </p>)}
                        {data.film_language && (<p> <strong> Language: </strong> {data.film_language} </p>)}
                     </div>
                  )}

               </div>
            </div>
         </div>
      </section>
   )
}

export default Technicals