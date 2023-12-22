import GoogleAds from 'react-google-ads';

function HomePageAds({cls = 'add_300', format = 'auto'}) {
  
  return (
    
    <div className={cls}>      
      <GoogleAds
        client="ca-pub-8220736153595737"
        slot="1078164177"
        style={{ display: 'inline-block', width: '100%' }}
        format={format}
        responsive="true"
      />
    </div>
  );
}

export default HomePageAds;
