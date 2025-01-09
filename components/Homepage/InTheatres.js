import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Link from "next/link";
import Image from "next/image";

function InTheatres({ data }) {
  if (data.length > 4) data = data.slice(0, 4);
  const SliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: "0",
    focusOnSelect: true,
    arrows: true,
    dots: true,
  };
  return (
    <Slider {...SliderSettings} className='abtinfo_slider slickroundnav'>
      {data &&
        data.map((item, id) => {
          return (
            <React.Fragment key={id}>
              {id < 6 ? (
                <div className='hmtheaterbox_slditem' key={id}>
                  <div className='df fww just-between'>
                    <figure className='pvr'>
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, "")}>
                        {/*<img src={item.img.url} alt="" className="objctimg_box" />*/}
                        {/*<Image src={item.img.url} width="500" height="500" alt="" className="objctimg_box" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcPn1qPQAF1AJEvne2zAAAAABJRU5ErkJggg=="/>*/}
                        <Image src={item.img.url} width='500' height='500' alt='' className='objctimg_box' />
                      </Link>
                    </figure>
                    <div className='homtheaterbox_txt'>
                      <h5>
                        <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, "")} title={item.title}>
                          {item.title}
                        </Link>
                      </h5>
                      <p>
                        {item.rating ? <span className='ratingbox'>{item.rating}</span> : ""}
                        {item.runtime}
                      </p>
                      <p>{item.genre}</p>{" "}
                    </div>
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
    </Slider>
  );
}

export default InTheatres;
