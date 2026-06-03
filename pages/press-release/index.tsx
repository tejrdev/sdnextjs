import React from 'react'
import Link from 'next/link'

const PressRelease = () => {
    // Sample press release items - replace with real data/API
    const pressReleases = [
        { title: 'Steel reports Consolidated EBITDA of Rs 8,309 crores for the quarter and Rs 24,894 crores for the nine months ended December 31, 2025', location: 'Mumbai', date: 'February 06, 2026', link: '/press-release/-steel-reports-consolidated-ebitda-of-rs-8309-crores-for-the-quarter-and-rs-24894-crores-for-the-nine-months-ended-december-31-2025', type: 'vendor' },
        { title: 'Ishaara and Steel Foundation Bring Tribal Cuisines to Mumbai Through Heritage and Roots Pop-Up', location: 'Jamshedpur, Mumbai', date: 'January 22, 2026', link: '/press-release/ishaara-and--steel-foundation-bring-tribal-cuisines-to-mumbai-through-heritage-and-roots-pop-up', type: 'vendor' },
        { title: 'Steel Nederland Opens New Production Line for Sustainable Food Packaging', location: 'Nederland', date: 'January 16, 2026', link: '/press-release/-steel-nederland-opens-new-production-line-for-sustainable-food-packaging', type: 'vendor', img: '/images/press-release/-steel-nederland-opens-new-production-line-for-sustainable-food-packaging.jpg' },
        { title: 'IIM Raipur and Steel Foundation Partner for Social Impact and Inclusive Development', location: 'Jamshedpur, Raipur, Ranchi', date: 'January 15, 2026', link: '/press-release/iim-raipur-and--steel-foundation-partner-for-social-impact-and-inclusive-development', type: 'vendor' },
    ]
    return (
        <div className="min-h-screen bg-slate-100">
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Press Releases</h1>
                    <div className="year-filter flex gap-8 mb-8">
                        <button className="year-filter-button btn">2026</button>
                    </div>
                    <div className="flex flex-wrap gap-6 ">
                        {pressReleases.map((item, index) => (
                            <Link
                                href={item.link}
                                className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 p-6 w-full"
                            >
                                <article
                                    key={index}
                                    className="text-gray-900 group-hover:text-blue 
                                    transition-colors cursor-pointer flex flex-wrap gap-4 items-start"
                                >
                                    {item.img && <div className={`pressmedia-box ${item.img ? 'mb-4w-[150px] h-[100px]' : ''}`}>
                                        <img src={'https://picsum.photos/150/100'} alt={item.title} className="w-full object-cover rounded-md mb-4" />
                                    </div>}
                                    <div className="pressmedia-content md:w-[calc(100%-166px)]">
                                        <h2 className="font-bold text-lg leading-snug mb-3">
                                            {item.title}
                                        </h2>
                                        <p className="text-base text-gray-500">
                                            <span className="font-medium">{item.location}</span>
                                            <span className="mx-2">·</span>
                                            <span>{item.date}</span>
                                            <span className="mx-2">·</span>
                                            <span>{item.type}</span>
                                        </p>
                                    </div>

                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    )
}

export default PressRelease