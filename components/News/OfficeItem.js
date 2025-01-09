import { convertToInternationalCurrencySystem } from '../Homepage/FilmData';
import Link from 'next/link';

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
          <Link href={tag === 'boxoffice' ? item.permalink : item.link}>
            <img src={item.poster_thumbnail} alt="" className="objctimg_box" />
          </Link>
        </figure>
        <p>
          <Link href={tag === 'boxoffice' ? item.permalink : item.link}>{item.title}</Link>
        </p>
      </div>
    </>
  );
};

export default OfficeItem;
