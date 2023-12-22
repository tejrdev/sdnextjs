import Image from "next/image"
import SDpro from "@/public/sdpro.svg"
import Link from "next/link"

import dynamic from 'next/dynamic';
const $ = require('jquery');

const Proheader = (data) => {
   const Promenu = dynamic(() => import('./Promenu'), {
      ssr: false,
    })


   return (
      <header id="masthead" className="site-headertop" role="banner">
         <div className="container">
            <div className="site-header-mainarea">
               <div className='header_topbox proheader df fww'>
                  <div className="site_prologo">
                     <Link href={'/pro/'}>
                        <Image src={SDpro} alt={"screendollars Pro"} width={295} height={96} />
                     </Link>
                  </div>
                     <Promenu data={data} />
               </div>
            </div>
         </div>
      </header>
   )
}

export default Proheader