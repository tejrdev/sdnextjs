import { useEffect, useState } from 'react';

const MultiSelectFilter = ({ data, title, collapsible, setMultiSelectFilter, initiallyCheckedAll, checking }) => {
  const [Selected, setSelected] = useState([]);
  const [seeall, setSeeall] = useState('');
  const [seeallctatxt, setSeeallctatxt] = useState('See all');
  const seeHandler = () => {
    seeall === '' ? (setSeeall('extend'), setSeeallctatxt('See less')) : (setSeeall(''), setSeeallctatxt('See all'));
  };

  const [checkedState, setCheckedState] = useState(new Array(data.length).fill(initiallyCheckedAll ? true : false));
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    data.map((item, i) => checkedState[i] = false);
    Selected.length = 0;
  }, [checking])

  const setMultiSelect = (position, event) => {
    const selectedData = Selected;
    const filter = event.target.name;
    if (event.target.checked || checked) {
      selectedData.push(filter);
    } else {
      selectedData.splice(selectedData.indexOf(filter), 1);
    }
    setSelected(selectedData);
    const strSelectedVal = selectedData.toString();
    setMultiSelectFilter(strSelectedVal);

    let updatedCheckedState;
    if (checked) {
      setChecked(false);
      updatedCheckedState = new Array(data.length).fill(false);
      updatedCheckedState = updatedCheckedState.map((item, index) => (index === position ? true : false));
    } else {
      updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    }
    setCheckedState(updatedCheckedState);
  };

  const filterdata = data?.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <h5>{title}</h5>
      <ul className={'grid ' + (collapsible ? 'seeallbox ' + seeall : '')}>
        {filterdata.map((item, i) => {
          return (
            <li key={i} className='pointer'>
              <input type='checkbox' name={item.name} id={item.name} onChange={(event) => setMultiSelect(i, event)} checked={checkedState[i]} />
              <label htmlFor={item.name} className='pointer'>
                {item.value ? item.value : item.name}
              </label>
            </li>
          );
        })}
      </ul>
      {collapsible ? (
        <div className='seeallcta'>
          <h6 className='pointer m-0' onClick={seeHandler}>
            {seeallctatxt}
          </h6>
        </div>
      ) : null}
    </>
  );
};

export default MultiSelectFilter;
