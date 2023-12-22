import $ from 'jquery';
import { useRef, useState, useEffect } from 'react';

function CustomSelect({ custom_options, onChange, Default_val = '' }) {
  const [customSelectVal, setCustomSelectVal] = useState(Default_val);
  const [isOpen, setOpen] = useState(false);
  const divRef = useRef(null);


  //   $('.custom-select-trigger')
  //     .off('click')
  //     .on('click', function (event) {
  //       // $('html').one('click', function () {
  //       //   $('.custom-select').removeClass('opened');
  //       // });
  //       $(this).parents('.custom-select').toggleClass('opened');
  //       event.stopPropagation();
  //     });
  //   const onSelectChange = (e) => {
  //     setCustomSelectVal(e.target.value);
  //     setOpen(false);
  //   };
  useEffect(() => {
    $('.custom-option:first-of-type').hover(
      function () {
        $(this).parents('.custom-options').addClass('option-hover');
      },
      function () {
        $(this).parents('.custom-options').removeClass('option-hover');
      }
    );
    $('.custom-option').on('click', function () {
      $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
      $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
      $(this).addClass('selection');
      $(this).parents('.custom-select').removeClass('opened');
      $(this).parents('.custom-select').find('.custom-select-trigger').text($(this).text());
      $('#search_blog_header #id_top_search_posttype').val($(this).data('value'));
     // onChange($(this).data('value'));
    });
     
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
    e.stopPropagation();
    setOpen(!isOpen);
  };
  let triggerClasse = 'custom-select';
  if (isOpen) triggerClasse += ' opened';

  return (
    <div ref={divRef} className={triggerClasse} id="custom-top_search_header_drop">
      <span className="custom-select-trigger" onClick={(e) => onTriggerClick(e)}>
        {customSelectVal}
      </span>
      <div className="custom-options">
        {custom_options.map((item, id) => {
          return (
            <span
              key={id}
              className="custom-option"
              data-value={item.value ? item.value : item.id}
              //   onClick={onSelectChange}
            >
              {item.name ? item.name : item.title}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CustomSelect;
