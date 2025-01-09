import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DateSelect = ({ data, newsletter, onNewsletterDateChange }) => {
  const [newsletterDate, setNewsletterDate] = useState(newsletter);
  const [openDates, setOpenDates] = useState(false);

  useEffect(() => {
    const selectedDate = data.filter((item) => item.id == newsletter);
    //console.log(data , selectedDate ,newsletter );
    if (selectedDate.length) {
      setNewsletterDate(selectedDate.dates);
    //console.log(11);
    } else {
    //console.log(data[0]);
      setNewsletterDate(data[0].dates);
    }
  }, []);
  const changeSelectedDate = (e) => {
    if (e.target.value) {
      onNewsletterDateChange(e.target.value);
      setTimeout(()=> {
        setNewsletterDate(e.target.attributes['date'].value);
      }, 1000)
    }
    setOpenDates(false);
    // console.log(newsletterDate , e.target.attributes['date'].value )
  };
  const showDates = () => setOpenDates(!openDates);

  const DateClass = openDates ? 'ms-drop bottom active' : 'ms-drop bottom';
  return (
    <div
      className="ms-parent custombox_select"
      title=""
      style={{ width: '100%' }}
    >

      <button type="button" className="ms-choice" onClick={showDates}>
        <span className="">{newsletterDate}</span>
        <div className="icon-caret"></div>
      </button>
      <div className={DateClass}>
        <div className="ms-search">
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="Search Newsletter date"
          />
        </div>
        <ul>
          {data.map((item, index) => {
            const key = 'option_' + index;
            let classes =
              item.id === parseInt(newsletter)
                ? 'hide-radio selected'
                : 'hide-radio';
            if (newsletter === '' && index === 0)
              classes = 'hide-radio selected';
            return (
              <li
                className={classes}
                key={index}
                value={item.id}
                date={item.dates}
                onClick={changeSelectedDate}
              >
                <label className="">
                  <input
                    type="radio"
                    value={item.id}
                    data-key={key}
                    date={item.dates}
                    data-name="selectItem"
                    checked={item.id === newsletterDate ? 'checked' : ''}
                    onChange={changeSelectedDate}
                  />
                  <span>{item.dates}</span>
                </label>
              </li>
            );
          })}
          {/* <li className="ms-no-results">No matches found</li> */}
        </ul>
      </div>
    </div>
  );
};

DateSelect.propTypes = {
  onNewsletterDateChange: PropTypes.func,
};

export default DateSelect;
