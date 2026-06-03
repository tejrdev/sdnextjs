import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import playicoimg from '../../public/images/playicov2.png';
import 'glightbox/dist/css/glightbox.css';

const $ = require('jquery');

const Draggallery = ({ data, gallery, dragupdate, updateGallery }) => {
  const [boxes, setBoxes] = useState(data);
  const [boxesvid, setBoxesvid] = useState(data);
  const imageLightboxRef = useRef(null);
  const videoLightboxRef = useRef(null);

  useEffect(() => {
    if (updateGallery) {
      const bx = data;
      setBoxes(bx);
    }
  }, [updateGallery]);

  // Initialize gLightbox for images
  useEffect(() => {
    if (typeof window === 'undefined' || gallery !== 'imagegallery') return;

    const initImageLightbox = () => {
      import('glightbox').then((GLightboxModule) => {
        const GLightbox = GLightboxModule.default;

        if (imageLightboxRef.current) {
          imageLightboxRef.current.destroy();
        }

        imageLightboxRef.current = GLightbox({
          selector: '.glightbox-image',
          touchNavigation: true,
          keyboardNavigation: true,
          closeButton: true,
          loop: false,
        });
      });
    };

    const timer = setTimeout(() => {
      initImageLightbox();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (imageLightboxRef.current) {
        imageLightboxRef.current.destroy();
        imageLightboxRef.current = null;
      }
    };
  }, [boxes, gallery]);

  // Initialize gLightbox for videos
  useEffect(() => {
    if (typeof window === 'undefined' || gallery !== 'videogallery') return;

    const initVideoLightbox = () => {
      import('glightbox').then((GLightboxModule) => {
        const GLightbox = GLightboxModule.default;

        if (videoLightboxRef.current) {
          videoLightboxRef.current.destroy();
        }

        videoLightboxRef.current = GLightbox({
          selector: '.glightbox-video',
          autoplayVideos: true,
          openEffect: 'fade',
          closeEffect: 'fade',
          touchNavigation: true,
          keyboardNavigation: true,
        });
      });
    };

    const timer = setTimeout(() => {
      initVideoLightbox();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (videoLightboxRef.current) {
        videoLightboxRef.current.destroy();
        videoLightboxRef.current = null;
      }
    };
  }, [boxesvid, gallery]);

  const swapBoxes = (fromBox, toBox, boxes, setBoxes) => {
    const bx = [...boxes];
    const fromIndex = bx.findIndex((box) => box.id === fromBox.id);
    const toIndex = bx.findIndex((box) => box.id === toBox.id);
    //console.log(bx[fromIndex] , bx[toIndex])
    if (fromIndex !== -1 && toIndex !== -1) {
      [bx[toIndex], bx[fromIndex]] = [bx[fromIndex], bx[toIndex]];
      setBoxes(bx);
      dragupdate(bx);
    }
  };

  const handleDrop = (data, boxes, setBoxes) => (event) => {
    event.preventDefault();
    let fromBox = JSON.parse(event.dataTransfer.getData('dragContent'));
    let toBox = { id: data.id };
    //console.log(fromBox, toBox, data, boxes, setBoxes);
    swapBoxes(fromBox, toBox, boxes, setBoxes);
    return false;
  };

  const handleDragStart = (data) => (event) => {
    let fromBox = JSON.stringify({ id: data.id });
    event.dataTransfer.setData('dragContent', fromBox);
  };

  const handleDragOver = () => (event) => {
    event.preventDefault();
    return false;
  };

  const RemoveImageFromGallery = (e) => {
    // e.target.closest('.admingalitem').classList.toggle('delete');
    const bx = [...boxes];
    const index = $(e.target.closest('.admingalitem')).index();
    const imageId = bx[index].id;
    bx.splice(index, 1);
    setBoxes(bx);
    dragupdate(bx, imageId);
    $('.warningtxt').removeClass('hide');
  };
  // const handleOnChange = (index, e) => {
  //   const value = e.target.value;
  //   const bx = [...boxes];
  //   bx[index].caption = value;
  //   setBoxes(bx);
  //   dragupdate(bx);
  // };

  const onEditImgCaption = (e) => {
    document.querySelector('.admingal_itemtitle.active')?.classList.remove('active');
    const target = e.target;
    target.classList.add('hide');
    target.nextSibling?.classList.remove('hide');
    const el = target.closest('.admingalitem_inner');
    const childEl = el.querySelector('.admingal_itemtitle');
    childEl?.classList.add('active');
    el.querySelector('.admingal_itemtitle textarea').removeAttribute('disabled');
  };

  const onSaveImgCaption = (index, e) => {
    document.querySelector('.admingal_itemtitle.active')?.classList.remove('active');
    const target = e.target;
    target.classList.add('hide');
    target.previousSibling?.classList.remove('hide');

    const el = target.closest('.admingalitem_inner');
    const value = el.querySelector('.admingal_itemtitle textarea').value;
    el.querySelector('.admingal_itemtitle textarea').setAttribute('disabled', 'disabled');
    const bx = [...boxes];
    bx[index].caption = value;
    setBoxes(bx);
    dragupdate(bx);
  };

  return (
    <div className={'admingalbox grid gap16 dragbox ' + gallery}>
      {gallery === 'imagegallery' &&
        boxes.map((item, index) => (
          <div className='admingalitem' draggable='true' data-id={index} key={item.id} onDragStart={handleDragStart({ id: item.id })} onDragOver={handleDragOver({ id: item.id })} onDrop={handleDrop({ id: item.id }, boxes, setBoxes)}>
            <div className='admingalitem_inner' data-index={index}>
              <figure className='pvr'>{item.url && <Image src={item.url} width='288' height='293' alt='' className='objctimg_box' />}</figure>
              <h5 className='admingal_itemtitle'>
                <textarea defaultValue={item.caption} disabled />
                {/* onChange={(e) => handleOnChange(index, e)}  */}
              </h5>
              <div className='df fww just-center admingalcta'>
                <a href={item.url} className='glightbox-image admingalimg' data-title={item.caption || ''}>
                  View <i className='fas fa-expand-arrows-alt'></i>
                </a>
                <span className='editgalitemcap' onClick={onEditImgCaption}>
                  Edit <i className='fas fa-pen'></i>
                </span>
                <span className='savetitle hide' onClick={(e) => onSaveImgCaption(index, e)}>
                  save <i className='fas fa-save'></i>
                </span>
                <span className='redtxt' onClick={RemoveImageFromGallery}>
                  Remove <i className='fas fa-trash'></i>
                </span>
              </div>
            </div>
          </div>
        ))}

      {gallery === 'videogallery' &&
        boxesvid.map((item, index) => (
          <div className='admingalitem' draggable='true' data-id={index} key={item.id} onDragStart={handleDragStart({ id: item.id })} onDragOver={handleDragOver({ id: item.id })} onDrop={handleDrop({ id: item.id }, boxesvid, setBoxesvid)}>
            <div className='admingalitem_inner' data-index={index}>
              <figure className='pvr'>
                <a href={item.vidurl} className='glightbox-video popvid'>
                  <Image src={item.vidimage} width='288' height='293' alt='' className='objctimg_box' />
                  <Image className='playico' src={playicoimg} width='25' alt='play icon' />
                </a>
              </figure>
              <h5 className='admingal_itemtitle'>
                <textarea defaultValue={item.title} />
              </h5>
              <div className='df fww just-between admingalcta'>
                <a href={item.vidurl} className='glightbox-video popvid'>
                  View <i className='fas fa-expand-arrows-alt'></i>
                </a>
                <span className='editgalitemcap'>
                  Edit <i className='fas fa-pen'></i>
                </span>
                <span className='savetitle hide'>
                  save <i className='fas fa-save'></i>
                </span>
                <span className='redtxt'>
                  Remove <i className='fas fa-trash'></i>
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Draggallery;
