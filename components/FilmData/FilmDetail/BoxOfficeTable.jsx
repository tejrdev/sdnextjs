import { useState } from 'react';
import Togglebtn from '@/components/All/Togglebtn';

const BoxOfficeTable = ({ data }) => {
  let cntr = 0;
  const [toggleon, setToggleon] = useState(false);
  const togglehandle = (e) => setToggleon(!toggleon);
  return (
    <div className='fdtable rereleasetable'>
      <div className='filmytable_toggle text-right'>
        <Togglebtn toggleleft={'Weekend'} toggleright={'Weekly'} ontoggle={togglehandle} />
      </div>
      <div className='datatable_wrap'>
        <table className='responsive dataTable'>
          <thead>
            <tr>
              <th data-title='Week'>Week</th>
              <th data-title={(toggleon ? 'Weekly' : 'Weekend') + 'Gross $'}>Gross</th>
              <th data-title={(toggleon ? 'Weekly' : 'Weekend') + 'Gross% +/-LW'}>Gross% +/-LW</th>
              <th data-title={(toggleon ? 'Weekly' : 'Weekend') + 'Locations #'}>Locations</th>
              <th data-title={(toggleon ? 'Weekly' : 'Weekend') + 'Locations +/-LW'}>Locations +/-LW</th>
              <th data-title={(toggleon ? 'Weekly' : 'Weekend') + 'Locations Average'}>Locations Average</th>
              <th data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Gross to-date $'}>Gross to-date $ </th>
            </tr>
          </thead>
          <tbody>
            {data.map((items, index) => {
              if ((toggleon && items.weekly_gross === 'Not Available') || (!toggleon && items.weekend_gross === 'Not Available')) return;
              cntr++;
              return (
                <tr key={index}>
                  <td data-title='Week'>
                    {cntr + ' | '} {toggleon ? items.count : items.weekend_count}
                  </td>
                  <td data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Gross $'}>{toggleon ? items.weekly_gross : items.weekend_gross}</td>
                  <td data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Gross% +/-LW'} dangerouslySetInnerHTML={{ __html: toggleon ? items.weekly_gross_change : items.weekend_gross_change }}></td>
                  <td data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Locations #'}>{toggleon ? items.weekly_locations : items.weeked_locations}</td>
                  <td data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Locations +/-LW'} dangerouslySetInnerHTML={{ __html: toggleon ? items.weekly_locations_change : items.weeked_locations_change }}></td>
                  <td data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Locations Average'}>{toggleon ? items.weekly_locations_adv : items.weeked_locations_adv}</td>
                  <td data-title={(toggleon ? 'Weekly' : 'Weekend') + ' Gross to-date $'}>{toggleon ? items.weekly_todate : items.weeked_todate}</td>
                </tr>
              );
            })}
            {cntr === 0 && (
              <h5 className='text-center' style={{ marginTop: 10 }}>
                No Data Available
              </h5>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoxOfficeTable;
