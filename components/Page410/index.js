import axios from 'axios';
import { useState, useEffect } from 'react';
const $ = require('jquery');
import img410 from '../../public/images/410.png'

const Page404 = () => {
  const [Page404load, setPage404load] = useState(false);
  const [Page404_data, setPage404] = useState([]);

  useEffect(() => {
    /*if (window.location.href.indexOf('.pdf') > -1) {
      //console.log(process.env.NEXT_PUBLIC_MENU_URL1 + window.location.pathname);
      //window.location.href = process.env.NEXT_PUBLIC_MENU_URL1 + window.location.pathname;
    } else {
      load404Page();
    } */
    load404Page();
  }, []);

  const load404Page = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/404_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        setPage404(res.data);
        setPage404load(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {Page404load ? (
        <section className="notfound subfilmy">
          <div className="container">
            <div className="ntfounderror">
              <div className="nferror">
                <img src={img410.src} alt="" />
              </div>
              <div className="nftxt text-center"><h1> Content No Longer Available </h1>
                <p>The page you’re looking for is no longer available. <a href="https://www.screendollars.com/contact-us/">contact us</a> for more information.</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default Page404;
