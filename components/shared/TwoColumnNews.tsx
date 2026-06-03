import Link from "next/link";
import ReadTimeIcon from "./ReadTimeIcon";
import Image from "next/image";

interface TwoColumnNewsProps {
    data: any;
    left_tag: string;
    right_tag: string;
}

const TwoColumnNews = ({ data, left_tag, right_tag }: TwoColumnNewsProps) => {

    let leftColNews = data?.filter((article: any) => article.category === left_tag);
    leftColNews = leftColNews[0];
    let rightColNews = data?.filter((article: any) => article.category === right_tag);
    rightColNews = rightColNews[0];

    return (

        <section className="cbnews sm:py-8 py-5">
            <div className="container">
                <div className="cbnews_box lg:flex flex-wrap sm:flex-nowrap gap-5 items-start">
                    {leftColNews?.data?.length > 0 && (
                        <div className="cbnews_item flex flex-wrap gap-3 w-full lg:w-[46%]">
                            <h2 className="text-2xl sm:text-4xl font-bold w-full">{leftColNews?.title}</h2>
                            {leftColNews?.data?.slice(0, 4)?.map((article: any, index: number) => (
                                <div className="cbnews_celebrity md:w-[calc(50%-12px)] lg:w-full w-full" key={index}>
                                    <div className="bg-white rounded-lg flex flex-col sm:flex-row items-start lg:gap-4 gap-2">
                                        <div className="w-full sm:w-[180px] flex-shrink-0 pb-[55%] sm:pb-[120px] relative">
                                            <Link href={article.link}>
                                                <Image src={article.img} alt={article.title} width={180} height={120} className="w-full h-full object-cover rounded-md absolute left-0 top-0" />
                                            </Link>
                                        </div>
                                        <div className="w-full sm:flex-1 py-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">
                                                    <Link href={article.link}>{article.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-0 flex items-center">
                                                    {article.date_time}{article.read_time && <span className='ml-3 mb-1  text-sm flex items-center'>
                                                        <ReadTimeIcon color="black" width={16} height={16} /> &nbsp;
                                                        {article.read_time}

                                                    </span>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {rightColNews?.data?.length > 0 && (
                        <div className="cbnews_item w-full lg:w-[54%] lg:border-l border-gray-500 pl-0 lg:pl-4 lg:border-r lg:pr-4 mt-6 lg:mt-0">
                            <h2 className="text-2xl sm:text-4xl font-bold mb-6">{rightColNews?.title}</h2>
                            <div className="industrynews_box  grid grid-cols-[repeat(auto-fit,minmax(191px,1fr))] gap-4  
                            ">
                                {rightColNews?.data?.map((article: any, index: number) => (
                                    <div className="cbnews_celebrity " key={index}>
                                        <Link href={article.link}>
                                            <div className="bg-white rounded-lg flex flex-col items-start gap-1">
                                                <div className="w-full sm:w-[191px] flex-shrink-0 pb-[120px] relative">
                                                    <Image src={article.img} alt={article.title} width={191} height={120} className="w-full h-full object-cover rounded-md absolute left-0 top-0" />
                                                </div>
                                                <div className="w-full sm:flex-1 py-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">
                                                            {article.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default TwoColumnNews;