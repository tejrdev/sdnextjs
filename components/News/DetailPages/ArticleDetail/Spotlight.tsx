import spotheadlight from '@/public/images/spotheaderbg.jpg';
import Link from 'next/link';

interface SpotlightProps {
    data: any;
}

const Spotlight = ({ data }: SpotlightProps) => {
    return (
        <div className="min-h-screen bg-white">
            {/* 1. Header Section with Purple Background */}
            <div className='max-w-4xl mx-auto mt-6'>
                <div className="relative rounded-lg ">

                    {/* Header Content */}
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4 hidden">
                            SCREENDOLLARS SPOTLIGHT
                        </h1>
                        <img src={spotheadlight.src} alt="Frazil Beverages" className="w-full rounded-t-lg  shadow-lg" />
                        <p className="text-xl md:text-2xl text-white font-medium bg-gray-800 p-2 rounded-b-lg flex flex-wrap items-center justify-center">
                            PRESENTED BY:
                            <Link href={data?.spolight_data?.vendor_url || '#'} className='flex items-center justify-center text-white ml-2 hover:text-yellow-400 hover:no-underline'>
                                {/* <img src={data.spolight_data.vendor_logo} alt="Frazil Beverages" className="h-10 ml-3 p-1 
              rounded-sm" /> */}
                                {data.spolight_data.vendor_title}
                            </Link>
                        </p>
                        <p className="text-md md:text-lg text-gray-800 float-right">
                            Published on: {data.published_date}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Banner Image Section */}
            <section className="pt-4 pb-8 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white   rounded-lg  ">
                        <img
                            src={data.img_url}
                            alt="Frazil Beverages"
                            className="w-full  rounded-lg "
                        />
                    </div>
                </div>
            </section>

            {/* 3. Title and Content Section */}
            <section className="py-6 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className=" p-4 rounded-lg ">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                            {data.title}
                        </h2>

                        <div className="prose prose-lg max-w-none text-gray-800 space-y-6" dangerouslySetInnerHTML={{ __html: data.top_content as string }}>

                        </div>

                        {/* Product Images Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mt-12">
                            {data.spolight_image_1 && (
                                <div className="space-y-4">
                                    <img
                                        src={data.spolight_image_1}
                                        alt="Frazil Dispensing Machines"
                                        className="w-full h-52 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            {data.spolight_image_2 && (
                                <div className="space-y-4">
                                    <img
                                        src={data.spolight_image_2}
                                        alt="Frazil Dispensing Machines"
                                        className="w-full h-52 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="ftrbnr my-3 sm:my-6 px-4">
                        <a href={data?.banner_link ? data?.banner_link : '#'} target="_blank" rel="noopener noreferrer">
                            <img src={data.footer_banner} alt="Frazil Beverages" className="w-full rounded-lg" />
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Spotlight;