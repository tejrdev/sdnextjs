import demoimg from '@/public/fourabtsld.jpg'
import Image from 'next/image'
import Link from 'next/link'

const Featureitem = () => {
  return (
    <div className='featureitem'>
      <Link href="#">
         <figure className="pvr">
            <Image src={'https://picsum.photos/266/154'} className="objimg" alt="" width={266} height={154}/>
         </figure>
         <h4>A Complete List Of All Barbie Movies In Order</h4>
      </Link>
    </div>
  )
}

export default Featureitem