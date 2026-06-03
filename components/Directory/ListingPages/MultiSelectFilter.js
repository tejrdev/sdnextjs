import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa6';

const MultiSelectFilter = ({ data, title, collapsible, setMultiSelectFilter, initiallyCheckedAll, checking, tag = '' }) => {
  const router = useRouter();
  const [Selected, setSelected] = useState([]);
  const [seeall, setSeeall] = useState('');
  const [seeallctatxt, setSeeallctatxt] = useState('See all');
  const seeHandler = () => {
    seeall === '' ? (setSeeall('extend'), setSeeallctatxt('See less')) : (setSeeall(''), setSeeallctatxt('See all'));
  };

  const [checkedState, setCheckedState] = useState(new Array(data.length).fill(initiallyCheckedAll ? true : false));
  const [checked, setChecked] = useState(true);
  const [show, setShow] = useState(new Array(data.length).fill(false).fill(true, 0, 1));

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let categories = params.get('category') || '';
    const arrCategories = categories.split(',');
    if (arrCategories.length > 0 && categories !== '') {
      if (tag === 'vendor') {
        let updatedShowState = show;
        updatedShowState = updatedShowState.map((checkbox, index) => false);
        setSelected(arrCategories);
        arrCategories.map((item) => {
          const arrCategory = item.split('_');
          let parent = arrCategory[0];
          parent = String(parent).charAt(0).toUpperCase() + String(parent).slice(1);
          const child = arrCategory[1];
          document.querySelectorAll('.dist_filterbox input[parent="' + parent + '"][name="' + child + '"]').forEach((item) => {
            item.checked = true;
            const vandcatsElement = item.closest('.vandcats');
            const pos = Array.from(vandcatsElement.parentElement.children).indexOf(vandcatsElement);
            updatedShowState = updatedShowState.map((checkbox, index) => (index === pos ? true : checkbox));
          });
        });
        setShow(updatedShowState);
      } else {
        let updatedShowState = checkedState;
        setChecked(false);
        setSelected(arrCategories);
        arrCategories.map((item) => {
          document.querySelectorAll('.dist_filterbox input[name="' + item + '"]').forEach((item) => {
            item.checked = true;
            const li = item.closest('li');
            const pos = Array.from(li.parentNode.children).indexOf(li);
            updatedShowState = updatedShowState.map((checkbox, index) => (index === pos ? true : checkbox));
          });
        });
        setCheckedState(updatedShowState);
      }
    } else {
      document.querySelectorAll('.dist_filterbox ul li input').forEach((item) => {
        item.checked = false;
      });
    }
  }, []);

  useEffect(() => {
    data.map((item, i) => (checkedState[i] = false));
    Selected.length = 0;
  }, [checking]);

  const ShowHideFilter = (i) => {
    const updatedShowState = show.map((item, index) => (index === i ? !item : item));
    setShow(updatedShowState);
  };
  const setMultiSelect = (position, event) => {
    const selectedData = Selected;
    const filter = event.target.name;
    if (event.target.checked) {
      //|| checked
      selectedData.push(filter);
    } else {
      selectedData.splice(selectedData.indexOf(filter), 1);
    }
    setSelected(selectedData);
    const strSelectedVal = selectedData.toString();
    setMultiSelectFilter(strSelectedVal);

    let updatedCheckedState;
    if (checked) {
      //for select all
      setChecked(false);
      updatedCheckedState = new Array(data.length).fill(false);
      updatedCheckedState = updatedCheckedState.map((item, index) => (index === position ? true : false));
    } else {
      updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    }
    setCheckedState(updatedCheckedState);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    let pageno = params.get('pageno');
    if (event.isTrusted) pageno = 1;
    let searchQuery = '';
    if (strSelectedVal !== '') searchQuery = { ...router.query, 'category': strSelectedVal, pageno };
    router.replace({ query: searchQuery }, undefined, { scroll: false, shallow: true });
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

  const setVendorFilter = (e, val) => {
    const parent = e.target.getAttribute('parent').toLowerCase();
    const selectedData = Selected;
    const filter = parent + '_' + val;
    if (e.target.checked) {
      selectedData.push(filter);
    } else {
      selectedData.length && selectedData.splice(selectedData.indexOf(filter), 1);
    }
    setSelected(selectedData);
    const strSelectedVal = selectedData.toString();
    setMultiSelectFilter(strSelectedVal);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    let pageno = params.get('pageno');
    if (event.isTrusted) pageno = 1;
    let searchQuery = '';
    if (strSelectedVal !== '') searchQuery = { ...router.query, 'category': strSelectedVal, pageno };
    router.replace({ query: searchQuery }, undefined, { scroll: false, shallow: true });
  };
  return (
    <>
      {tag === 'vendor' ? (
        data?.map((categories, i) => (
          <div className={`vandcats `} key={i}>
            <h6 onClick={() => ShowHideFilter(i)} className='pointer'>
              <span className='inline-block mr-2 mb-[-2px]'>{show[i] === true ? <FaAngleDown /> : <FaAngleRight />}</span>
              {categories?.title}
            </h6>
            <div className={`grid overflow-hidden transition-all duration-700 ${show[i] === true ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              {/* <div className={`grid overflow-hidden transition-[grid-template-rows] duration-1000 ${i + 1 === show ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} `}> */}
              <ul className='overflow-hidden'>
                {categories?.catnames?.map((item, j) => {
                  return (
                    <li key={j} className='pointer'>
                      <input type='checkbox' name={item.name} id={item.name + i} parent={categories.title} onChange={(e) => setVendorFilter(e, item.name)} />
                      <label htmlFor={item.name + i} className='pointer'>
                        {item.value}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))
      ) : (
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
      )}
    </>
  );
};

export default MultiSelectFilter;
