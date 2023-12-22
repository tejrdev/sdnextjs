import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

//components
import BoxOfficeResults from '../../components/FilmData/BoxOfficeResults';
import UpcomingReleases from '../../components/FilmData/UpcomingReleases';
import Filmgenre from '../../components/FilmData/filmgenre';

import QuickLinks from '../../components/FilmData/QuickLinks';
import Updates from '../../components/FilmData/Updates';
import Loader from '../../components/Loader';
// import RankMathSEO from '../../RankMathSEO';
// import '../../Header/magnific-popup.min.css';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'film-data');
  const data = await res.json();

  // filmData page static data
  let BoxOfficeData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/home_boxoffice/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  BoxOfficeData = await BoxOfficeData.json();

  let filmData = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/film_data_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  filmData = await filmData.json();

  //genre page titles
  let genretitlename = await fetch(
    process.env.NEXT_PUBLIC_SD_API + '/movie-genre/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  genretitlename = await genretitlename.json();



  return {
    props: { data, BoxOfficeData, filmData , genretitlename},
    revalidate: 10, // In seconds
  };
}

const FilmData = ({ data, BoxOfficeData, filmData , genretitlename }) => {
  //const genretitlename = genretitlename.genrename;
  //console.log(genretitlename.genrename)
  // const [BoxOfficeDataLoaded, setBoxOfficeDataLoaded] = useState(false);
  // const [BoxOfficeData, setBoxOfficeData] = useState([]);
  // const [filmDataLoaded, setFilmDataLoaded] = useState(false);
  // const [filmData, setFilmData] = useState([]);

  // useEffect(() => {
  //   loadBoxOfficeData();
  //   loadFilmData();
  // }, []);
  // const loadBoxOfficeData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/home_boxoffice/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
  //     .then((res) => {
  //       setBoxOfficeData(res.data);
  //       setBoxOfficeDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const loadFilmData = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_SD_API + '/film_data_page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
  //     .then((res) => {
  //       setFilmData(res.data);
  //       setFilmDataLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <>
      <Head >
        {(data.children[0].children).map((item, index) => {
          const attributes = item.tag.toUpperCase();

          switch (attributes) {
            case 'TITLE':
              return <title key={index}>{item.html}</title>;
            case 'META':
              const name = item.name || '';
              if (name !== '') {
                return <meta key={index} name={item.name} content={item.content} />;
              } else {
                return <meta key={index} property={item.property} content={item.content} />;
              }
            case 'LINK':
              return <link key={index} rel={item.rel} href={item.href} />;
            case 'SCRIPT':
              return (
                <script key={index} type={item.type} class={item.class}>
                  {item.html}
                </script>
              );
            default:
              return null;
          }
        })}
      </Head>

      <>
        {/* <RankMathSEO /> */}
        <Filmgenre data={genretitlename}/>
        <BoxOfficeResults data={BoxOfficeData.boxoffice_data} title={BoxOfficeData.boxoffice_title} />
        <UpcomingReleases data={BoxOfficeData.boxoffice_upcomming} />

        <>
          <QuickLinks data={filmData.quick_links} />
          <Updates data={filmData} />
        </>

      </>

    </>
  );
};

export default FilmData;
