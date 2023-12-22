import { useState, useEffect } from 'react';
const $ = require('jquery');

const HeroVideo = ({ data }) => {
  const iframeSrc = 'https://www.youtube.com/embed/' + data.id + '?rel=0&enablejsapi=1';
useEffect(() => {
  $('.vidhero .vidhero_info .readmore_btn').click(function () {
    $(this).parent().toggleClass('open');
    $(this).hide();
  });
}, [])
  
  let originalyoutubeTitle = data.title;
  let newText = originalyoutubeTitle.replace('| Screendollars', '');
  let topcatrage_txt = data.content;
  let cutting_txtvidoindex = topcatrage_txt.indexOf('To watch more movie');
  let cutting_txtvido = topcatrage_txt.substring(0, cutting_txtvidoindex);
  return (
    <section className="herovideo">
      <div className="container">
        <div className="vidhero df fww">
          <div className="vidherofream">
            <iframe
              width="100%"
              src={iframeSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="subscribe_btn df fww">
              <p>Subscribe our youtube channel</p>
              <iframe
                ng-non-bindable=""
                frameBorder="0"
                hspace="0"
                marginHeight="0"
                marginWidth="0"
                scrolling="no"
                tabIndex="0"
                vspace="0"
                width="100%"
                id="I0_1663189496655"
                name="I0_1663189496655"
                src="https://www.youtube.com/subscribe_embed?usegapi=1&channelid=UCRiPPWYxRY7bwM14cXy_UTA&layout=default&count=default&origin=http%3A%2F%2Fstaging.project-progress.net&gsrc=3p&ic=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.z9QjrzsHcOc.O%2Fd%3D1%2Frs%3DAHpOoo8359JQqZQ0dzCVJ5Ui3CZcERHEWA%2Fm%3D__features__#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh%2Conload&id=I0_1663189496655&_gfid=I0_1663189496655&parent=http%3A%2F%2Fstaging.project-progress.net&pfname=&rpctoken=17067547"
                data-gapiattached="true"
                title="youtube-subscriber"
                style={{
                  position: 'static',
                  top: '0px',
                  width: '115px',
                  margin: '0px',
                  borderStyle: 'none',
                  left: '0px',
                  visibility: 'visible',
                  height: '24px',
                }}
              ></iframe>
            </div>
          </div>
          <div className="vidhero_info">
            <h2>{newText}</h2>
            <div className="vidhero_detail" style={{ height: '172px' }}>
              {cutting_txtvido}
            </div>
            <div className="readmore_btn">Read More...</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
