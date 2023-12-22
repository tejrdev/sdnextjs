import Pagetitle from "@/components/Products/Pagetitle"
import Recentissue from '@/components/Products/Recentissue';

export async function getStaticProps({}) {
   // news page static data
   let whatgetdata = await fetch('https://sd-nextjs.vercel.app/api/products/');
   whatgetdata = await whatgetdata.json();

   return {
      props: { whatgetdata},
      revalidate: 10, // In seconds
   };
}

const Thankyou = ({whatgetdata}) => {
   const Pagetitlebtn = {
      name: 'try it for free',
      link : '/pro/signup'
   }
  return (
    <div className="thankyouinfo">
      <Pagetitle heading={"Thank you for Signing up! you're now Screendollars pro🎉"} disc="Explore entire collection of content right here..." button={Pagetitlebtn}/>
         {/* <Recentissue data={whatgetdata.recissue} /> */}
    </div>
  )
}

export default Thankyou