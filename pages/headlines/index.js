import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Headerpagenews from '../../components/Headlinespage/Headlines';
import HomePageAds from '../../components/Homepage/HomePageAds';


// pages/index.js


export async function getStaticProps() {  

  //headline listing   
  //let headlineinfo = await fetch('https://tejrdev.github.io/api/headlinedata.json');

  let headlineinfo = await fetch(process.env.NEXT_PUBLIC_SD_API + '/headlines/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  
  headlineinfo = await headlineinfo.json();

  return {
    props: headlineinfo,
    revalidate: 10, // In seconds
  }
}

const Header = (props) => {

  const router = useRouter();
  const { post_id } = router.query;

  const ftrhero = props.featureheroheadlines;  
  const news = props.headlines;  
  const ftrheadlines = props.featureheadline;
  const ftrsidenews = props.featureheadlinesidebar;
  // console.log(ftrhero);

 let newsboxload = 6;  
  const newsblock = news.map(newsecinfo=> newsecinfo.data);
  const newsboxitems = newsblock.map((newsitem) => newsitem?.slice(0, newsboxload) )
  const [newsbox, setNewsbox] = useState(newsboxitems);
  const [count, setCount] = useState(0)


function handleMoreNews (e ,index, secdata) {
      if(newsbox[index].length <= newsblock[index].length){
          newsbox[index] = newsblock[index]?.slice(0, newsbox[index].length + newsboxload)
      }
      if(newsbox[index].length >= newsblock[index].length){
        e.target.style.display = "none";
      }
      //console.log(newsbox)
      setNewsbox(newsbox);
      setCount(count + 1);

};

if(post_id){
  axios.get(process.env.NEXT_PUBLIC_SD_API + '/headlines/get_shared_post.php/?post_id=' + post_id + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
     .then((res) => {
      //ftrhero = res.data.featureheroheadlines;  
      if(res.data) {
         $('#news_new_news_data').html(res.data.data);        
         //console.log('sss');                   
      }
     })
     .catch((err) => console.log(err));
}

function sd_magnificPopup(){
  $('.termtxt').magnificPopup({
   type: 'inline',
      preloader: false,
      focus: '#name',
      callbacks: {
        beforeOpen: function () {
          if ($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }
        },
        open: function () {},
        close: function () {},
      },
    });
}

useEffect(() => { 
  const $ = window.jQuery;
   sd_magnificPopup();
   $(document).on('click','.termtxt',function(){
    sd_magnificPopup();
   });
}, [post_id]);


  return (

    <section className="newslinebox sec_spacing">
      <div className="container">
        <div className="top_txt">
          <h1 className="h2">Headlines</h1>
        </div>

        {/*{news.map(newsdata => 
          <div 
          key = {newsdata.id}>
          <h2>{newsdata.title}</h2>
          <div key = {newsdata.id}>
            <p>{newsdata.data.map(newsdatainfo=> 
              )}</p>
          </div>
          </div>
          )}*/}
        
        <div className="headlinecategory">
          {/*<h3 className="newsline_datebox">Featured <i className="far fa-angle-right"></i></h3>*/}
          <div className="newsheadline_block threecol_news df fww">
            <div className="featurenewsbox df fww">
              {ftrhero.map((ftrheroinfo , index)=>               
                <div className={"newsline_item " + ftrheroinfo.class} key = {index} id="news_new_news_data">
                  <div className="newaline_inner ">
                     {ftrheroinfo.popclass ? (
                    <a href={"#newsheropop-" + index} className={"df fww " + ftrheroinfo.popclass } >                
                        <figure className="pvr">
                          <Image src={ftrheroinfo.img} width="454" height="260" alt="" className="objctimg_box"/>
                        </figure>
                       
                      <div className="newsline_iteminfo">
                        <h4>{ftrheroinfo.title}</h4>
                        <div className="fmupdate_boxaurthor">
                          <div className="bgimage" style={{background: `url(${ftrheroinfo.source_icon})`}}></div>
                            <span className="mediasrc">{ftrheroinfo.source}</span>
                            <span>&nbsp;&nbsp;{ftrheroinfo.date_time}</span>
                        </div>
                        <p>{ftrheroinfo.info}</p>
                      </div>
                    </a> 
                  ) : (
                         <>             
                        <figure className="pvr">
                        <a href={ftrheroinfo.link} className={"df fww "} target='_blank'>
                          <Image src={ftrheroinfo.img} width="454" height="260" alt="" className="objctimg_box"/>
                          </a>
                        </figure>
                       
                      <div className="newsline_iteminfo">
                      
                        <h4><a href={ftrheroinfo.link} className={"df fww "} target='_blank'>{ftrheroinfo.title}</a></h4>
                        <div className="fmupdate_boxaurthor">
                          <a href={ftrheroinfo.source_url} className="" target='_blank'>
                          <div className="bgimage" style={{background: `url(${ftrheroinfo.source_icon})`}}></div>
                          <span className="mediasrc">
                            {ftrheroinfo.source}
                          </span></a>
                          <span>&nbsp;&nbsp; {ftrheroinfo.date_time}</span>
                        </div>
                        <p><a href={ftrheroinfo.link} className="df fww" target='_blank'>{ftrheroinfo.info}</a></p>
                      </div>
                    </> 
                    )
                  }
                    {ftrheroinfo.popclass && (
                      <div id={"newsheropop-" + index} className="white-popup-block vend_Contact  newsuppopbox mfp-hide">
                        <div className="sdnewspop" >
                          <figure className="pvr">
                            <Image src={ftrheroinfo.img} width="454" height="260" alt="" className="objctimg_box"/>
                            <span className="srcdate">
                                <span className="bgimage" 
                                style={{background: `url(${ftrheroinfo.source_icon})`}}></span>
                                {ftrheroinfo.source} { ','} {ftrheroinfo.date_time}  </span>
                          </figure>
                          <h4>{ftrheroinfo.title}</h4>                        
                          {/*<span dangerouslySetInnerHTML={createMarkup()}> </span> */}
                          <div className="newsinfopoptxt" 
                          dangerouslySetInnerHTML={{__html: ftrheroinfo.popinfo}} ></div>                        
                        </div>
                      </div>
                      )}
                  </div>
                </div>
              )}
              {ftrheadlines.map((ftrheadline, index)=>              
                <Headerpagenews  data={ftrheadline} tag="Headerpagenews" key = {index} index={'featuredhero' + index}/>
                )}
            </div>
              <div className="featurenewsside">
              {ftrsidenews.map((ftrsidenewsitem, index) => 
                <Headerpagenews  data={ftrsidenewsitem} tag="Headerpagenews" key = {index} index={'featured' + index}/>
                )}
            </div>
          </div>
        </div>


        {news.map((newsdata, index ) =>
          <>
          <HomePageAds cls="ads_970" format="horizontal" />
          <div className="headlinecategory" key = {index} data-title = {newsdata.title}>
            <h3 className="newsline_datebox" >{newsdata.title} <i className="far fa-angle-right"></i></h3>
            <div className="newsheadline_block threecol_news df fww">
              {newsbox[index].map((newsdatainfo, index)=>
                <Headerpagenews  data={newsdatainfo} tag="Headerpagenews" key = {index} index={newsdata.title + index}/>
                )}
            </div>
            <div className="viewmorebtn text-center">
              <button className="ghostbtn goldbtn" onClick={function(e){handleMoreNews(e , index, newsdata)}}>view more</button>
            </div>
          </div>
          </>
        )}
      </div>
    </section>

  )
}


export default Header
