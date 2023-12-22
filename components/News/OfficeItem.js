import { convertToInternationalCurrencySystem } from '../Homepage/FilmData';

const OfficeItem = ({ item, tag }) => {
  return (
    <>
      <div className="officecom_item">
        <figure className="pvr">
          <p className="boxearning">
            {tag === 'boxoffice'
              ? '$' + convertToInternationalCurrencySystem(item.weekend_gross)
              : item.release_date.split('/')[0] +
                '/' +
                item.release_date.split('/')[1]}
          </p>
          <img src={item.poster_thumbnail} alt="" className="objctimg_box" />
        </figure>
        <p>
          <a href={item.permalink}>{item.title}</a>
        </p>
      </div>
    </>
  );
};

export default OfficeItem;
