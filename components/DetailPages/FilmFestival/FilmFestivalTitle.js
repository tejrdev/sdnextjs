import Image from 'next/image';
import Countday from '../../../components/countdownday/countdown';

const FilmFestivalTitle = ({ data, data_2 }) => {
  return (
    <section className="cannescount toplinesec">
      <div className="container">
        <div className="top_txt df fww just-between">
          <h3>
            <a href={data.festival_link} target="_blank" rel="noreferrer">              
              {data.title}
              <i className="fal fa-angle-right"></i>
            </a>
          </h3>
          <h3 className="todates">{data.festival_date_title}</h3>
        </div>
        <div className="cannescountbox df fww just-between">
          {data.logo &&
          <div className="cannesleave">
            <a href={data.festival_link} target="_blank" rel="noreferrer">
              <Image src={data.logo} rel="preload" as="image" title={data.title}  alt={data.title} width="130" height="100"/>
            </a>
          </div>
          }
          {data_2 && (
        <div className="countdown-container" id={data_2}>        
          <div className="countdatenum">
          {data.release_date_count_down < 30 && (
            <h3><strong>Begins in <span className="countdownnum" ></span>
            <span className="releasedateinfo"><Countday data={data_2}/></span></strong></h3>
            )
        }
          </div>
        </div>
        )}

        </div>
      </div>
    </section>
  );
};

export default FilmFestivalTitle;
