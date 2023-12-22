import Link from "next/link"
import Image from "next/image"



const MeetExpert = ({data}) => {
   return (
      <section className="meetexpert">
         <div className="top_txt">
            <h3>Meet The Experts</h3>
         </div>
         <div className="expertinbox">
         {data.map((item, i) =>               
                  <div className="expitem" key={i}>
                     <div className="df fww">
                        <figure className="pvr">
                           <Image src={item.img} className="objctimg_box" alt="" width={90} height={130} />
                        </figure>
                        <div className="expetinfo">
                           <h4>{item.title}</h4>
                           <p>{item.designation}</p>
                           {/* <p>screendollars.com</p> */}
                           <p className="expertdic">{item.content}</p>
                        </div>
                     </div>
                  </div>               
            )}           
            
         </div>
      </section>
   )
}


export default MeetExpert