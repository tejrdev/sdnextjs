import React from 'react';
import Link from 'next/link';
import sdplaceholder2 from '@/public/images/sdplaceholder2.jpg';

interface PosterData {
    link: string;
    img?: string | null;
    title: string;
    release_date?: string;
    [key: string]: any;
}

interface PosternameProps {
    poster: PosterData;
    posteralt?: string;
    hideopen?: boolean;
}

const Postername: React.FC<PosternameProps> = ({ poster, posteralt = '', hideopen = false }) => {
    const getImageSrc = () => {
        if (
            !poster.img ||
            poster.img === null ||
            poster.img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/uploads/2020/05/no-img.jpg' ||
            poster.img === process.env.NEXT_PUBLIC_BACKEND_URL + '/wp-content/themes/screendollars-live/assets/images/noimgico.jpg'
        ) {
            return sdplaceholder2.src;
        }
        return poster.img;
    };

    return (
        <div className='poster_item max-w-[230px]'>
            <Link href={poster.link}>
                <div className='posterboxcap relative text-center px-2'>
                    <figure className='pvr'>
                        <img src={getImageSrc()} alt={posteralt} className='objctimg_box' />
                    </figure>
                    <h6>
                        {poster.title}
                        {hideopen !== true && poster.release_date && (
                            <span dangerouslySetInnerHTML={{ __html: poster.release_date }}></span>
                        )}
                    </h6>
                </div>
            </Link>
        </div>
    );
};

export default Postername;

