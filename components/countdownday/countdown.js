import { useState , useEffect } from 'react';


const Countday = ({ data }) => {
    const [count , setCount] = useState(data + 5);
    const days = (count > 1) ? "days" : "day";
  useEffect(() => { 
    if(count < 30 && data != ""){
        /*function intervalcount(){
          setCount(count - 1);
        }

        let countnum = setInterval(intervalcount, 1500);*/
        function countdown(count) {
          let countdownTimer = setInterval(function() {
            count--;
            setCount(count);

            if (count === data) {
              //document.querySelectorAll('.downreleaseday').style.display ="none";
               //document.querySelector('.downan_animday').style.display ="none";
               //document.querySelectorAll('.showreleaseday').style.display ="inline-block";
               //console.log(count , data) 
                //console.log("Countdown complete!");
              clearInterval(countdownTimer);
            }
          }, 1000);
        }

        countdown(count); 

          }

          
        
  },[]);
    return (
      <>
      <span className="releasenum">   
      <span className="releasenumday">
        {(data === "Today!" && data != 'in Progress!') ? "Today!" : 
         (count < 30) && 
           (<>
      {/* {console.log(data)} */}
            {/*<span className="showreleaseday" style={{display: "none"}}>
                          {String(data).padStart(2, '0')}
                        </span>*/}
            <span className="downreleaseday">
            {String(count).padStart(2, '0')}</span>
            {/*<span className="downan_animday">{count}</span>*/}
            
            </>)
         }
      {(data === 'in Progress!') ? data : ""}   
      </span>
       </span>
       {}
      {(data === "Today!" || data === 'in Progress!') ? "" : days}
      </>
     )
 }


export default Countday