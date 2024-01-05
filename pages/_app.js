import Head from 'next/head';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderPro from '../components/Header/Proheader';
//for state management
import { Providers } from '../redux/provider';

import Layout from '../components/Layout/Layout';

// import "../styles/index.css";
// import "../styles/home.css";
// import "../styles/directory.css";
// import "../styles/news.css";
// import "../styles/newsletter.css";
// import "../styles/movietimes.css";
// import "../styles/talent_list.css";
// import "../styles/filmdata.css";
// import "../styles/videos.css";
// import "../styles/fontawsome.css";
// import "../styles/theverdict.css";
// import "../styles/print.css";
// import "../styles/detail.css";
// import "../styles/filmz.css";
// import "../styles/trailers_updates.css";
// import "../styles/filmdetail.css";
// import "../styles/moviedata.css";
// import "../styles/comparechart.css";
// import "../styles/article_detail.css";
// import "../styles/top10.css";
// import "../styles/quicklinks.css";
// import "../styles/exibitor_detail.css";
// //import "../styles/theatre_detail.css";
// import "../styles/VendorDetail.css";
// import "../styles/about.css";
// import "../styles/advertisestyle.css";
// import "../styles/contactusestyle.css";
// import "../styles/nonstopnews.css";
// import "../styles/profile.css";
// // import "../styles/login.css";
// import "../styles/favorite.css";
// import "/styles/favoriteDetail.css";
// import "../styles/search.css";

import '../styles/util.css';
//import '../styles/site.scss';
import '../styles/site.css';
//import '../styles/chunk.css';

import '../components/Header/magnific-popup.min.css';
import '../components/Header/header.css';
import '../components/Footer/footer.css';

let navigationPropsCache;

export default function MyApp({ Component, pageProps, session, navigationProps }) {
  useEffect(() => {
    navigationPropsCache = navigationProps;

    /*table css*/
    $('table.dataTable').each(function () {
      var trcount = $(this).find('thead tr').length;
      //console.log(trcount);
      if (trcount > 1) {
        $(this).addClass('twotblhead');
      }
    });

    $(' .responsive ,.responsive tr th , .responsive tr td').css({
      border: '1px solid #c5c5c5',
      'border-collapse': 'collapse',
      padding: '6px',
    });
    $('.dataTables_info').css({ display: 'none' });
    $('.printhide').css({ visibility: 'hidden', height: '0', overflow: 'hidden' });

    $('.dataTable').wrap('<div class="datatable_wrap"/>');

    /*!data table*/

    $(document).on('click', '.pritbtn', function (e) {
      var $toptxt, $printheader;
      if ($('.top_btnbox_left')[0]) {
        $toptxt = $(this).parent().parent().parent();
      } else {
        $toptxt = $(this).parent().parent();
      }
      if ($('.print_top')[0]) {
        $toptxt = $(this).closest('.printarea').find('.print_top');
      }
      if ($('.pagebox_print').length > 0) {
        $toptxt = $(this).find('.print_head .top_txt');
      }
      if ($(this).closest('.printarea').find('.printheader').length == 0) {
        $toptxt.before('<div class="printheader"></div>');
        $printheader = $(this).closest('.printarea').find('.printheader');
        var logoimg = $('.site-logo > a ').html();
        $printheader.prepend('<div class="printlogo" style="display:none;"></div>');
        $printheader.find('.printlogo').append(logoimg);
        if ($toptxt.find('.top_info > h2 , .top_info > .h2 , .top_info > .h3,.page_introbox > .h2 ').length > 0) {
          let headingtxt = $toptxt.find('.top_info > h2 , .top_info > .h2 , .top_info > .h3 ,.page_introbox > .h2').clone();
          $('.printheader').append(headingtxt);
        }
        if ($toptxt.find('> h2 ,> .h2 , > .h3').length > 0) {
          let headingtxt2 = $toptxt.find('h2 ,> .h2, .h3').clone();
          $('.printheader').append(headingtxt2);
        }
        if ($toptxt.parent().parent().hasClass('article-wrapper')) {
          let headingtxt3 = $toptxt.find('.post-cat').clone();
          $printheader.append(headingtxt3);
          $('.printheader > h2 ,.printheader > .h2 , .printheader > .h3').hide();
        }
        $printheader.append('<ul class="printcontact"><li>www.screendollars.com</li><li>contactus@screendollars.com</li><li>+1(978)494-4150</li></ul>');
      }
    });
    //$('.pritbtn').click(function(){
    $(document).on('click', '.pritbtn', function (e) {
      /*console.log("print");*/
      var $printheader = $(this).closest('.printarea').find('.printheader');
      var activateweek = $('.boweekyear ul li.active').html() + '&nbsp;' + $('.boweekweek ul li.active').html();
      //var activateweekbox = $('.boweekyear #s_year li.active').html() + '&nbsp;' + $('.boweekweek #s_week li.active').html();
      if ($('.printactivebox').length > 0) {
        $('.printactivebox').each(function () {
          $(this).remove();
        });
      }
      if ($('.cat_navbox .boweekinfo').length > 0) {
        $printheader.append('<div class="printactivebox"></div>');
        $printheader.find('.printactivebox').append(activateweek);
      }
    });
    $(document).on('click', '.pritbtn', function (e) {
      var url = window.origin + '/print.css';
      var baseurl = url;
      //window.location.origin +
      // $('.site-logo > a').attr('href') +
      //'https://www.screendollars.com/wp-content/themes/screendollars-live/assets/css/print.css?v=5';

      var frame1 = $('<iframe />');
      frame1[0].name = 'frame1';
      frame1.css({ position: 'absolute', top: '-1000000px' });
      $('body').append(frame1);
      var WinPrint = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
      //WinPrint.document.open();
      var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write('<html lang="en"><head><title></title> <link href="' + baseurl + '" rel="stylesheet" media="print" type="text/css" />');
      WinPrint.document.write('</head><body>');
      var time = new Date();
      var loacaltime = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      today = mm + '/' + dd + '/' + yyyy;
      if ($(this).data('multiprint')) {
        $('.printarea').each(function () {
          WinPrint.document.write($(this).html());
          WinPrint.document.write('<div class="printcopy">\n<p style="margin:30px 0 0">Printed on ' + today + ' at ' + loacaltime + '</p><p>\xA9' + yyyy + '&nbsp;' + 'Screendollars | All Rights Reserved</p></div>');
        });
      } else {
        var prtContent = $(this).parents('.printarea');
        WinPrint.document.write(prtContent.html());
        WinPrint.document.write('<div class="printcopy"><p style="margin:30px 0 0">Printed on ' + today + ' at ' + loacaltime + '</p><p>\xA9' + yyyy + '&nbsp;' + 'Screendollars | All Rights Reserved</p></div>');
      }
      //For removing the social share icons
      while (WinPrint.document.getElementsByClassName('social_share')[0]) WinPrint.document.getElementsByClassName('social_share')[0].remove();
      WinPrint.document.write('</body></html>');
      setTimeout(function () {
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }, 1000);
      return false;
    });
    $("a[href^='#']").attr('target', '');
    $("a[href^='#']").click(function (e) {
      e.preventDefault();
    });

    /* youtube link replace*/
    var popurl = [];
    $('a.popvid , a.popvidgallery , a.popvidbox').each(function (i) {
      if ($(this).attr('href') !== undefined) {
        popurl.unshift($(this).attr('href'));
        for (var i = 0; i < popurl.length; i++) {
          var popnew = [];
          popnew.unshift(popurl[i].replace('youtu.be/', 'www.youtube.com/watch?v='));
          $(this).eq(i).attr('href', popnew[i]);
        }
      }
    });
  }, []);

  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
        <div>
          <SessionProvider session={session}>
            <Layout>
              <Header data={navigationProps} />
              <Component {...pageProps} />
              <Footer data={navigationProps} />
            </Layout>
          </SessionProvider>
        </div>
      );
    };
  if (Component.getLayout && Component.getLayout().props?.layout === 'withRedux') {
    return renderWithLayout(
      <SessionProvider session={session}>
        <Layout>
          <Header data={navigationProps} />
          <Providers>
            <Component {...pageProps} />
          </Providers>
          <Footer data={navigationProps} />
        </Layout>
      </SessionProvider>
    );
  }

  return renderWithLayout(
    <SessionProvider session={session}>
      <HeaderPro data={navigationProps} />
      <Providers>
        <Component {...pageProps} />
      </Providers>
      <Footer data={navigationProps} />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async () => {
  if (navigationPropsCache) {
    return { navigationProps: navigationPropsCache };
  }

  const res = await fetch(process.env.NEXT_PUBLIC_SD_API + '/sd_menu/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
  const navigationProps = await res.json();
  navigationPropsCache = navigationProps;

  return { navigationProps };
};
