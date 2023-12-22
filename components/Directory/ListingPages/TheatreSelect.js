import $ from 'jquery';
import { useState, useEffect } from 'react';

function TheatreSelect({ custom_options, setcurrentTheatre, }) {
  const [customSelectVal, setCustomSelectVal] = useState('All Exhibitors');  
  const [isOpen, setOpen] = useState(false);
  const [srchInputselect, setSrchInputselect] = useState(custom_options);
    

    const onSelectChange = (e) => {
        setCustomSelectVal(e.target.innerHTML);
        setcurrentTheatre (e.target.getAttribute('data-value'));
        setOpen(false);
        setSrchInputselect(custom_options);
        document.querySelector('.inputsrch input').value="";
    };

    const inputhandler = (e) => {      
      //let srcharry = custom_options.map(item=>item.title);
      //let selectsrch = custom_options.filter(info =>info.includes(srchinout.title));
      //let selectsrch = srcharry.filter(info =>info.toLowerCase().includes(srchinout));
      
      let srchinout = e.target.value;
      let selectsrch = custom_options.filter(item=> item.title.toLowerCase().includes(srchinout));
      setSrchInputselect(selectsrch);
      setOpen(false);
    }
  useEffect(() => {
    $('.custom-select-trigger').off('click').on('click', function (event) {
        // $('html').one('click', function () {
        //   $('.custom-select').removeClass('opened');
        // });
        $(this).parents('.custom-select').toggleClass('opened');
        event.stopPropagation();
      });

    $('.custom-option:first-of-type').hover(
      function () {
        $(this).parents('.custom-options').addClass('option-hover');
      },
      function () {
        $(this).parents('.custom-options').removeClass('option-hover');
      }
    );
    $('.dist_filter .custom-option').on('click', function () {
      $(this).parents('.custom-select-wrapper').find('select').val($(this).data('value'));
      $(this).parents('.custom-options').find('.custom-option').removeClass('selection');
      $(this).addClass('selection');
      $(this).parents('.custom-select').removeClass('opened');
      $(this).parents('.custom-select').find('.custom-select-trigger').text($(this).text());   
      $('#search_blog_header #id_top_search_posttype').val($(this).data('value'));   
      //onChange($(this).data('value'));
    });
    

  }, []);
  const onTriggerClick = (e) => {
    e.stopPropagation();
    setOpen(!isOpen);
  };
  let triggerClasse = 'custom-select';
  if (isOpen) triggerClasse += ' opened';

  return (
    <div className={triggerClasse} id="custom-top_search_header_drop">
      <span className="custom-select-trigger" onClick={(e) => onTriggerClick(e)}>
        {customSelectVal}
      </span>
      <div className="custom-options">
        <div className="pvr inputsrch">
          <input type="text" name="" id="" onChange={e=>inputhandler(e)}/>
          <i className="far fa-search"></i>
        </div>
        
        {srchInputselect.map((item, id) => {
          return (
            <span key={id} className="custom-option" data-value={item.value ? item.value : item.id}
                 onClick={onSelectChange}>
              {item.name ? item.name : item.title}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default TheatreSelect;
