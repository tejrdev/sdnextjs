// import GoogleAds from 'react-google-ads';
import { useEffect } from 'react';

function HomePageAds({ cls = 'add_300', format = 'auto' }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (

    <div className={cls}>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '100%' }}
        // format={format}
        // responsive="true"
        data-ad-client="ca-pub-8220736153595737"
        data-ad-slot="1078164177"
        data-ad-format={format}
        data-full-width-responsive="true"
      />

      {/* <GoogleAds
        client="ca-pub-8220736153595737"
        slot="1078164177"
        style={{ display: 'inline-block', width: '100%' }}
        format={format}
        responsive="true"
      /> */}
    </div>
  );
}

export default HomePageAds;
