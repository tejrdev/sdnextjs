import { useState, useEffect } from 'react';
import CustomSelect from './TheatreSelect';
import { useRouter } from 'next/router';

let fliter = '';

const Filters = ({ setDistributerFilter, data, tag, custom_options, setFilter_theatre }) => {
  const router = useRouter();
  let filter_options;
  if (tag === 'exhibitor' || tag === 'theatre') {
    filter_options = Object.values(data).map((value, id) => ({
      id,
      value,
    }));
  } else {
    if (tag === 'filmfestival') {
      filter_options = data;
    } else {
      filter_options = Object.entries(data).map(([value], id) => ({
        id,
        value,
      }));
    }
  }
  const [checkedState, setCheckedState] = useState(new Array(filter_options.length).fill(true));
  const [checked, setChecked] = useState(true);

  const setcurrentTheatre = (currentTheatre) => {
    setFilter_theatre(currentTheatre);
  };

  const handleOnChange = (position) => {
    let selectedVal = [];
    let updatedCheckedState;
    if (checked) {
      setChecked(false);
      setCheckedState(new Array(filter_options.length).fill(false));
      updatedCheckedState = new Array(filter_options.length).fill(false);
      updatedCheckedState = updatedCheckedState.map((item, index) => (index === position ? !item : false));
    } else {
      updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : false));
    }

    setCheckedState(updatedCheckedState);
    localStorage.checkedStates = JSON.stringify(updatedCheckedState);

    filter_options.map((item, index) => {
      if (updatedCheckedState[index]) {
        selectedVal.push(item.value || item.name);
        return selectedVal;
      }
    });

    if (selectedVal.length === filter_options.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    const strSelectedVal = selectedVal.toString();
    setDistributerFilter(strSelectedVal);
    router.replace(
      {
        query: { ...router.query, state: strSelectedVal },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
    fliter = '';
  };

  const handleOnAllChange = () => {
    setChecked(!checked);
    setCheckedState(new Array(filter_options.length).fill(!checked));
    setDistributerFilter('');
    router.replace(
      {
        query: { ...router.query, state: 'ALL' },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  if (fliter !== '') {
    setChecked(false);
    const filteredCheckedState = filter_options.map((item) => (item.value || item.name === fliter ? true : false));
    setCheckedState(filteredCheckedState);
    setDistributerFilter(fliter);
    fliter = '';
  }
  let dist_classes = tag === 'exhibitor' || tag === 'theatre' ? 'dist_filterbox statprofilter' : 'dist_filterbox';

  useEffect(() => {
    $('.dist_filter .stateclick li').click(function () {
      $(this).parents('.dist_filterbox ').find('.allselectbtn').removeClass('active');
    });
    $('.dist_filter .dist_filterbox .allselectbtn').click(function () {
      $(this).toggleClass('active');
    });

    if (tag === 'exhibitor' || tag === 'theatre') {
      if (localStorage.getItem('checkedStates') !== null) {
        var checkedStates = JSON.parse(localStorage.checkedStates);
        setCheckedState(checkedStates);
        var selectedVal = [];
        filter_options.map((item, index) => {
          if (checkedStates[index]) {
            selectedVal.push(item.value || item.name);
            return selectedVal;
          }
        });

        if (selectedVal.length === filter_options.length) {
          setChecked(true);
        } else {
          setChecked(false);
        }
        const strSelectedVal = selectedVal.toString();
        setDistributerFilter(strSelectedVal);
      }

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const state = params.get('state');
      if (state !== '') $('#exibutor_status li span[value="' + state + '"]').click();
    }
  }, []);

  return (
    <div className='dist_filter'>
      <div className='filter_box'>
        {(tag === 'distributor' || tag === 'vendor' || tag === 'filmfestival') && (
          <div className={dist_classes} id={tag === 'distributor' ? 'distributor_filter' : ''}>
            {tag === 'distributor' ? <h3>Filters</h3> : <h4>State/Province</h4>}

            <ul>
              <li className='allselected'>
                <input type='checkbox' id='distributor_allselect' name='distributor_allselect' value='' checked={checked} onChange={() => handleOnAllChange()} />
                <label htmlFor='distributor_allselect'>select all</label>
              </li>
            </ul>
            <ul id={tag === 'exhibitor' || tag === 'theatre' ? 'exibutor_status' : ''}>
              {filter_options.map((item, index) => {
                return (
                  <li key={index}>
                    <input type='checkbox' id={item.value ? item.value : item.name} name='cat_names' value={item.value ? item.value : item.name} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                    <label htmlFor={item.value ? item.value : item.name}>{item.value ? item.value : item.name}</label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {(tag === 'exhibitor' || tag === 'theatre') && (
          <div className={dist_classes + ' stateboxtype'} id={tag === 'distributor' ? 'distributor_filter' : ''}>
            <button className='allselectbtn btn active' id='distributor_allselect' name='distributor_allselect' value='' checked={checked} onClick={() => handleOnAllChange()}>
              Select all
            </button>
            <h5>U.S. States</h5>
            <ul id={tag === 'exhibitor' || tag === 'theatre' ? 'exibutor_status' : ''} className='stateclick grid'>
              {filter_options.map((item, index) => {
                if (index < 51) {
                  return (
                    <li key={index} className={index}>
                      <span id={item.value ? item.value : item.name} name='cat_names' value={item.value ? item.value : item.name} checked={checkedState[index]} className={checkedState[index] ? 'active' : ''} onClick={() => handleOnChange(index)}>
                        {item.value ? item.value : item.name}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
            <h5>Canadian Provinces</h5>
            <ul id={tag === 'exhibitor' || tag === 'theatre' ? 'exibutor_status' : ''} className='stateclick grid'>
              {filter_options.map((item, index) => {
                if (index >= 51) {
                  return (
                    <li key={index}>
                      <span id={item.value ? item.value : item.name} name='cat_names' value={item.value ? item.value : item.name} checked={checkedState[index]} className={checkedState[index] ? 'active' : ''} onClick={() => handleOnChange(index)}>
                        {item.value ? item.value : item.name}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>

            {/*<h5>Canadian Provinces</h5>
          <ul id={tag === 'exhibitor' || tag === 'theatre' ? 'exibutor_status' : ''} className="stateclick grid">
            {filter_options.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item.value ? item.value : item.name}</span>
                </li>
              );
            })}
          </ul>
        */}
          </div>
        )}

        {tag === 'theatre' ? (
          <div className='select_filters'>
            <div className='custom-select-wrapper'>
              <CustomSelect custom_options={custom_options} setcurrentTheatre={setcurrentTheatre} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Filters;
