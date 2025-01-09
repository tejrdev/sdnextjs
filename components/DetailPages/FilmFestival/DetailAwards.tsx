import Link from 'next/link';
import Pagination from '../../../components/Directory/ListingPages/Pagination';
import { Awarditem } from '../../../components/FilmData/DetailPages/Biography/Awards';
const sampledata = {
  'award_name': 'Best Action Film',
  'award_year': '2020',
  'event_name': 'Dir. Zak Marx',
  'movie_name': 'Adventure',
  'award_image': '',
};

interface DetailAward {
  data: any[];
}
const DetailAwards = ({ data }: DetailAward) => {
  return (
    <section className='festawards toplinesec'>
      <div className='container'>
        <div className='top_txt'>
          <h2>
            Recent Awards <i className='fal fa-angle-right'></i>
          </h2>
        </div>
        <div className='awarscards grid gap-1 gap-y-4'>
          {data.map((item, index) => (
            <Awarditem info={item} key={index} />
          ))}
        </div>

        {/* <Pagination totalPages={11} setCurrentPage={1} currentPage={1} /> */}
      </div>
    </section>
  );
};

export default DetailAwards;
