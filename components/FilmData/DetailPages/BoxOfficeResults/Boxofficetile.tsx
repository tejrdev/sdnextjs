import { Boxofficetiletype } from './Boxofficetiletype';
import Allyearsummery from './Allyearsummery';
import TopQmovies from './TopQmovies';
import BoxOfficeTileCard from './BoxOfficeTilleCard';

const Boxofficetile = ({ data, toggleon = false, currentLayout = '', selectedYear = 0, selectedQuarter = '' }: Boxofficetiletype) => {
  return (
    <>
      {(currentLayout === 'SW' || currentLayout === 'SY' || currentLayout === 'ATT' || currentLayout === 'RY') && (
        <div className='boxofice_cards grid gap-5 mb-10'>
          {data.map((item, index) => {
            if ((currentLayout === 'SW' && toggleon ? item.weekly_gross : item.weekend_gross_order && item.weekend_gross_order >= 1) || currentLayout === 'SY' || currentLayout === 'ATT' || currentLayout === 'RY') {
              return <BoxOfficeTileCard currentLayout={currentLayout} item={item} toggleon={toggleon} index={index} key={index} />;
            }
          })}
          {data.every((item) => item.weekly_gross === null || item.weekly_gross === undefined) && currentLayout === 'SW' && (
            <div className='card border border-solid border-gray-400 rounded-md p-2 text-center font-bold text-2xl'>Data not available for this time period!</div>
          )}
        </div>
      )}
      {currentLayout === 'AY' && <Allyearsummery data={data} />}
      {(currentLayout === 'SQT' || currentLayout === 'SYT' || currentLayout === 'ATP') && <TopQmovies data={data} selectedYear={selectedYear} selectedQuarter={selectedQuarter} selectedLayout={currentLayout} />}
    </>
  );
};
//className='text-green-500'
export default Boxofficetile;
