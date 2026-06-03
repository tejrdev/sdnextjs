import Link from 'next/link';
import { useState } from 'react';
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import sdplaceholder2 from '@/public/images/sdplaceholder2.jpg';



const UpcomingPoster = ({ mvdata }) => {

    const [like, setLike] = useState(parseInt(mvdata?.like) || 0);
    const [dislike, setDislike] = useState(parseInt(mvdata?.dislike) || 0);
    const post_id = mvdata?.post_id;

    const handleLike = async (id: string) => {
        // setLike(like + 1);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/film_data_pages/like-dislike-movie.php?post_id=${post_id}&like=${like}&dislike=${dislike}`);
        const data = await response.json();
        if (data.sucess) {
            setLike(like + 1);
        }
    }
    const handleDislike = async (id: string) => {
        // setDislike(dislike + 1);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/film_data_pages/like-dislike-movie.php?post_id=${post_id}&like=${like}&dislike=${dislike}`);
        const data = await response.json();
        if (data.sucess) {
            setDislike(dislike + 1);
        }
    }
    return (
        <div className='upposter bg-white rounded-lg shadow-lg translate-y-0 hover:translate-y-[-5px] transition-all duration-300'>
            <Link href={mvdata?.link} className='text-black'>
                <figure className='mb-2 rounded-md relative pb-[140%] overflow-hidden border border-gray-300 border-b-0'>
                    <img src={`${mvdata?.poster_img === null || mvdata?.poster_img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/uploads/2020/05/no-img.jpg' || mvdata?.poster_img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/noimgico.jpg' ? sdplaceholder2.src : mvdata?.poster_img}`} alt="Upcoming Movie Poster" className='objimg ' />
                    {/*  <figcaption className="absolute bottom-0 left-0 bg-gold text-gray-900 px-4 py-1 text-sm font-bold z-10 rounded"> Jul 11 </figcaption> */}
                </figure>
                <div className=" bg-gray-900 text-gold text-center px-3 py-2 text-base font-bold z-10 mt-[-10px] rounded-md mb-2"> Jul 11 </div>
                <h5 className='px-3 mb-0'>{mvdata?.title}</h5>
            </Link>
            <div className="uppostinfo p-3">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center">
                        {mvdata?.rating && <div className="rating mr-3">{mvdata?.rating}</div>}
                        {mvdata?.runtime && <time>{mvdata?.runtime}</time>}
                    </div>
                    <div className="flex items-center">
                        <div className="like flex mr-2 mt-1 cursor-pointer" onClick={() => handleLike(mvdata?.post_id)}> <SlLike className='mr-1' /> {like} </div>
                        <div className="dislike flex cursor-pointer" onClick={() => handleDislike(mvdata?.post_id)}> <SlDislike className='mr-1 mt-1' /> {dislike} </div>
                    </div>
                    <div className="upgenere mt-2 w-full">
                        {mvdata?.genre}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingPoster