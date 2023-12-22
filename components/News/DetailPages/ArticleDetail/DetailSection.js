import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import '../../../../Header/magnific-popup.min.css';

const DetailSection = ({ data }) => {
  const [EmailFormClass, setEmailFormClass] = useState('wpcf7-form');

  useEffect(() => {
    const $ = window.jQuery;
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
    $(document).on('click', '#news_detail_subscribe .searchbtntxt', function (e) {
      e.preventDefault();
      $('#news_detail_subscribe .wpcf7-error_message').html('');
      if ($('#news_detail_subscribe [name="checkbox-811[]"]').prop('checked') == true) {
        $('#news_detail_subscribe .wpcf7-spinner').css('visibility', 'visible');
        var form_data = new FormData();
        form_data.append('email-445', $('[name="email-445"]').val());
        axios
          .post(process.env.NEXT_PUBLIC_MENU_URL + 'wp-json/contact-form-7/v1/contact-forms/20524/feedback', form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
            $('#news_detail_subscribe .wpcf7-spinner').css('visibility', 'hidden');
            if (res.data.status === 'mail_sent') {
              setEmailFormClass('wpcf7-form sent');
              $('#news_detail_subscribe .wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            } else {
              setEmailFormClass('wpcf7-form invalid');
              $('#news_detail_subscribe .wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">' + res.data.message + '</p>');
            }
          })
          .catch((err) => console.log(err));
      } else {
        $('#news_detail_subscribe .wpcf7-error_message').html('<p class="wpcf7-not-valid-tip error">Please Read Our terms and conditions and checked the checkbox</p>');
      }
      return false;
    });
  }, []);
  return (
    <section className="artdetailarea sportart">
      <div className="container">
        <div className="artdtlbox subartbox df fww">
          <div className="artdtlbox_left subartbox_left">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: data.article_content }}></div>
            {data.original_source && (
              <div className="article-original-link">
                <a href={data.source_article} target="_blank">
                  <strong>{data.original_source}</strong>
                </a>
              </div>
            )}
            <div className="art_nav">
              <div className="front-show social_share">
                <div className="addtoany_shortcode"></div>
              </div>
              <div className="artnav_box df fww">
                {data.previous.link && (
                  <div className="art_navprev df fww  pvr">
                    <Link href={data.previous.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                      <div className="artnavimg">
                        <img src={data.previous.img} alt={data.previous.title} className="objctimg_box" />
                      </div>
                      <div className="artnav_txt">
                        <label>Previous Post</label>
                        <p>{data.previous.title}</p>
                      </div>
                    </Link>
                  </div>
                )}

                {data.next.links && (
                  <div className="art_navnext df fww  pvr">
                    <Link href={data.next.links.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                      <div className="artnavimg">
                        <img src={data.next.img} alt={data.next.title} className="objctimg_box" />
                      </div>
                      <div className="artnav_txt">
                        <label>Next Post</label>
                        <p>{data.next.title}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="signupsingle_box">
              <h3>{data.newsletters_title}</h3>
              <div dangerouslySetInnerHTML={{ __html: data.newsletters_contnet }}></div>
              <div className="search_inputbtn">
                <div role="form" className="wpcf7" id="" lang="en-US" dir="ltr">
                  <form className={EmailFormClass} noValidate="novalidate" id="news_detail_subscribe">
                    <div className="search_inputbtn">
                      <div className="your-email">
                        <span className="wpcf7-form-control-wrap" data-name="email-445">
                          <input type="email" name="email-445" value="" size="40" className="focusareasrch" />
                        </span>
                      </div>
                      <p>
                        <button type="button" className="submit-blog searchbtntxt">
                          Subscribe{' '}
                        </button>
                      </p>
                      <div className="checkbox_row">
                        <span className="wpcf7-form-control-wrap" data-name="checkbox-811">
                          <span className="wpcf7-form-control wpcf7-checkbox">
                            <span className="wpcf7-list-item first last">
                              <label>
                                <input type="checkbox" name="checkbox-811[]" value="By checking this box, you confirm that you have read and are agreeing to our" />
                                <span className="wpcf7-list-item-label"> By checking this box, you confirm that you have read and are agreeing to our </span>
                              </label>
                            </span>
                          </span>
                        </span>{' '}
                        <a className="termtxt" href="#termtxtbox">
                          {' '}
                          terms and conditions{' '}
                        </a>
                      </div>
                    </div>
                    <div className="wpcf7-error_message"></div>
                    <span className="wpcf7-spinner"></span>
                  </form>
                </div>
              </div>
            </div>
            <div id="termtxtbox" className="white-popup-block  mfp-hide termpopbox">
              <div className="formpop_info">
                <div className="fpinfo_head">
                  <h4>{data.conditions_of_use_title}</h4>
                </div>
                <div className="fp_body df fww" dangerouslySetInnerHTML={{ __html: data.conditions_of_use_content }}></div>
              </div>
            </div>
          </div>
          <div className="artdtlbox_right subartbox_right">
            <div className="add_300"></div>
            <div className="side_block">
              <div className="sideblck_top">
                <h4>Categories</h4>
              </div>
              <ul
                className="cat_listing"
                dangerouslySetInnerHTML={{
                  __html: data.category_list_display,
                }}
              ></ul>
            </div>
            <div className="side_block rspostside">
              <div className="sideblck_top">
                <h4>Recent Posts</h4>
              </div>
              <ul className="rspostlist">
                {data.recent_posts.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
                        <div className="rspost_thumb">
                          <div className="rspost_img pvr">
                            <img className="objctimg_box" src={item.img} alt="" />
                          </div>
                        </div>
                        <div className="rspost_txt">
                          <h6>{item.title}</h6>
                          <p className="datetxt">{item.p_date}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
