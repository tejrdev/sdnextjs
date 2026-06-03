import Link from 'next/link'
import React, { useState } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const DIGITS = '0123456789'.split('')

const GlossaryFilter = ({ data }: { data: any }) => {
    const [activeLetter, setActiveLetter] = useState('All')

    return (
        <div className="glossaryFilter relative">

            <div className="bg-zinc-900 py-4 px-4 sticky top-0 z-10">
                <div className="container">
                    <div className="filtering flex flex-wrap items-center gap-4 ">
                        <div className="flex flex-wrap items-center gap-1 rounded-md md:rounded-full border border-white px-2 py-1.5">
                            <a
                                href="#a"
                                onClick={() => setActiveLetter('All')}
                                className={`rounded-full px-2 h-6 font-medium transition-colors hover:bg-orange-400 hover:text-black ${activeLetter === 'All'
                                    ? 'bg-orangegold text-black'
                                    : 'bg-white text-black'
                                    }`}
                            >
                                All
                            </a>
                            {LETTERS.map((letter) => (
                                <a
                                    key={letter}
                                    href={`#${letter.toLowerCase()}`}
                                    onClick={() => setActiveLetter(letter)}
                                    className={`rounded-full w-6 h-6 flex items-center justify-center font-medium transition-colors hover:bg-orange-400 hover:text-black ${activeLetter === letter
                                        ? 'bg-orangegold text-black'
                                        : 'bg-white text-black'
                                        }`}
                                >
                                    {letter}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-1 rounded-md md:rounded-full border border-white px-2 py-1.5">
                            {DIGITS.map((d) => (
                                <a
                                    key={d}
                                    href={`#${d.toString().toLowerCase()}`}
                                    onClick={() => setActiveLetter(d.toString())}
                                    className={`rounded-full w-6 h-6 flex items-center justify-center font-medium transition-colors hover:bg-orange-400 hover:text-black pt-[2px] ${activeLetter === d.toString()
                                        ? 'bg-orangegold text-black'
                                        : 'bg-white text-black'
                                        }`}
                                >
                                    {d}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="lg:px-6 sm:px-10 py-10 flex flex-col gap-4 lg:gap-6">
                    {data?.glossary_list?.map((item: any, index: number) => (
                        <div className="card scroll-mt-24" key={index} id={item?.letter.toString().toLowerCase()}>
                            <Link href={`/glossary/${item?.letter.toString().toLowerCase()}`}><h2 className="xl:text-4xl font-bold text-black"> {item?.letter}. </h2></Link>
                            <div className="border-t border-gray-300 my-4" />
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-6 gap-y-2 font-sans text-black leading-relaxed">
                                {item?.data?.map((data: any, index: number) => (
                                    <p className="font-normal mb-0" key={index}>
                                        <Link className="text-black hover:text-underline" href={data.url}>{data.title}</Link>
                                    </p>
                                ))}
                            </div>
                            {item?.data?.length > 5 && (
                                <div className="moreinfo my-3 text-right text-blue underline hover:text-orange-400 hover:no-underline"><Link href={`/glossary/${item?.letter.toString().toLowerCase()}`} className="text-black hover:text-underline"> See complete list here</Link></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GlossaryFilter
