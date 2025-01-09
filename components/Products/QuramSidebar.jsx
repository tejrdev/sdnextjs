import Link from "next/link"
import Image from "next/image"
import quorum from "@/public/quorum.png"

const QuramSidebar = ({data}) => {
  return (
    <div className="quramsidebar">
      <h6 className="text-center">in partnership with</h6>
      <div className="text-center">
         <Image src={quorum} alt="" width={319} height={50}/>
      </div>
      {data.link && <Link href={data.link} className="btn uppercase">{data.text}</Link> }
    </div>
  )
}

export default QuramSidebar