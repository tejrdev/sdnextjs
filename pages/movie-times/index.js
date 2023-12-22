import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Movies from '../../components/MovieTimes/Movies';
import Subscriber from '../../components/Homepage/Subscriber';

import Trailers from '../../components/MovieTimes/Trailers';
import Previews from '../../components/MovieTimes/Previews';
import SingleActor from '../../components/MovieTimes/SingleActor';
import MultiActors from '../../components/MovieTimes/MultiActors';
import IndustryNews from '../../components/MovieTimes/IndustryNews';
import Loader from '../../components/Loader';
// import RankMathSEO from '../../RankMathSEO';
const $ = require('jquery');

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(process.env.NEXT_PUBLIC_SEO_LINK + 'movie-times');
  const data = await res.json();

  // MovieTimesData page static data
  let MovieTimesData = await fetch(
   process.env.NEXT_PUBLIC_SD_API + '/movie-times-page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN
  );
  MovieTimesData = await MovieTimesData.json();

  return {
    props: { data, MovieTimesData },
    revalidate: 10, // In seconds
  };
}

const MovieTimes = ({ data , MovieTimesData }) => {
   const [MovieTimesDataLoaded, setMovieTimesDataLoaded] = useState(false);
  // const [MovieTimesData, setMovieTimesData] = useState([]);
  useEffect(() => {
    loadMovieTimesData();
  }, []);

  const loadMovieTimesData = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SD_API + '/movie-times-page/?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN)
      .then((res) => {
        //setMovieTimesData(res.data);
        setMovieTimesDataLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head >
        {(data.children[0].children).map( (item, index) => {
            const attributes = item.tag.toUpperCase();

            switch (attributes) {
              case 'TITLE':
                return <title key={index}>{item.html}</title>;
              case 'META':
                const name = item.name || '';
                if(name !== ''){
                return <meta key={index} name={item.name} content={item.content} />;
                } else{
                return <meta key={index} property={item.property} content={item.content} />;
                }
              case 'LINK':
                return <link key={index} rel={item.rel} href={item.href} />;
              case 'SCRIPT':
                return (
                  <script key={index} type={item.type} class={item.class} 
                     dangerouslySetInnerHTML={{ __html: item.html }}>
                  </script>
                );
              default:
                return null;
            }
          })}
      </Head>
      
        <>
          {/* <RankMathSEO /> */}
          <section className="movietm_title">
            <div className="container">
              <div className="top_txt text-center">
                <h1 className="h2">Movie Times</h1>
                {/* <p>March 9, 2022</p> */}
              </div>
            </div>
          </section>
          {MovieTimesData.movie_time_content.map((item, index) => {
            switch (item.get_row_layout) {
              case 'trailers_section':
                switch (item.design_grid) {
                  case 'true':
                    return <Trailers data={item} key={index} />;
                    //return null;
                  default:
                    return <Previews data={item} key={index} />;
                }
              case 'select_movie_list':
                return <Movies data={item} key={index} />;
              case 'add_newsletter':
                return (
                  <section className="home_subscribe">
                    <Subscriber title={item.title} content={item.content} />
                  </section>
                );
              case 'single_actor_layout':
                switch (item.single_actor_layout) {
                  case 'true':
                    return <SingleActor data={item} key={index} />;
                  default:
                    return <MultiActors data={item} key={index} />;
                }
              case 'select_article':
                return <IndustryNews data={item} key={index} />;
              default:
                return null;
            }
          })}
        </>
      
    </>
  );
};

export default MovieTimes;
