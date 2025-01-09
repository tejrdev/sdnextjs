import { useState } from 'react';

const CustomSelect = ({ options, label, id, onSelect, value }) => {
  let SelectName = options.filter((item) => item.value.toLowerCase() == value);
  if (SelectName.length > 0) SelectName = SelectName[0].name;

  const [isOpen, setOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState(value);
  const [selectedName, setSelectedName] = useState(SelectName);

  const onTriggerClick = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  };

  const OnSelectChange = (e, val, name) => {
    e.preventDefault();
    setOpen(false);
    setSelectedVal(val);
    onSelect(val);
    setSelectedName(name);
  };
  return (
    <div className='filter_item'>
      <label className='greytxt'>{label}</label>
      <div className='select_filters'>
        <div className='custom-select-wrapper' id={id}>
          <div className={'custom-select ' + (isOpen ? ' opened' : '')}>
            <span className='custom-select-trigger' onClick={onTriggerClick}>
              {selectedName !== '' ? selectedName : selectedVal}
            </span>
            <div className='custom-options'>
              {options.map((item, index) => (
                <span className={'custom-option' + (selectedVal == item.value ? ' selection  ' : '')} data-value={item.value} onClick={(e) => OnSelectChange(e, item.value, item.name)} key={index}>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
