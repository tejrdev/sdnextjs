import Gallery from '../Gallery';
import Dailies from './Dailies';
import FestivalImg from './FestivalImg';
import FilmFestivalTitle from './FilmFestivalTitle';
import OpenLetter from './OpenLetter';
const FilmFestivals = ({ data, data_2 }) => {
  return (
    <>
    
      {data.banner_image &&  <FestivalImg data={data} />}
      {/* <FilmFestivalTitle data={data} data_2={data_2}/> */}
      {data.image_gallery && <Gallery data={data.image_gallery} title={data.title} /> }
       {data.opening_letter_text && <OpenLetter data={data} /> }
       {data.festival_dailies && <Dailies data={data.festival_dailies} />}
    </>
  );
};

export default FilmFestivals;
