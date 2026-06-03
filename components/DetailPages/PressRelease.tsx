import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type PressArticle = {
    title: string;
    link: string;
    img: string;
    published_date: string;
    read_time?: string;
    source?: string;
};

const PressRelease = ({ data }: { data: any }) => {
    // const data: PressArticle[] = [
    //     {
    //         title:
    //             'CinemaCon® Renames Caesars Palace Venue “The Dolby Colosseum” For 2026 Global Convention',
    //         link: '/press-release/cinemacon-dolby-colosseum-2026',
    //         img: 'https://picsum.photos/seed/cinemacon-stage/400/400',
    //         published_date: 'April 15, 2026',
    //         source: 'Cinema United',
    //     },
    //     {
    //         title: 'Cinema United Extends Contract of CEO and President',
    //         link: '/press-release/cinema-united-ceo-contract',
    //         img: 'https://picsum.photos/seed/ceo-podium/400/400',
    //         published_date: 'April 15, 2026',
    //         source: 'Cinema United',
    //     },
    //     {
    //         title: 'Cinema United Applauds National Film Registry Selections',
    //         link: '/press-release/national-film-registry',
    //         img: 'https://picsum.photos/seed/registry-film/400/400',
    //         published_date: 'April 15, 2026',
    //         source: 'Cinema United',
    //     },
    //     {
    //         title: 'Ellis Jacob to Receive Legend of Cinema Award at CinemaCon® 2026',
    //         link: '/press-release/ellis-jacob-legend-cinemacon-2026',
    //         img: 'https://picsum.photos/seed/ellis-portrait/400/400',
    //         published_date: 'April 15, 2026',
    //         source: 'Cinema United',
    //     },
    // ];
    return (
        <section className="pressrel mb-7 toplinesec">
            <div className="container">
                <div className="top_txt py-4 md:pt-6 md:pb-5" >
                    <h2 className="capitalize"> Press Releases </h2>
                </div>
                <div className="pressrel_list flex flex-wrap gap-5">
                    {data?.map((article, index: number) => (
                        <div className="newsancer_item xl:flex-flex-[1_1_calc(50%-20px)] w-full lg:w-[calc(50%-20px)]" key={index}>
                            <div className="bg-white rounded-lg flex flex-col sm:flex-row items-start border border-gray-600">
                                <div className="w-full sm:w-[150px] xl:w-[180px] flex-shrink-0 pb-[55%] sm:pb-[200px] relative">
                                    <Link href={article.link}><Image src={article.img} alt={article.title} width={110} height={180} className="w-full h-full object-cover rounded-md absolute left-0 top-0 cursor-pointer" /></Link>
                                </div>
                                <div className="w-full sm:w-[calc(100%-150px)] xl:w-[calc(100%-180px)] py-2 px-3 flex flex-col justify-between">
                                    <div>
                                        {/* <p className="text-sm text-gray-800 my-1 flex w-full items-center justify-between gap-2">
                                            <span>{article.date}</span>
                                            {article.source ? (
                                                <span className="shrink-0 text-gray-800">{article.source}</span>
                                            ) : (
                                                article.read_time && (
                                                    <span className="mb-1 flex shrink-0 items-center text-sm text-gray-600">
                                                        <span className="mr-2 h-5 w-5">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
                                                            </svg>{' '}
                                                        </span>
                                                        {article.read_time}
                                                    </span>
                                                )
                                            )}
                                        </p> */}
                                        <Link href={article.link}><h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight sm:min-h-[105px] flex items-center">
                                            {article.title}
                                        </h3></Link>
                                    </div>
                                    <div className="mb-2">
                                        <Link href={article.link}><button className="roundbtn min-w-40">
                                            Read Now
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default PressRelease