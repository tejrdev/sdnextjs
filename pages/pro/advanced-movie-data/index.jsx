import Pagetitle from "@/components/Products/Pagetitle"
import MeetExpert from "@/components/Products/MeetExpert"
import WhatGetSidebar from "@/components/Products/WhatGetSidebar"
import Unlockinside from "@/components/Products/Unlockinside"
import { Postercta } from "@/components/Products/Recentissue"
import LayoutPro from '@/components/Layout/LayoutPro';

export async function getStaticProps({}) { 
   // static data
   let AdvM_data = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/adv_pro_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
   AdvM_data = await AdvM_data.json(); 
   return {
     props: {AdvM_data},
     revalidate: 10, // In seconds
   };
 }

 export default function AdvancedMovieData({AdvM_data}) {
   return (
      <div className='freeproduct'>
         <Pagetitle heading={AdvM_data.title} disc={AdvM_data.content} proex />
         <div className="container">
            <div className="freeproductbox df fww">
               <div className="freeproductleft">
                  <div className="promovieslist">
                     <h3 className="uppercase">Coming soon</h3>
                     <div className="promoviesitem grid gap16">
                        {AdvM_data.boxoffice_upcomming.slice(0, 6).map((item, i) =>
                           <div className="freersitem">
                              <Postercta btn={"view data"} data={item} key={i} />
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="promovieslist">
                     <h3 className="uppercase">now in theatres</h3>
                     <div className="promoviesitem grid gap16">
                        {AdvM_data.in_theatres.slice(0, 3).map((item, i) =>
                           <div className="freersitem">
                              <Postercta btn={"view data"} data={item} key={i} />
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="freeproductright">
                  <Unlockinside/>
                  <MeetExpert data={AdvM_data.expitem} />
                  <WhatGetSidebar data={AdvM_data.what_you_get_section} />
               </div>
            </div>
         </div>
      </div>
   )
}

//export default Faq

AdvancedMovieData.getLayout = function(page) {
    return <LayoutPro>{page}</LayoutPro>;
  };