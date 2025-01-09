import Featureitem from "./Featureitem"

const Featurebox = () => {
   return (
      <section className="featurebox secspace">
         <div className="container"><h3>Featured <i className="far fa-angle-right"></i></h3>
            <div className="featureblock df fww">
               <div className="featureblock_left"><Featureitem /></div>
               <div className="featureblock_right grid gap16">
                  <Featureitem />
                  <Featureitem />
                  <Featureitem />
                  <Featureitem />
               </div>
            </div>
         </div>
      </section>
   )
}

export default Featurebox