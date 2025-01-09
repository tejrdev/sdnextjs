import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import axios from 'axios';

const ListNewsletter = ({ Pro_data, news_fitler }) => {
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setGridData(Pro_data.newsletter_list);
    setLink(localStorage.getItem('type_link'));
    setEmail(localStorage.getItem('email'));
  }, [Pro_data]);

  const [page_no, setpageNo] = useState(2);
  const [gridData, setGridData] = useState([]);

  const loadDataByPageNo = () => {
    $('.srchpageloading').removeClass('hide');
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/pro_newsletter.php?news_fitler=' + news_fitler + '&api_token=' + process.env.NEXT_PUBLIC_API_TOKEN + '&page_no=' + page_no)
      .then((res) => {
        setGridData((oldData) => oldData.concat(res.data.newsletter_list));

        setpageNo(page_no + 1);

        if (res.data.load_more_hide) {
          $('#pro-new-film-loadmore').addClass('hide');
        }
        $('.srchpageloading').addClass('hide');
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className='productlist'>
        {gridData && (
          <>
            {gridData.map((item, i) => (
              <div className='productlistitem df fww' key={i}>
                <figure className='pvr'>
                  {link !== 'pro' && link !== 'default' ? (
                    <Image src={item.img} className='objctimg_box' alt='' width={588} height={333} />
                  ) : (
                    <Link href={item.link}>
                      <Image src={item.img} className='objctimg_box' alt='' width={588} height={333} />
                    </Link>
                  )}
                </figure>
                <div className='productlistinfo'>
                  <div className='proitem'>
                    {item.pro_exclusive && (
                      <>
                        <span className='protag uppercase'>pro exclusive</span>
                        <span>{item.pro_exclusive}</span>
                      </>
                    )}
                  </div>
                  <h4>
                    <Link href={item.link}>{item.title}</Link>
                  </h4>
                  <div className='pubdate'>{item.news_letter_date}</div>

                  {link !== 'pro' && link !== 'default' ? (
                    <div className='morebtn'>
                      <Link href={'/pro/signup/'} className='ghostbtn goldbtn uppercase'>
                        view more{' '}
                      </Link>
                    </div>
                  ) : (
                    <>
                      {item.sp_report ? (
                        <div className='morebtn'>
                          <Link href={item.news_letter_PDF} target='_blank' className='ghostbtn goldbtn uppercase'>
                            view more
                          </Link>
                        </div>
                      ) : (
                        <div className='morebtn'>
                          <Link href={item.link} className='ghostbtn goldbtn uppercase'>
                            view more
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {Pro_data.load_more === 'true' ? (
        <>
          <div className='morebtn'>
            <p onClick={loadDataByPageNo} id='pro-new-film-loadmore' className='ghostbtn goldbtn uppercase'>
              More Newsletters
            </p>
          </div>
          <div className='pvr loaderOverlay srchpageloading hide'>
            {' '}
            <span className='loader'></span>{' '}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ListNewsletter;
