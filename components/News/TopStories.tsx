import Link from "next/link";
import Image from "next/image";

const TopStories = ({ data }: { data: any }) => {
    return (
        <>
            {data?.length > 0 && (
                <section className="topstorybox sm:py-8 py-5">
                    <div className="container">
                        <h2 className="text-2xl sm:text-4xl font-bold">Top Stories</h2>
                        <div className="topstory_box flex flex-wrap lg:flex-nowrap gap-5 sm:gap-7">
                            <div className="topstory_featureitem xl:w-1/2 lg:w-1/3 w-full">
                                <div className="topstory_item_img relative mb-4 sm:max-w-[500px] lg:max-w-full">
                                    <Image src={data?.[0]?.img} alt={data?.[0]?.title} width={594} height={334} className="rounded-md" />
                                </div>
                                <div className="topstory_item_txt">
                                    {data?.map((story: any, index: number) => {
                                        if (index > 0) return null;
                                        return (
                                            <div key={index}>
                                                <p className="text-sm"><Link href={story?.cat_link ? story?.cat_link : story?.source_url} className='text-gray-700'>{story?.cat_name ? story?.cat_name : story?.source}</Link> | {story.date}  </p>
                                                <h3 className="text-xl sm:text-[24px] font-bold">{story.title}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="cta_btn">
                                    <Link href={data?.[0]?.link}><button className="roundbtn min-w-40">Read Now</button></Link>
                                </div>
                            </div>
                            <div className="topstory_list  xl:w-1/2 lg:w-2/3 w-full flex flex-col gap-4">
                                {data.slice(1, 4)?.map((story: any, index: number) => (
                                    <div className="topstory_item" key={index}>
                                        <div className="bg-white rounded-lg flex flex-col sm:flex-row items-start">
                                            <div className="w-full sm:w-[280px] flex-shrink-0 pb-[55%] sm:pb-[180px] relative">
                                                <Image src={story.img} alt={story.title} width={280} height={160} className="w-full h-full object-cover rounded-md absolute left-0 top-0" />
                                            </div>
                                            <div className="w-full sm:w-[calc(100%-280px)] py-1 sm:px-3 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">
                                                        {story.title}
                                                    </h3>

                                                    {story?.source_url ? (
                                                        <Link href={story?.source_url}>
                                                            <span className="newshdbox_info flex mb-0"><span className="aurthimg">
                                                                <img src={story.source_icon} className="objctimg_box" alt="" />
                                                            </span><p className="text-sm text-gray-600 mb-1">
                                                                    {story?.cat_name ? story?.cat_name : story?.source}</p></span>
                                                        </Link>
                                                    ) : (
                                                        <Link href={story?.cat_link}>
                                                            <p className="text-sm text-gray-600 mb-1">
                                                                {story?.cat_name ? story?.cat_name : story?.source}</p>
                                                        </Link>
                                                    )}
                                                    <p className="text-sm text-gray-600 mb-0">
                                                        {story.date}
                                                    </p>
                                                </div>
                                                <div className="mt-4">
                                                    <Link href={story?.link}><button className="roundbtn min-w-40">
                                                        Read Now
                                                    </button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>)}
        </>
    )
}

export default TopStories;