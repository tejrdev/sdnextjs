import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';

function HomeSlider({ data }) {
  const SliderSettings = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: false,
    dots: true,
  };
  return (
    <Slider {...SliderSettings} className="detailinfo_slider">
      {data &&
        data.map((item, id) => {
          return (
            <div className="detailinfo_item" key={id}>
              <Link href={item.video_url != '' ? item.video_url : item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} className={item.video_url != '' ? 'popvid' : ''}>
                <div className="bnr_boxslide pvr vidoin">
                  <figure className="pvr">
                    <img src={item.img} alt={item.title} className="objctimg_box" />
                  </figure>
                  <div className="bnrboxslide_info">
                    <h4>{item.title}</h4>
                    <p>{item.sub_title}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </Slider>
  );
}

export default HomeSlider;
