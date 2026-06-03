import React from 'react';
import CelebmovieSlider from './CelebmovieSlider';
import type { CelebmovieSliderData } from './CelebmovieSlider';

interface CelebsbyMoviesProps {
    data?: CelebmovieSliderData[];
}

const CelebsbyMovies = ({ data }: CelebsbyMoviesProps) => {
    return (
        <section className='celebsmovie'>
            <div className='container'>
                <div className='seclinespace'>
                    <div className='top_txt df fww just-between relative'>
                        <div className='secnav df fww'>
                            {/* <h3> <Link href='#'> Celebrities by Movies   </Link> </h3> */}
                            <h3> Celebrities by Movies </h3>
                        </div>
                        {/* <div className='view_btn'> <Link href={data.link} className='btn'> View All </Link> </div> */}
                    </div>
                    <div className='celebblock flex flex-wrap gap-1 justify-between'>
                        {data?.map((item, index) => (
                            <CelebmovieSlider data={item} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CelebsbyMovies;

