import Pagetitle from "@/components/Products/Pagetitle"
import MeetExpert from "@/components/Products/MeetExpert"
import WhatGetSidebar from "@/components/Products/WhatGetSidebar"
import QuramSidebar from "@/components/Products/QuramSidebar"
import { Postercta } from "@/components/Products/Recentissue"

export async function getStaticProps({}) { 
   // news page static data
   let whatgetdata = await fetch('https://sd-nextjs.vercel.app/api/products/');
   whatgetdata = await whatgetdata.json();
 
   return {
     props: { whatgetdata},
     revalidate: 10, // In seconds
   };
 }

const ProductgetFree = ({whatgetdata}) => {
   return (
      <div className='freeproduct'>
         {/* <Pagetitle heading={"advanced movie data"} disc="Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl, consectetur et luctus et, porta ut dolor. Curabitur ultricies ultrices nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam. Maecenas vitae egestas dolor. Fusce tempor." proex /> */}
         <div className="container">
            <div className="freeproductbox df fww">
               <div className="freeproductleft">
                  <div className="promovieslist">
                     <h3 className="uppercase">coming soon</h3>
                     <div className="promoviesitem grid gap16">
                        {/* {whatgetdata.recissue.secdata.slice(0, 6).map((item, i) =>
                           <div className="freersitem">
                              <Postercta btn={"view data"} data={item} key={i} />
                           </div>
                        )} */}
                     </div>
                  </div>
                  <div className="promovieslist">
                     <h3 className="uppercase">now in theatres</h3>
                     <div className="promoviesitem grid gap16">
                        {/* {whatgetdata.recissue.secdata.slice(0, 3).map((item, i) =>
                           <div className="freersitem">
                              <Postercta btn={"view data"} data={item} key={i} />
                           </div>
                        )} */}
                     </div>
                  </div>
               </div>
               <div className="freeproductright">
                  {/* <QuramSidebar />
                  <MeetExpert />
                  <WhatGetSidebar /> */}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductgetFree