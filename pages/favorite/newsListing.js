import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import FOURBTS from '../../public/fourabtsld.jpg';
const NewsListing = ()=>{
    const SliderSettingNews = {
        slidesToShow: 2,
        speed: 300,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        dots: false,
        arrows: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
    return(<>
        <section className="discnewsupdate toplinesec">
        <div className="container">
          <div className="top_txt">
            <h2>
              News & Updates <i className="fal fa-angle-right"></i>
            </h2>
          </div>

          <Slider {...SliderSettingNews} className="updateinfo_slider roundslickarrow">
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Superstar Actress Describes Feeling Like ‘Meat’ In Audition Process For Epic Film</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Julianne Hough Thinks Spring In N.Y.C., Plus Queen Latifah, Oscar Isaac And More</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Duis Vestibulum Elit Vel Neque Pharetramaxi...</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
            <div className="updateintro_box df fww">
              <span className="newupdicbox df fww">
                <figure className="pvr">
                  <img src={FOURBTS} alt="" className="objctimg_box" />
                </figure>
                <div className="updateintro_txt">
                  <h5>Duis Vestibulum Elit Vel Neque Pharetramaxi...</h5>
                  <div className="srcnametime">
                    <strong>
                      <div className="fmupdate_boxaurthor">
                        <div className="bgimage" style={{ backgroundImage: `url(${FOURBTS})` }}></div>
                        <span>CNN</span>
                      </div>
                      <span>15 Mar, 02:03 am</span>
                    </strong>
                  </div>
                </div>
              </span>
            </div>
          </Slider>
        </div>
      </section>

    </>)
}

export default NewsListing;