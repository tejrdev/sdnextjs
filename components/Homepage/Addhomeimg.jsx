import Link from "next/link"
import Image from "next/image"


const Addhomeimg = ({ seclink = "#", srcimg, srcalt = "" }) => {
   return (
      <div className="adsimglink">
         <Link href={seclink}>
            <figure>
               <Image src={srcimg} alt={srcalt} />
            </figure>
         </Link>
      </div>
   )
}

export default Addhomeimg