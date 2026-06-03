import HomePageAds from '../../../Homepage/HomePageAds';
import FilmographyFilms from './FilmographyFilms';

const Filmography = ({ data, name }) => {
  return (
    <section className='filmography toplinesec' id='filmography'>
      <div className='container'>
        <div className='top_txt'>
          <h2>
            {name} Movies <i className='fal fa-angle-right'></i>
          </h2>
        </div>

        <div className='filmogrhpybox df fww just-between'>
          <div className='filmogrhpybox_info'>
            {data.map((item, index) => {
              return (
                <div className='filmography_item' key={index}>
                  {item.film_role_title && (
                    <h3 className='capitalize'>
                      <u>{item.film_role_title}</u>
                    </h3>
                  )}
                  {item?.Upcoming && <FilmographyFilms data={item.Upcoming.films} index={index} title='Upcoming' />}
                  {item?.Previous && <FilmographyFilms data={item.Previous.films} index={index} title='Previous' />}
                </div>
              );
            })}
          </div>
          <div className='filmogrhpy_adds'>
            <HomePageAds cls='add_300' format='horizontal' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filmography;
