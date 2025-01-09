import { useEffect } from 'react';
import Link from 'next/link';
const $ = require('jquery');

const DistributorSearch = ({ text, requestfrom, backlink }) => {
  // useEffect(() => {
  //   // quick link distibuotr search
  //   // quick links pages
  //   $('.disctcalander_srch #f_film_search').keyup(function (e) {
  //     clearTimeout($.data(this, 'timer'));
  //     if (e.keyCode == 13) distibutor_posts_list(true);
  //     else $(this).data('timer', setTimeout(distibutor_posts_list, 300));
  //   });

  //   function distibutor_posts_list() {
  //     var s_data = $('.disctcalander_srch #f_film_search').val();
  //     var s_data_link = $('.disctcalander_srch #page_link_search').val();
  //     if (s_data.length !== 0) {
  //       $.ajax({
  //         dataType: 'JSON',
  //         type: 'post',
  //         url: ajax_custom_data.ajaxurl,
  //         data: {
  //           'action': 'distibutor_quick_links_search',
  //           's_data': s_data,
  //           's_data_link': s_data_link,
  //         },
  //         beforeSend: function () {},
  //         success: function (data) {
  //           if (data.html_data) {
  //             $('.disctcalander_srch .distsrchbox_listing').html(data.html_data);
  //             $('.disctcalander_srch .distsrchbox_listing').show();
  //           } else {
  //             $('.disctcalander_srch .distsrchbox_listing').html('');
  //             $('.disctcalander_srch .distsrchbox_listing').hide();
  //           }
  //         },
  //       });
  //     } else {
  //       $('.disctcalander_srch .distsrchbox_listing').html('');
  //       $('.disctcalander_srch .distsrchbox_listing').hide();
  //     }
  //   }
  // }, []);
  return (
    <div className='distsrch'>
      {requestfrom === 'distributordetail' ? (
        <div className='backarow'>
          <Link href={backlink.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
            <i className='fas fa-long-arrow-left'></i> Back
          </Link>
        </div>
      ) : null}

      <div className='distsrchbox df fww'>
        <div className='findinput df fww'>
          <input type='hidden' id='page_link_search' name='page_link_search' vaule='/by-distributors/' />
          <input type='input' id='f_film_search' name='' placeholder='Search Your Favourite Distributor ' tabIndex='0' className='p-3 w-full bottom-0 appearance-none bg-transparent' />
        </div>
        <button type='submit'>
          <i className='far fa-search'></i>
        </button>
      </div>
      <div className='distsrchbox_listing' style={{ display: 'none' }}></div>
      <p className='greytxt text-center'>{text}</p>
    </div>
  );
};

export default DistributorSearch;
