import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import $ from 'jquery';

let p = [];
let q = [];
let div1Width = [];
let div2Width = [];
let interval = [];
let arrWidth = 0;
let imgWidth = 0;
let windowWidth = 0;
let imgRight = 0;
let extrawidth = 20;
let newstikersrcimg = 'https://shuhari-iconoclast-production.herokuapp.com/favicon?url=';

function ZipperMedia({ data }) {
  const sliderRef = useRef();

  const SliderSettings = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '0',
    focusOnSelect: true,
    arrows: true,
    dots: false,
    buttons: false,
    draggable: false,
    afterChange: () => {
      var marqueezoom_img = $('.marquee_imgslid .slick-current.slick-active .mqitemimg img').attr('src');
      $('.marquee_imgslidzoom').find('img').attr('src', marqueezoom_img);
    },
  };
  useEffect(() => {
    /*zipper*/
    $('.zipperarea').each(function (intIndex) {
      $(this).attr('intindex', $(this).find('.marquee_infull').attr('intindex'));
      $(this).find('.slidnavigation').attr('intindex', $(this).attr('intindex'));
      clearInterval(interval[intIndex]);
    });

    function scrollMarquee(number, zipperIndex) {
      $('.zipperarea').each(function (index) {
        zipperIndex = parseInt(zipperIndex);
        if ($(this).hasClass('active')) {
          if (zipperIndex !== null && zipperIndex !== undefined) {
            if (zipperIndex !== index) return;
          }
          var zipperDiv = $(this);
          var prevActive = $(zipperDiv).find('.slidnavigation .active');

          if (number !== undefined && number !== '' && number !== -1) {
            var nextSlide = $(zipperDiv)
              .find('.marquee_infull')
              .find('[slide_for=' + number + ']');
            var prevRight = parseInt($(zipperDiv).find('.marquee_infull').css('width')) + extrawidth;

            $(zipperDiv).find('.marquee_infull .current').removeClass('current');
            $(zipperDiv).find('.marquee_infull .next').removeClass('next');
            $(nextSlide).addClass('current');

            if ($(nextSlide).next().length === 0) {
              $(zipperDiv).find('.marquee_infull .marquee_txt:first-child').addClass('next');
            } else {
              $(nextSlide).next().addClass('next');
            }

            $(prevActive).removeClass('active');
            $(zipperDiv)
              .find('.slidnavigation')
              .find('[nav_for=' + number + ']')
              .addClass('active');

            $(zipperDiv)
              .find('.marquee_infull .marquee_txt')
              .each(function () {
                $(this).css('right', prevRight + 'px');
              });

            div1Width[index] = $(zipperDiv).find('.marquee_infull .current').outerWidth();
            div2Width[index] = $(zipperDiv).find('.marquee_infull .next').outerWidth();
            p[index] = -div1Width[index];
            q[index] = p[index] + -div2Width[index] - extrawidth;

            $(zipperDiv)
              .find('.marquee_infull .current')
              .css('right', p[index] + 'px');
            $(zipperDiv)
              .find('.marquee_infull .next')
              .css('right', q[index] + 'px');
            // $(zipperDiv)
            //   .find('.marquee_imgslid')
            //   .slick('slickGoTo', parseInt(number - 1));
            sliderRef.current.slickGoTo(number - 1);
          } else {
            imgWidth = $('.top_titleimg ').outerWidth();
            windowWidth = $('.zipper_poll .container ,.newswelcome .container').outerWidth() - 30;

            div1Width[index] = $(zipperDiv).find('.marquee_infull .current').outerWidth();
            $(zipperDiv).find('.marquee_infull .marquee_txt').css('position', 'absolute');

            $(zipperDiv)
              .find('.marquee_infull .previous')
              .each(function () {
                $(this).css('right', parseInt($(this).css('right')) + 1 + 'px');
              });

            imgRight = parseInt($('.top_titleimg').css('right')) + 1;
            if (imgRight <= windowWidth - imgWidth) {
              $('.top_titleimg').css('right', imgRight + 'px');
            }

            $(zipperDiv)
              .find('.marquee_infull .current')
              .css('right', p[index] + 'px');
            $(zipperDiv)
              .find('.marquee_infull .next')
              .css('right', q[index] + 'px');
            p[index]++;
            q[index]++;
            if (p[index] > extrawidth) {
              $(prevActive).removeClass('active');
              if ($(zipperDiv).find('.marquee_infull .current').next().length === 0) {
                $(zipperDiv).find('.slidnavigation').find('[nav_for=1]').addClass('active');
              } else {
                $(prevActive).next().addClass('active');
              }

              $(zipperDiv).find('.marquee_infull .current').addClass('previous').removeClass('current');
              $(zipperDiv).find('.marquee_infull .next').addClass('current').removeClass('next');

              if ($(zipperDiv).find('.marquee_infull .current').next().length === 0) {
                $(zipperDiv).find('.marquee_infull .marquee_txt:first-child').addClass('next');
              } else {
                $(zipperDiv).find('.marquee_infull .current').next().addClass('next');
              }

              if ($(zipperDiv).find('.marquee_infull .current').is(':first-child')) {
                //go to first slide
                // $(zipperDiv).find('.marquee_imgslid').slick('slickGoTo', 0);
                sliderRef.current.slickGoTo(0);
              } else {
                //go to next slide
                $(zipperDiv).find('.marquee_imgslid .slick-next').trigger('click');
              }

              div1Width[index] = $(zipperDiv).find('.marquee_infull .current').outerWidth();
              div2Width[index] = $(zipperDiv).find('.marquee_infull .next').outerWidth();
              p[index] = parseInt($(zipperDiv).find('.marquee_infull .current').css('right'));

              q[index] = p[index] + -div2Width[index] - extrawidth;
              $(zipperDiv)
                .find('.marquee_infull .next')
                .css({
                  right: q[index] + 'px',
                  left: 'auto',
                });
            }
            var slide_no = parseInt($(zipperDiv).find('.slidnavigation .active').attr('nav_for'));
            var last_slide = $(zipperDiv).find('.marquee_infull').children().length;

            if (slide_no === 1) {
              $(zipperDiv).find('.slidnavigation span.active').next().css('display', 'block');
              $(zipperDiv).find('.slidnavigation span.active').next().next().css('display', 'block');
            } else if (slide_no === last_slide) {
              $(zipperDiv).find('.slidnavigation span.active').prev().css('display', 'block');
              $(zipperDiv).find('.slidnavigation span.active').prev().prev().css('display', 'block');
            } else {
              $(zipperDiv).find('.slidnavigation span.active').prev().css('display', 'block');
              $(zipperDiv).find('.slidnavigation span.active').next().css('display', 'block');
            }
          }
        }
      });
    }

    $('.slidnavigation').each(function () {
      var lastcount = $(this).find('.next').prev().html();
      $(this)
        .find('.next')
        .before('<span className="slidcount"> ' + lastcount + '</span>');
    });

    /*$('.newsall_Select .custombox_select').multipleSelect({
    single:true
});*/

    /*cast toggle*/
    $('.filmography_title ').click(function () {
      $(this).next().slideToggle();
      $(this).parent().toggleClass('active');
    });

    //$('.marquee_imgslid').before('<div className="marquee_imgslidzoom"></div>');
    $('.marquee_imgslid .slick-current.slick-active .mqitemimg').hover(function () {
      var marqueezoom_img = $(this).attr('src');
      //console.log(marqueezoom_img);
      //$(this).parents('.marquee_imgslid').prev('.marquee_imgslidzoom').find('img').remove();
      $(this).parents('.marquee_imgslid').prev('.marquee_imgslidzoom').find('img').attr('src', marqueezoom_img);
    });
    /* var stripwidth = $('.zipperstrip').outerWidth() - 302;
     $('.zippermediabox .top_titleimg').css('transform', 'translateX(' + stripwidth + 'px)');*/

    $(window).scroll(function () {
      $('.zipperarea').each(function () {
        if ($(this).isOnScreen()) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    });

    $.fn.isOnScreen = function (test) {
      var height = this.outerHeight();
      var width = this.outerWidth();
      if (!width || !height) {
        return false;
      }
      var win = $(window);
      var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft(),
      };
      viewport.right = viewport.left + win.outerWidth();
      viewport.bottom = viewport.top + win.outerHeight() / 1.5;
      var bounds = this.offset();
      bounds.right = bounds.left + width;
      bounds.bottom = bounds.top + height;
      var deltas = {
        top: viewport.bottom - bounds.top,
        left: viewport.right - bounds.left,
        bottom: bounds.bottom - viewport.top,
        right: bounds.right - viewport.left,
      };
      if (typeof test == 'function') {
        return test.call(this, deltas);
      }
      return deltas.top > 0 && deltas.left > 0 && deltas.right > 0 && deltas.bottom > 0;
    };

    if ($('.marquee_imgslid').length > 0) {
      $('.slidnavigation, .loading ').removeClass('loading');

      $('.closead').click(function () {
        $(this).parent().hide();
      });
      $('.marquee_infull .marquee_txt').each(function () {
        var width = $(this).width() + 1;
        $(this).css('width', width + 'px');
        arrWidth += width;
        $(this).css('right', -arrWidth - 20 + 'px');
      });
      $('.marquee_infull .marquee_txt:first-child').addClass('current');
      $('.marquee_infull .marquee_txt:nth-child(2)').addClass('next');
      $('.slidnavigation').find('[nav_for=1]').addClass('active');

      $('.zipperarea').each(function (index) {
        var $zipper = $(this);
        div1Width[index] = $zipper.find('.marquee_infull .current').outerWidth();
        div2Width[index] = $zipper.find('.marquee_infull .next').outerWidth();
        p[index] = -div1Width[index];
        q[index] = p[index] + -div2Width[index] - extrawidth;

        $('.slidnavigation span').on('click', function (e) {
          e.preventDefault();
          var intIndex = $(this).parent().attr('intIndex');
          if ($(this).hasClass('disabled')) {
            return false;
          }
          var prevNo = parseInt($(this).parent().find('span.active').attr('nav_for'));
          var no;
          var last = parseInt($('.slidcount').text());
          if ($(this).hasClass('next')) {
            no = prevNo + 1;
            if (no > last) no = 1;
          } else if ($(this).hasClass('prev')) {
            no = prevNo - 1;
            if (no === 0) {
              no = last;
            }
          } else {
            no = $(this).attr('nav_for');
          }
          scrollMarquee(no, intIndex);
        });

        interval[index] = setInterval(function () {
          scrollMarquee(-1, index);
        }, 10);

        $zipper
          .find('.marquee_infull .marquee_txt')
          .mouseover(function () {
            var intIndex = $(this).parent().attr('intindex');
            clearInterval(interval[intIndex]);
            $(this).parent().addClass('slidstop');
          })
          .mouseout(function () {
            var intIndex = $(this).parent().attr('intindex');
            interval[index] = setInterval(function () {
              scrollMarquee(-1, intIndex);
            }, 10);
            $(this).parent().removeClass('slidstop');
          });
      });
      // scrollMarquee();
    }
  }, []);

  return (
    <div className="zippermediabox">
      <div className="zipperarea">
        <div className="zipper_block df fww">
          <div className="zipperleft">
            <div className="zipperleft_box">
              <div className="top_zipperbox df fww">
                <div className="zippermediaslid">
                  <Slider {...SliderSettings} ref={sliderRef} className="marquee_imgslid">
                    {data &&
                      data.map((item, id) => {
                        return (
                          <div className="mqitemimg pvr" key={id}>
                            <a href={item.link} target='_blank'>
                              <img src={item.img.url} alt="" className="objctimg_box" />
                            </a>
                          </div>
                        );
                      })}
                  </Slider>
                  <div className="slidnavigation">
                    <span nav_for="1">1</span>
                    <span nav_for="2">2</span>
                    <span nav_for="3">3</span>
                    <span nav_for="4">4</span>
                    <span nav_for="5">5</span>
                    <span nav_for="6">6</span>{' '}
                  </div>
                </div>
                <div className="zipperstrip">
                  <div className="top_titleimg">
                    <p>Headlines : </p>
                  </div>
                  <div className="marquee">
                    <div className="marquee_infull" intindex="0">
                      {data &&
                        data.map((item, id) => {
                          return (
                            <div className="marquee_txt" slide_for={id + 1} key={id}>
                              <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')} target="_blank">
                                {/*<span className="pvr srcico">
                                  <Image className="objctimg_box" src={newstikersrcimg+item.link} width="15" height="15" alt="news src icon" />
                          </span> */}
                                {item.text}
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZipperMedia;
