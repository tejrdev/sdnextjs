import { useRouter } from 'next/router';
import { useState } from 'react';
import { JSONData } from '@/components/shared/JSONData';

const { USStates, CANStates, FilterStates } = JSONData;

const StateFilter = ({ setStateFilter, stateValue, tag }) => {
  const router = useRouter();
  const [selAllUSStates, setselAllUSStates] = useState(stateValue !== '' ? (stateValue === 'USA' ? true : false) : true);
  const [selAllCANStates, setselAllCANStates] = useState(stateValue !== '' ? (stateValue === 'CAN' ? true : false) : true);

  // useEffect(() => {
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   let state = params.get('state') || '';
  //   setselAllUSStates(state !== '' ? (state === 'USA' ? true : false) : true);
  //   setselAllCANStates(state !== '' ? (state === 'CAN' ? true : false) : true);
  // }, []);

  const SetStates = (event) => {
    let state = event.target.id;
    if (stateValue === state) {
      state = '';
    }

    let country = '';
    if (event.target.getAttribute('iscountry') === 'true') {
      let AllUSSelected = selAllUSStates;
      let AllCANSelected = selAllCANStates;
      if (state === 'USA') {
        state = selAllUSStates ? (selAllCANStates ? CANStates.toString() : '') : selAllCANStates ? '' : USStates.toString();
        country = selAllUSStates ? (selAllCANStates ? 'CAN' : '') : selAllCANStates ? '' : 'USA';
        setselAllUSStates(!selAllUSStates);
        AllUSSelected = !selAllUSStates;
      } else {
        state = selAllCANStates ? (selAllUSStates ? USStates.toString() : '') : selAllUSStates ? '' : CANStates.toString();
        country = selAllCANStates ? (selAllUSStates ? 'USA' : '') : selAllUSStates ? '' : 'CAN';
        setselAllCANStates(!selAllCANStates);
        AllCANSelected = !selAllCANStates;
      }
      if (!AllUSSelected && !AllCANSelected) {
        setselAllUSStates(true);
        setselAllCANStates(true);
      }
    } else {
      setselAllUSStates(false);
      setselAllCANStates(false);
    }
    setStateFilter(state);
    if (country === '' && state === '') {
      router.push(`/directory/${tag === 'theatre' ? 'theatres' : 'exhibitors'}`);
    } else {
      const statename =  country !== '' ? country : FilterStates.find((item) => item.key === state)?.value;
      router.push(`/directory/${tag === 'theatre' ? 'theatres' : 'exhibitors'}/${statename}`);
    }
    // const search = window.location.search;
    // const params = new URLSearchParams(search);
    // let pageno = params.get('pageno');
    // const sortby = params.get('sortby') || 'name';
    // if (event.isTrusted) pageno = 1;
    // let searchQuery = '';
    // if (country !== '') state = country;
    // if (state !== '') searchQuery = { ...router.query, state, sortby, pageno };
    // router.replace({ query: searchQuery }, undefined, { scroll: false, shallow: true });
  };

  const StateDiv = ({ country, label, StateArray, AllSelected }) => {
    return (
      <>
        <h6 className='df fww just-between'>
          {label}
          <button onClick={SetStates} id={country} iscountry='true' className={'btn h6 ' + (AllSelected ? '!bg-white' : '')}>
            {AllSelected ? 'Clear All' : 'Select All'}
          </button>
        </h6>
        <ul className='stateclick grid'>
          {StateArray.map((item, index) => {
            const checked = stateValue === item; //
            return (
              <li key={index}>
                <span id={item} name='cat_names' value={item} checked={AllSelected ? true : checked ? true : false} className={AllSelected ? 'active' : checked ? 'active' : ''} onClick={SetStates}>
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <div className='dist_filterbox statprofilter stateboxtype'>
      <h5>Location</h5>
      <StateDiv country='USA' label='U.S. States' StateArray={USStates} AllSelected={selAllUSStates} />
      <StateDiv country='CAN' label='Canadian Provinces' StateArray={CANStates} AllSelected={selAllCANStates} />
    </div>
  );
};

export default StateFilter;
