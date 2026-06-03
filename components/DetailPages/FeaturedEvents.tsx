
import Link from 'next/link'
import Image from 'next/image'

type FeaturedEventItem = {
    title: string;
    link: string;
    img: string;
    date: string;
    read_time?: string;
};

const FeaturedEvents = ({ data }: { data: any }) => {
    // const data: FeaturedEventItem[] = [
    //     {
    //         title: '2026 Annual UDITOA Convention',
    //         link: '/events/2026-annual-udito-convention',
    //         img: 'https://picsum.photos/seed/udito-audience/560/360',
    //         date: 'May 23, 2025',
    //         read_time: '2 min read',
    //     },
    //     {
    //         title: '2026 Annual UDITOA Convention',
    //         link: '/events/2026-annual-udito-convention-bowl',
    //         img: 'https://picsum.photos/seed/udito-amphitheater/560/360',
    //         date: 'May 23, 2025',
    //         read_time: '2 min read',
    //     },
    //     {
    //         title: '2027 Annual UDITOA Trade Show & Convention',
    //         link: '/events/2027-udito-trade-show-convention',
    //         img: 'https://picsum.photos/seed/udito-arena/560/360',
    //         date: 'January 25 – 28, 2027',
    //     },
    //     {
    //         title: '2027 Annual UDITOA Trade Show & Convention',
    //         link: '/events/2027-udito-trade-show-convention-hollywood',
    //         img: 'https://picsum.photos/seed/walk-of-fame/560/360',
    //         date: 'January 25 – 28, 2027',
    //     },
    // ];
    return (
        <section className="featured-events py-8 md:py-12 lg:py-14 bg-zinc-100">
            <div className="container">
                <h2 className="text-2xl sm:text-4xl font-bold mb-5">Featured Events</h2>
                <div className="featEvent_box flex flex-wrap gap-5">
                    {data?.map((article, index: number) => (
                        <div className="featEvent_item w-full lg:w-[calc(50%-22px)]" key={index}>
                            <div className="rounded-lg flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-0">
                                <div className="w-full sm:w-[180px] sm:shrink-0 xl:w-[280px] relative aspect-[280/150] overflow-hidden rounded-md bg-white border border-gray-200">
                                    <Image
                                        src={article.img}
                                        alt=""
                                        fill
                                        className="object-contain object-center p-2"
                                        sizes="(max-width: 1280px) 180px, 280px"
                                    />
                                </div>
                                <div className="w-full min-w-0 sm:w-[calc(100%-180px)] xl:w-[calc(100%-280px)] py-1 sm:pl-3 flex flex-col justify-between">
                                    <div>
                                        <Link href={article.link}><h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight mt-2 lg:mt-4">
                                            {article.title}
                                        </h3></Link>
                                        <p className="text-sm text-gray-600 mb-0 flex items-center">
                                            {article.date}
                                            {article.read_time && <p className='ml-3 mb-1  text-sm flex items-center'>
                                                <span className='mr-2 w-5 h-5'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" /></svg> &nbsp; </span>
                                                {article.read_time}

                                            </p>}
                                        </p>
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

export default FeaturedEvents