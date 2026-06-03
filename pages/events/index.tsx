import React from 'react'

const page = () => {
    return (
        <div className='eventsPage py-8 md:py-12 lg:py-14 bg-zinc-100'>
            <div className='container'>
                <h1>Events</h1>
                <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>

                <div className="evetsbox grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 ">
                    {Array.from({ length: 10 }).map((_, index) =>
                        <div className="card max-w-sm mx-auto bg-white rounded-md shadow-lg overflow-hidden ">
                            <figure className='w-full relative border-2 border-white rounded-md'>
                                <img
                                    src="https://picsum.photos/400/250"
                                    alt="Movie & TV Trivia Nights"
                                    className="w-full h-auto object-cover rounded-md"
                                    loading="lazy"
                                />
                            </figure>
                            <div className="p-3 text-center">
                                <h4 className=" text-black mb-2">Movie &amp; TV Trivia Nights</h4>
                                <p className="text-gray-500 mb-3 font-bold">Tuesday, Jun 23 – 7:00PM</p>
                                <a href="#" className="cta_btn inline-flex justify-center items-center gap-2 rounded-full border border-black p-[2px] font-medium text-black transition-colors hover:bg-black hover:text-white hover:border-black focus:text-black capitalize px-4 py-1 min-w-[200px] mx-auto my-2">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page