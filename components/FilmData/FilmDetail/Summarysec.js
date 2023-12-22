import { useEffect, useState , useRef } from "react";



const Summary = ({ data }) => {
  const readRef = useRef();
  const [summeryRead , setSummeryRead] = useState(false);
  const [summeryHeight , setSummeryHeight] = useState('');
  const [summerymainHeight , setSummerymainHeight] = useState('');
  useEffect(()=>{
    if (readRef.current) {
      const summaryplotHight = readRef.current.clientHeight;
      setSummerymainHeight(summaryplotHight)
      if (summaryplotHight > 235) {
        setSummeryRead(true);
        setSummeryHeight(235);
      }
    }
  },[]);

  const texthandler = e =>{
    setSummeryHeight(summerymainHeight);
    setSummeryRead(false);
  }

  return (
    <>
    <section className="summarysec toplinesec sd_m_data" id="viewsummary">
      <div className="container">
      <div className="top_txt">
          <h2>Summaries <i className="fal fa-angle-right"></i> </h2>
        </div>
        
        <div className="summaryinfo">
          {data.plot_summary && 
            <>
              <h3>Plot Summary <i className="fal fa-angle-right"></i></h3>        
              <ul ref={readRef} style={{'height':summeryHeight,'overflow':'hidden'}}><li dangerouslySetInnerHTML={{ __html: data.plot_summary }}></li></ul>
              {summeryRead && <div className="readmore_btn" onClick={texthandler}>Read More</div>}
            </>
          }
          <br/>
          {data.story_line && 
            <>
              <h3>Storyline <i className="fal fa-angle-right"></i></h3>        
              <ul ><li dangerouslySetInnerHTML={{ __html: data.story_line }}></li></ul>
            </>
          }
        </div>

      </div>
    </section> 
    </>
  );
};

export default Summary;
