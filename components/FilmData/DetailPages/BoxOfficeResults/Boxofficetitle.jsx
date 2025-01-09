import { useState, useEffect } from 'react';

const Boxofficetitle = ({ title, selectedYear, selectedWeek, onYearChange, OnWeekChange, fetchlastWeekNo, yearsData }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [scrollon, setScrollon] = useState(false);
  let runningyear = new Date().getFullYear();

  const getWeekNumber = (date) => {
    // Copy date so don't modify original
    date = new Date(date);
    // Set to nearest Thursday: current date + 4 - current day number
    // Sunday is 0, Monday is 1, and so on
    const currYear = date.getFullYear();

    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const newYear = date.getFullYear();
    //if date is from next year, set date to current date
    if (currYear < newYear && date.getMonth() < new Date().getMonth()) {
      date = new Date();
    }
    // Get first day of year
    var yearStart = new Date(date.getUTCFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);

    // Return week number
    return weekNumber;
  };
  const getCurrentWeekNo = (date) => {
    let weekNumber = getWeekNumber(date);
    if (date.getUTCDay() > 0 && date.getUTCDay() < 5) weekNumber--;
    return weekNumber;
  };
  const getAllWeekData = (year) => {
    const weeksData = [];
    const firstDayOfMonth = new Date(year, 0, 1); // Create a date object for the first day of the month
    let startDate = new Date(firstDayOfMonth); // Start with the first day of the month

    // Move startDate to the first Friday of the month
    while (startDate.getDay() !== 5) {
      // Friday is represented by 5 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      startDate.setDate(startDate.getDate() + 1);
    }

    const weeksInYear = (year) => {
      var month = 11,
        day = 31,
        week;

      // Find week that 31 Dec is in. If is first week, reduce date until
      // get previous week.
      do {
        const d = new Date(year, month, day--);
        week = getWeekNumber(d);
        if (d.getDay() === 4) week--; // minus last week if last day of year is thursday
      } while (week == 1);

      return week;
    };

    let weekNumber = 1; // Initialize week number

    const addWeeks = () => {
      let endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); //get end date
      let startMonth = startDate.getMonth();
      let endMonth = endDate.getMonth();
      let formattedDate = months[startMonth] + ' ' + startDate.getDate() + ' - ' + months[endMonth] + ' ' + endDate.getDate() + ' (Week ' + weekNumber + ')'; // Format the date

      // Add the first week data to the array
      weeksData.push({
        week: weekNumber,
        'begin_week': formattedDate,
      });

      // Move to the next Friday
      startDate.setDate(startDate.getDate() + 7);
    };
    const lastweekno = year === runningyear ? getCurrentWeekNo(new Date()) : weeksInYear(year);
    fetchlastWeekNo(lastweekno);
    addWeeks();

    // Loop through each subsequent week of the year
    while (weekNumber < lastweekno) {
      weekNumber++;
      addWeeks();
    }
    // if (year === runningyear)
    weeksData.reverse();
    return weeksData ? weeksData : null;
  };

  const [currentweeks, setCurrentweeks] = useState(getAllWeekData(selectedYear));
  const [weekselect, setWeekselect] = useState(selectedWeek);

  useEffect(() => {
    setCurrentweeks(getAllWeekData(selectedYear));
  }, [selectedYear]);

  useEffect(() => {
    weekselect && OnWeekChange(selectedYear, weekselect);
  }, [weekselect]);

  const infoweekhandler = (e) => {
    if (e.target.value === '0') return;
    setWeekselect(parseInt(e.target.value));
  };

  useEffect(() => {
    const handleScroll = () => {
      const rect = document.querySelector('.box_title').getBoundingClientRect();
      const isSectionScrolled = rect.top <= 0;
      setScrollon(isSectionScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={scrollon ? 'box_title secspace sticky top-0 bg-white z-10 px-3 md:px-4' : 'box_title secspace'}>
      <div className='container'>
        <div className='boxtitlein'>
          <h1 className='block lg:inline-block align-top pvr pr-0 md:pr-11 pt-3 pb-4 transition-all duration-300 ease-out text-center'>{title}</h1>
          <div className='boxresultchoice inline-block align-top w-full lg:w-auto'>
            <div className='bxr_selectinfo xsm:flex lg:block flex-wrap justify-center'>
              <div className='bxrselectbox mb-3 xsm:mr-4 yearselecing xsm:inline-block align-top'>
                <label htmlFor=''>Year</label>
                <select
                  name=''
                  id=''
                  className='globalselect'
                  value={selectedYear}
                  onChange={(e) => {
                    onYearChange(parseInt(e.target.value));
                  }}>
                  {yearsData.map((item, i) => (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='bxrselectbox mb-3 xsm:mr-4 weekselecing xsm:inline-block align-top'>
                <label htmlFor=''>Week</label>
                <select name='' id='' className='globalselect' value={selectedWeek} onChange={infoweekhandler}>
                  <option value={0}>{'Select Week'}</option>
                  {currentweeks.map((item, i) => (
                    <option value={item.week} key={i}>
                      {item.begin_week}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxofficetitle;
