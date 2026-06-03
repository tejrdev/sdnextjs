import Counter from '@/components/Products/Counter';
import Whatget from '@/components/Products/Whatget';
import Recentissue from '@/components/Products/Recentissue';
//import Paychoose from '@/components/Products/Paychoose';
import { HiCheck } from 'react-icons/hi';
import React, { useState, useEffect, useRef } from 'react';
import { GetStaticProps } from 'next';

interface CounterDataItem {
    countstart: number;
    countend: number;
    name: string;
}

interface WhatYouGetSection {
    title?: string;
    items?: any[];
    [key: string]: any;
}

interface ProData {
    what_you_get_section?: WhatYouGetSection;
    [key: string]: any;
}

interface ProductsProps {
    Pro_data: ProData;
}

export const getStaticProps: GetStaticProps<ProductsProps> = async () => {
    // news page static data
    // let whatgetdata = await fetch('https://sd-nextjs.vercel.app/api/products/');
    // whatgetdata = await whatgetdata.json();

    const Pro_dataResponse = await fetch(process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/home_page.php?api_token=' + process.env.NEXT_PUBLIC_API_TOKEN);
    const Pro_data: ProData = await Pro_dataResponse.json();

    return {
        props: { Pro_data },
        revalidate: 10, // In seconds
    };
};

const Products = ({ Pro_data }: ProductsProps) => {
    const counterdata: CounterDataItem[] = [
        {
            countstart: 1000,
            countend: 5000,
            name: 'Talents',
        },
        {
            countstart: 0,
            countend: 265,
            name: 'directory listing',
        },
        {
            countstart: 1000,
            countend: 9000,
            name: 'movies & data',
        },
        {
            countstart: 0,
            countend: 135,
            name: 'rentals',
        },
    ];

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [carectorWidth, setcarectorWidth] = useState<number>(0);
    const animref = useRef<HTMLUListElement>(null);
    //console.log(animref.current.offsetWidth)
    const carectorref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (carectorref.current) {
            const width = carectorref.current.getBoundingClientRect().width;
            setcarectorWidth(width);
        }
    }, []);

    const classList = ['one', 'two', 'three']; // Add your class names here
    const Listwords = ['usable', 'accurate', 'data-driven']; // Add your class names here
    const duration = 3000; // 1 second
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [liwidth, setliwidth] = useState<number[]>([150, 150, 150]);

    Listwords.map((item, index) => {
        //listwidth.push(item.length * (carectorWidth / 2 + 8));
        //liwidth.push(animref.current.offsetWidth);
        //console.log(animref.current)
    });

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
            if (animref.current) {
                const items = animref.current.querySelectorAll('li');
                const widths = Array.from(items).map((item) => item.offsetWidth);
                setliwidth(widths);
            }
        }, 1000);
        //console.log(widths , liwidth)
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % classList.length);
            //setliwidth(listwidth[activeIndex])
        }, duration);

        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, [classList.length, duration, liwidth]);

    //console.log( liwidth);
    return (
        <>
            <section className='insteintro secspace'>
                <div className='container'>
                    <div className='top_txt text-center'>
                        <h1 className='uppercase'>
                            Finally, access to
                            {/* <span id="slidetxt">
                        <ul className="headtxtanimate" >
                           <li>insider information</li>
                           <li>This information</li>
                           <li>Tez information</li>
                        </ul>
                     </span> */}
                            <span id='fiptxt'>
                                <ul className='refwisth' ref={animref}>
                                    {Listwords.map((item, index) => (
                                        <li key={index} className='reflist'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <ul className='headtxtanimate'>
                                    {Listwords.map((item, index) => (
                                        <li
                                            key={index}
                                            className={index === activeIndex ? 'active' : ''}
                                            style={{
                                                width: index === activeIndex ? liwidth[activeIndex] : '150px',
                                                height: index === activeIndex ? '' : 0,
                                            }}>
                                            {item}
                                        </li>
                                    ))}
                                    {/*<li className='active'>insider information</li>
                            <li>insider information</li>
                           <li>This information</li>
                           <li>Tez information</li> */}
                                </ul>
                            </span>
                            {/* <span id="fadtxt">
                        <ul className="headtxtanimate" >
                           <li>insider information</li>
                           <li>This information</li>
                           <li>Tez information</li>
                        </ul>
                     </span> 

                  on <br/> upcoming movie releases <span ref={carectorref} className='carectorsize'>O</span>*/}
                            <br /> Pre-release movie intelligence
                        </h1>
                        <p>Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl, consectetur et luctus et, porta ut dolor. Curabitur ultricies ultrices nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam. Maecenas vitae egestas dolor. Fusce tempor.</p>
                        <div className='ctabox'>
                            <span className='btn uppercase'>Try it for free</span>
                            {/* <a href="#" className="ghostbtn goldbtn uppercase">learn more</a> */}
                        </div>
                    </div>
                    <div className='introvideo text-center'>
                        <iframe src='https://www.youtube.com/embed/XsI9F3n-Bog?enablejsapi=1' title='HTML5 tests video big buck bunny' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>
                    </div>
                </div>
            </section>
            <Counter data={counterdata} requestFrom='products' />
            {/* <Whatget data={whatgetdata.whatget}/> */}
            {Pro_data.what_you_get_section?.title && <Whatget data={Pro_data.what_you_get_section} user={undefined} ProInd={undefined} />}

            <div className='offering secspace'>
                <div className='container'>
                    <table className='responceoffering'>
                        <caption>
                            <h3 className='uppercase'>weekly offerings</h3>
                        </caption>
                        <thead className='uppercase text-center'>
                            <tr>
                                <th scope='col'>When</th>
                                <th scope='col'>item</th>
                                <th scope='col'>classic</th>
                                <th scope='col'>pro</th>
                            </tr>
                        </thead>
                        <tbody className='uppercase text-center'>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <HiCheck />
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <HiCheck />
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='offering secspace'>
                <div className='container'>
                    <table className='responceoffering'>
                        <caption>
                            <h3 className='uppercase'>quarterly offerings</h3>
                        </caption>
                        <thead className='uppercase text-center'>
                            <tr>
                                <th scope='col'>When</th>
                                <th scope='col'>item</th>
                                <th scope='col'>classic</th>
                                <th scope='col'>pro</th>
                            </tr>
                        </thead>
                        <tbody className='uppercase text-center'>
                            <tr>
                                <td data-label='When'>last week of Quarter</td>
                                <td data-label='item'>Preview of Upcoming Quarter</td>
                                <td data-label='classic'>
                                    <HiCheck />
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                    <span className='protake'>(eARLY ACCESS)</span>
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <HiCheck />
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='When'>SUN</td>
                                <td data-label='item'>Weekly Newsletter [Email]</td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='offering secspace'>
                <div className='container'>
                    <table className='responceoffering'>
                        <caption>
                            <h3 className='uppercase'>website features</h3>
                        </caption>
                        <thead className='uppercase text-center'>
                            <tr>
                                <th scope='col' colSpan={2}>
                                    item
                                </th>
                                <th scope='col'>classic</th>
                                <th scope='col'>pro</th>
                            </tr>
                        </thead>
                        <tbody className='uppercase text-center'>
                            <tr>
                                <td data-label='item' colSpan={2}>
                                    Claim/Create Directory Listing
                                </td>
                                <td data-label='classic'>
                                    <HiCheck />
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='item' colSpan={2}>
                                    Weekly Newsletter [Email]
                                </td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                            <tr>
                                <td data-label='item' colSpan={2}>
                                    Weekly Newsletter [Email]
                                </td>
                                <td data-label='classic'>
                                    <span></span>
                                </td>
                                <td data-label='pro'>
                                    <HiCheck />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <Recentissue data={whatgetdata.recissue} /> */}
            <section className='paymentplan secspace'>
                <div className='container'>
                    <div className='top_txt text-center'>
                        <h2>TRY IT NOW for free!</h2>
                        <p>
                            Get your <strong>30 day free trial</strong> which gives you <strong>full access</strong> to all of our features. <br /> billing will begin at the end of the free trial...{' '}
                        </p>
                    </div>
                    <div className='ctabox text-center'>
                        <span className='btn uppercase'>Try it for free</span>
                        {/* <a href="#" className="ghostbtn goldbtn uppercase">see pricing</a> */}
                    </div>
                    {/* <Paychoose align={'text-center'} choose/> */}
                </div>
            </section>
        </>
    );
};

export default Products;

