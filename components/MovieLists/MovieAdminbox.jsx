import demoimg from '@/public/fourabtsld.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { ImShare2 } from 'react-icons/im';
import { RxBox } from 'react-icons/rx';
import { useState  } from 'react';


const MovieAdminbox = ({cls}) => {
   const [isClicked, setIsClicked] = useState(false);
   const [titleClicked, setTitleClicked] = useState(false);
   const markClick = (e) => {
      e.preventDefault();
      setIsClicked(!isClicked);
   };
   const edittitleClick = e => {
      e.preventDefault();
      setTitleClicked(!titleClicked);
   }
   return (
      <div className='movieadminitem'>
         <div className={"movieadminitem_inner " + cls}>
            <Link href="#" onClick={e=>e.preventDefault()}>
               <figure className="pvr">
                  <Image src={'https://picsum.photos/367/220'} className="objimg" alt="" width={266} height={154} />
               </figure>
               <h5 className={titleClicked ? 'active' : ''} contentEditable={titleClicked}>A Complete List Of All Barbie Movies In Order</h5>
            </Link>
            <div className="boxcta  df fww just-between">
               <div className="view">
                  <Link href="#">View <i className="far fa-external-link"></i></Link>
               </div>
               <div className={"edit " + (titleClicked ? 'active' : '')} onClick={edittitleClick}>
                  <span className='editingbtn'>Edit <i className="far fa-edit"></i></span>
                  <span className='savingbtn'>Save <i className="far fa-save"></i></span>
               </div>
               <div className="archive">
                  <span>Archive <i className="far fa-trash-alt"></i>
                  </span>
               </div>
            </div>
            <div className="boxsharefeature  df fww just-between">
               <span className='socialshare'>Share <ImShare2 /></span>
               <span className={'markingfeaure ' + (isClicked ? 'active' : '')} onClick={markClick}><RxBox />Mark Featured</span>
               <span className='spacigfor'>sp</span>
            </div>
         </div>
      </div>
   )
}

export default MovieAdminbox