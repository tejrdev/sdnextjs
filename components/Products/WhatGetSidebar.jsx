import Link from "next/link"
import Image from "next/image"

const WhatGetSidebar = ({data}) => {
   return (
      <section className="whatgetsidebar">
         <h3>{data.title}</h3>
         <div className="whatgetsidebox df fww">
         {data.items.slice(0, 4).map((item, i) =>   
            <div className="whatgetside_item" key={i}>
               {item.link ? (
               <Link href={item.link}>
                  <figure className="pvr">
                     <Image src={item.img} className="objctimg_box" alt="" width={102} height={140} />
                  </figure>
               </Link>
               ):(
                  <figure className="pvr">
                     <Image src={item.img} className="objctimg_box" alt="" width={102} height={140} />
                  </figure>
               )}
            </div>
         )}
            
         </div>
      </section>
   )
}

export default WhatGetSidebar