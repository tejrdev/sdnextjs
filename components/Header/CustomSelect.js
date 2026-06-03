import $ from 'jquery';
import { useRef, useState, useEffect } from 'react';

function CustomSelect({ custom_options, value, onSelect }) {
  const [isOpen, setOpen] = useState(false);
  const divRef = useRef(null);

  const onSelectChange = (e) => {
    setOpen(false);
    onSelect(e.target.innerHTML);
  };
  useEffect(() => {
    $('.custom-option:first-of-type').hover(
      function () {
        $(this).parents('.custom-options').addClass('option-hover');
      },
      function () {
        $(this).parents('.custom-options').removeClass('option-hover');
      }
    );

    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const onTriggerClick = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  };

  return (
    <div ref={divRef} className={'custom-select' + (isOpen ? ' opened' : '')} id='custom-top_search_header_drop'>
      <span className='custom-select-trigger dark:text-slate-50' onClick={onTriggerClick}>
        {value}
      </span>
      <div className='custom-options'>
        {custom_options.map((item, id) => {
          const itemName = item.name ? item.name : item.title;
          return (
            <span key={id} className={'custom-option dark:text-slate-50 dark:bg-slate-800' + (itemName === value ? ' selection' : '')} data-value={item.value ? item.value : item.id} onClick={onSelectChange}>
              {itemName}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CustomSelect;
