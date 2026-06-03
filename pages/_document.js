import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script src='https://accounts.google.com/gsi/client' async defer></script>
        <script rel='preload' as='script' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>
        <script rel='preload' as='script' src='https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.37.1/apexcharts.min.js' integrity='sha512-hl0UXLK2ElpaU9SHbuVNsvFv2BaYszlhxB2EntUy5FTGdfg9wFJrJG2JDcT4iyKmWeuDLmK+Nr2hLoq2sKk6MQ==' crossOrigin='anonymous' referrerPolicy='no-referrer'></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P2KDTL7');`,
          }}></script>
        <Script async strategy='afterInteractive' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' crossOrigin='anonymous' />
        <script type="text/javascript">
          var infolinks_pid = 3443370;
          var infolinks_wsid = 0;
        </script>
        <script type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js"></script>

        <meta name='ahrefs-site-verification' content='ede2aabde6fe8d5317b130bd50f6128fcf109ecfe08328d8fc9e09aca194b475' />
        {process.env.NODE_ENV === 'production' ? (
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        ) : null}
        <meta name="fo-verify" content="5d02dd77-9e6f-4e6b-b217-81adf998a213" />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P2KDTL7" height="0" width="0" style="display:none;visibility:hidden" />`,
          }}
        />

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
