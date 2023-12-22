import { useState } from "react";

const Togglebtn = ({toggleleft = 'Left' , toggleright = "Right" , ontoggle}) => {
   const [toggleon, setToggleon] = useState(false);
   const togglehandle = e => {
      setToggleon(!toggleon);
      ontoggle(toggleon);
   };
   return (
      <ul className={"daystype df fww " + (toggleon ? "off" : "")}>
         <li className="tab_items active" data-title="Weekend" id="weekend_colection_data">
            {toggleleft}
         </li>
         <li className={"togglebtn " + (toggleon ? "off" : "")} onClick={togglehandle}><div className="togglehandel"></div></li>
         <li className="tab_items" data-title="Weekly" id="weekely_colection_data">
            {toggleright}
         </li>
      </ul>
   )
}

export default Togglebtn