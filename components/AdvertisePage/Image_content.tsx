import React from 'react';

interface ImageContentData {
    class_name: string;
    title: string;
    content: string;
    img: string;
    img_alt?: string;
    [key: string]: any;
}

interface ImageContentProps {
    data: ImageContentData;
}

const Image_content: React.FC<ImageContentProps> = ({ data }) => {
    return (
        <section className={data.class_name}>
            <div className='container'>
                <div className='addsmovid_box'>
                    {data.title.length ? <h3>{data.title}</h3> : ''}
                    <div className={'adds_movietxt flex mt-5 items-center content-center flex-col-reverse ' + (data.class_name === 'addsmovie_info add_rightfigtxt secspace' ? 'xsm:flex-row' : 'xsm:flex-row-reverse')}>
                        <div className={'addtxtbox pt-5 xsm:pt-0' + (data.class_name === 'addsmovie_info add_rightfigtxt secspace' ? 'p-0 lg:w-[calc(100%-300px)]' : 'xsm:pl-10 lg:w-[calc(100%-250px)]')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                        <div className={'addinfo_graphic mx-auto xsm:m-0 float-none sm:pt-0  sm:pb-5 max-w-[150px] lg:max-w-[250px] ' + (data.class_name === 'addsmovie_info add_rightfigtxt secspace' ? 'sm:float-rigt xsm:pl-5' : 'sm:float-left sm:pr-5')}>
                            <img src={data.img} alt={data.img_alt || ''} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Image_content;

