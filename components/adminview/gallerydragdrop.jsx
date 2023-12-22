import { useState, useEffect } from 'react';
import Image from 'next/image';
import FOURAB from '../../public/images/fourabtsld.jpg';
import playicoimg from "../../public/images/playicov2.png";



const Draggallery = ({ data, gallery }) => {
   const [boxes, setBoxes] = useState(data);
   const [boxesvid, setBoxesvid] = useState(data);
   //console.log(boxesvid)
   useEffect(() => {
      const $ = window.jQuery;

      $('.admingalimg').magnificPopup({
         //delegate: '.slides:not(.slick-cloned) a.media_gallerybox',
         type: 'image',
         closeMarkup:
            '<button title="closing" type="button" class="mfp-close">×</button>',
         closeOnContentClick: true,
         closeBtnInside: true,
         titleSrc: 'title',
         tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
         mainClass: 'mfp-no-margins mfp-with-zoom photodtlgallery',
         image: {
            markup:
               '<div class="mfp-figure">' +
               '' +
               '<div class="mfp-close">×</div>' +
               '<div class="mfp-img"></div>' +
               '<div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div>' +
               '' +
               '</div>' +
               '</div>',
            verticalFit: true,
            titleSrc: function (item) {
               //return item.el.parent('.photogalitem_box').find('.photocaption_txt').html();
               return item.el
                  .parent('.photogalitem_box')
                  .find('.photocaption_txt')
                  .html();
            },
         },
         gallery: {
            enabled: true,
         },
         zoom: {
            enabled: false,
            duration: 300,
         },
      });

      $(".popvid , .popvidbox").magnificPopup({
         type: "iframe",
         mainClass: "mfp-fade",
         removalDelay: 160,
         preloader: false,
         fixedContentPos: false,
         iframe: {
            markup:
               '<div class="mfp-iframe-scaler">' +
               '<div class="mfp-close"></div>' +
               '<div class="mgpiframwrap">' +
               '<iframe class="mfp-iframe" id="videoiframe" frameborder="0" allow="autoplay; fullscreen" ></iframe>' +
               //'<div class="mfp-title">Some caption</div></div>'+
               "</div>",

            patterns: {
               youtube: {
                  index: "youtube.com/",
                  id: "v=",
                  //src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1&mute=1',
                  //src: "//www.youtube.com/embed/%id%?rel=0&autoplay=1",
                  src: "https://www.youtube.com/embed/%id%?enablejsapi=1",
               },
            },
         },
         callbacks: {
            markupParse: function (template, values, item) {
               values.title = item.el.attr("title");
            },
            open: function () {
               var iframe = $('.mfp-iframe-scaler').find('iframe');
               iframe.prop('id', 'videoiframe');
               var YouTubeIframeLoader = require('youtube-iframe');
               YouTubeIframeLoader.load(function (YT) {
                  var player = new YT.Player('videoiframe', {
                     events: {
                        onReady: function (e) {
                           e.target.playVideo();
                        },
                        onStateChange: function (e) {
                           if (e.data === YT.PlayerState.ENDED) {
                              //instance.close();
                           }
                        },
                     },
                  });
               });
               $('body').addClass('popbopen');
            },
            close: function () {
               $("body").removeClass("popbopen");
            },
         },
      });

      /* youtube link replace*/
      var popurl = [];
      $("a.popvid , a.popvidgallery , a.popvidbox").each(function (i) {
         popurl.unshift($(this).attr("href"));
         for (var i = 0; i < popurl.length; i++) {
            var popnew = [];
            popnew.unshift(
               popurl[i].replace("youtu.be/", "www.youtube.com/watch?v=")
            );
            $(this).eq(i).attr("href", popnew[i]);
         }
      });

      $('.editgalitemcap').click(function () {
         $('.admingal_itemtitle').removeClass('active');
         $(this).closest('.admingalitem').find('.admingal_itemtitle').addClass('active');
         $(this).hide();
         $(this).next().removeClass('hide');
      });

      $('.admingalcta .savetitle').click(function () {
         $(this).addClass('hide');
         $(this).prev().show();
         $(this).parents('.admingalitem').find('.admingal_itemtitle').removeClass('active');
      });

   }, []);

   const swapBoxes = (fromBox, toBox, boxes, setBoxes) => {
      const bx = [...boxes];
      const fromIndex = bx.findIndex((box) => box.id === fromBox.id);
      const toIndex = bx.findIndex((box) => box.id === toBox.id);
      //console.log(bx[fromIndex] , bx[toIndex])
      if (fromIndex !== -1 && toIndex !== -1) {
         [bx[toIndex], bx[fromIndex]] = [bx[fromIndex], bx[toIndex]];
         setBoxes(bx);
      }
   };

   const handleDrop = (data, boxes, setBoxes) => event => {
      event.preventDefault();
      let fromBox = JSON.parse(event.dataTransfer.getData('dragContent'));
      let toBox = { id: data.id };
      //console.log(fromBox, toBox, data, boxes, setBoxes);
      swapBoxes(fromBox, toBox, boxes, setBoxes);
      return false;
   };

   const handleDragStart = data => event => {
      let fromBox = JSON.stringify({ id: data.id });
      event.dataTransfer.setData('dragContent', fromBox);

   };

   const handleDragOver = () => event => {
      event.preventDefault();
      return false;
   };




   return (
      <div className={"admingalbox grid gap16 dragbox " + gallery}>
         {gallery === 'imagegallery' && (boxes.map((item, index) =>
            <div
               className="admingalitem"
               draggable="true"
               data-id={index}
               key={item.id}
               onDragStart={handleDragStart({ id: item.id })}
               onDragOver={handleDragOver({ id: item.id })}
               onDrop={handleDrop({ id: item.id }, boxes, setBoxes)} >

               <div className="admingalitem_inner" data-index={index}>
                  <figure className="pvr">
                     <Image src={item.link} width="288" height="293" alt="" className="objctimg_box" />
                  </figure>
                  <h5 className="admingal_itemtitle"><textarea defaultValue={item.title} /></h5>
                  <div className="df fww just-between admingalcta">
                     <a href={item.link} className="admingalimg">View <i className="fas fa-expand-arrows-alt"></i></a>
                     <span className="editgalitemcap">Edit <i className="fas fa-pen"></i></span>
                     <span className="savetitle hide"> save <i className="fas fa-save"></i></span>
                     <span className="redtxt">Remove <i className="fas fa-trash"></i></span>
                  </div>
               </div>
            </div>
         ))}

         {gallery === 'videogallery' && (boxesvid.map((item, index) =>
            <div
               className="admingalitem"
               draggable="true"
               data-id={index}
               key={item.id}
               onDragStart={handleDragStart({ id: item.id })}
               onDragOver={handleDragOver({ id: item.id })}
               onDrop={handleDrop({ id: item.id }, boxesvid, setBoxesvid)}>
               <div className="admingalitem_inner" data-index={index}>
                  <figure className="pvr">
                     <a href={item.vidurl} className="popvid">
                        <Image src={item.vidimage} width="288" height="293" alt="" className="objctimg_box" />
                        <Image className='playico' src={playicoimg} width='25' alt='play icon' />
                     </a>
                  </figure>
                  <h5 className="admingal_itemtitle"><textarea defaultValue={item.title} /></h5>
                  <div className="df fww just-between admingalcta">
                     <a href={item.vidurl} className="popvid">View <i className="fas fa-expand-arrows-alt"></i></a>
                     <span className="editgalitemcap">Edit <i className="fas fa-pen"></i></span>
                     <span className="savetitle hide"> save <i className="fas fa-save"></i></span>
                     <span className="redtxt">Remove <i className="fas fa-trash"></i></span>
                  </div>
               </div>
            </div>
         ))}


      </div>

   )
};


export default Draggallery;