
import Image from "next/image"
import Link from "next/link"

const Productitem = () => {
   return (
      <div className="productlist">
         <div className="productlistitem df fww">
            <figure className="pvr">
               <Link href={"#"}>
                  <Image src={'https://tejrdev.github.io/api/apisrc/fourabtsld.jpg'} className="objctimg_box" alt="" width={588} height={333} />
               </Link>
            </figure>
            <div className="productlistinfo">
               <div className="proitem">
                  <span className="protag uppercase">pro exclusive</span>
                  <span>available for free on 26 july</span>
               </div>
               <h3><Link href={"#"}>Screendollars Newsletter For Sunday</Link></h3>
               <div className="pubdate">06 July 2023</div>
               <div className="morebtn"><Link href={"#"} className="ghostbtn goldbtn uppercase">view  more</Link></div>
            </div>
         </div>

         <div className="productlistitem df fww">
            <figure className="pvr">
               <Link href={"#"}>
                  <Image src={'https://tejrdev.github.io/api/apisrc/fourabtsld.jpg'} className="objctimg_box" alt="" width={588} height={333} />
               </Link>
            </figure>
            <div className="productlistinfo">
               <h3><Link href={"#"}>Screendollars Newsletter For Sunday</Link></h3>
               <div className="pubdate">06 July 2023</div>
               <div className="morebtn"><Link href={"#"} className="ghostbtn goldbtn uppercase">view  more</Link></div>
            </div>
         </div>
         
         <div className="productlistitem df fww">
            <figure className="pvr videolink">
               <Link href={"#"}>
               <span className="playico"><Image src="https://www.live.screendollars.com/wp-content/themes/screendollars-live/assets/images/playicov2.png" alt="play" width={30} height={34}/></span>
                  <Image src={'https://tejrdev.github.io/api/apisrc/fourabtsld.jpg'} className="objctimg_box" alt="" width={588} height={333} />
               </Link>
            </figure>
            <div className="productlistinfo">
               <h3><Link href={"#"}>Screendollars Newsletter For Sunday</Link></h3>
               <div className="pubdate">06 July 2023</div>
               <div className="morebtn"><Link href={"#"} className="ghostbtn goldbtn uppercase">view  more</Link></div>
            </div>
         </div>
      </div>
   )
}

export default Productitem