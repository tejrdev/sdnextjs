import React from 'react';

interface SponsorshipData {
    sponsorship_list: string[];
    sponsorship_title?: string;
    sponsorship_description?: string;
    [key: string]: any;
}

interface SponsorshipProps {
    data: SponsorshipData;
}

const Sponsorship: React.FC<SponsorshipProps> = ({ data }) => {
    return (
        <section className='sponceropp secspace'>
            <div className='container'>
                <div className='sponcers_add df fww'>
                    {data.sponsorship_list.map((item, index) => {
                        return (
                            <div className='spons_col' key={index}>
                                <span className='pvr'>
                                    <div className='sponce_item'>
                                        <img src={item} alt='' className='objctimg_box' />
                                    </div>
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className='toptxt'>
                    {data.sponsorship_title && <h3>{data.sponsorship_title}</h3>}
                    {data.sponsorship_description && <div dangerouslySetInnerHTML={{ __html: data.sponsorship_description }}></div>}
                </div>
            </div>
        </section>
    );
};

export default Sponsorship;

