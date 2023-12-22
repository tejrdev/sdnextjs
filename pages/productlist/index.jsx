import Pagetitle from "@/components/Products/Pagetitle"
import Productitem from "@/components/Products/Productitem"
import InstantTrial from "@/components/Products/InstantTrial"
import MeetExpert from "@/components/Products/MeetExpert"
import WhatGetSidebar from "@/components/Products/WhatGetSidebar"
import QuramSidebar from "@/components/Products/QuramSidebar"

const Productlist = () => {
  return (
    <>
      <Pagetitle heading={"Screendollars newsletter"} disc="Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl, consectetur et luctus et, porta ut dolor. Curabitur ultricies ultrices nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam. Maecenas vitae egestas dolor. Fusce tempor."/>
      <div className="productlisting">
         <div className="container">
            <div className="prolistingbox df fww">
               <div className="prolistleft">
                  <Productitem />
               </div>
               <div className="prolistright">
                  <InstantTrial />
                  {/* <QuramSidebar />
                  <MeetExpert />
                  <WhatGetSidebar /> */}
               </div>
            </div>
         </div>
      </div>
      
    </>
  )
}

export default Productlist