import React, { useState , useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Counter = ({ data }) => {
   const [startCount, setStartCount] = useState(false);
   const { ref , inView } = useInView({
     triggerOnce: true,
     threshold: 0.5, 
   });
 
    useEffect(() => {
      if (inView) {
         setStartCount(true);
       }
    }, [inView]);

   return (
      <section className="counter">
         <div className="container">
            <div className="counterbox grid ">
               {data.map((item, index) =>
                  <div className="counteritem" key={index}>
                     <div className="h1" ref={ref}>
                        {startCount  && ( 
                        <CountUp start={item.countstart} end={item.countend} duration={3} suffix={item.name.toUpperCase() === 'DOMESTIC BOX OFFICE' ? "B+" : '+' } prefix={item.name.toUpperCase() === 'DOMESTIC BOX OFFICE' ? '$' : ""} separator=","/>
                        )} 
                        </div>
                     <div className="countname uppercase">{item.name}</div>
                  </div>
               )}
            </div>
         </div>
      </section>
   )
}

export default Counter