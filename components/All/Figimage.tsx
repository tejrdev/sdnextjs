import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface FigimageProps {
    src: string | StaticImageData;
    width: number;
    height: number;
    alt: string;
    cls?: string;
}

const Figimage: React.FC<FigimageProps> = ({ src, cls, width, height, alt }) => {
    return (
        <figure className="pvr">
            <Image src={src} className={cls} width={width} height={height} alt={alt} />
        </figure>
    );
};

export default Figimage;

