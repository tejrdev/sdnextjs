import Pagetitle from "@/components/Products/Pagetitle"
import Paychoose from "@/components/Products/Paychoose"

const Payselect = () => {
   return (
      <div className="payselect secspace">
         <div className="container">
            <div className="text-center">
               <h1>choose your Subscription</h1>
               <Paychoose />
            </div>
         </div>
      </div>
   )
}

export default Payselect