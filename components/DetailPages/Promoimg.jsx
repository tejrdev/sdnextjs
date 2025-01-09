import Image from 'next/image';

const Promoimg = ({ data }) => {
   return (
      <div className='promoimg text-center' >
         <div className="container">
            <figure><Image src={data} width="970" height="210" alt='' /></figure>
         </div>
      </div>
   )
}

export default Promoimg