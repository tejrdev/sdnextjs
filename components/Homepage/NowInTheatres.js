import { useEffect } from 'react';
import Link from 'next/link';
import $ from 'jquery';

function NowInTheatres({ data }) {
  useEffect(() => {
    /*now show hover casts visible*/
    if (window.innerWidth > 1250) {
      $('.nowshow_movertop  .nowshow_movertop_in ').each(function () {
        let _this = $(this);
        if (_this.find('.noeshow_moveitem').length > 5) {
          _this.find('.noeshow_moveitem:nth-child(6n)').hover(function () {
            $(this).parent().addClass('lastactive');
          });

          _this.find('.noeshow_moveitem:not(:nth-child(6n))').mouseleave(function () {
            $(this).parent().stop(true, true).removeClass('lastactive');
          });
        }
      });
    }
  }, []);

  return (
    <div className="nowshow_mover">
      <div className="nowshow_movertop ">
        <div className="nowshow_movertop_in df fww">
          {data &&
            data.map((item, id) => {
              return (
                <div className="noeshow_moveitem" key={id}>
                  <div className="nowshowmove_iteminner">
                    <figure className="pvr">
                      <img src={item.img} alt="" className="objctimg_box" />
                      <img src={item.img_hover} alt="" className="objctimg_box hovered" />
                    </figure>
                    <div className="moverinfo">
                      <h4>
                        <a href={item.link} title={item.title} target="_blank" rel="noreferrer">
                          {item.title}
                        </a>
                      </h4>
                      <p>
                        {item.rating ? <span className="ratingbox">{item.rating}</span> : ''}
                        {item.runtime} | {item.genre}
                      </p>{' '}
                      <div className="playoption df fww">
                        <div className="playoptlink">
                          <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} title={item.title} target="_blank" rel="noreferrer">
                            Watch Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default NowInTheatres;
