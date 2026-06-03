import { useState } from 'react';
import tometo from '@/public/images/tometoico.svg';
import imdb from '@/public/images/imdbico.svg';
import Link from 'next/link';


const MovieBanner = ({ data }) => {
    const [isMuted, setIsMuted] = useState(true)
    const [videoi, setVideoi] = useState(0);
        /*console.log(data)*/

        function youtube_parser(url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return match && match[7].length == 11 ? match[7] : false;
          }

        const youtubeVideoId = youtube_parser(data[videoi].video)
        /*console.log(data[videoi].video)*/
    // YouTube video ID - this is dynamic based on your data
    //const youtubeVideoId = "3RJji9-qoNU"
    
    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    // Generate YouTube iframe URL with autoplay and mute parameters
    const getYouTubeUrl = () => {
        const baseUrl = `https://www.youtube.com/embed/${youtubeVideoId}?si=LvfrHw4isP3JFHSG`
        const params = new URLSearchParams({
            autoplay: '1',
            mute: isMuted ? '1' : '0',
            loop: '1',
            playlist: youtubeVideoId, // Required for loop to work
            controls: '0',
            rel: '0', // Don't show related videos
            modestbranding: '1' // Minimal YouTube branding
        })
        return `${baseUrl}&${params.toString()}`
    }

    return (
        <section className='upmoviebnr my-5'>
            <div className="container container2">
                <div className="bnrinfo">
                    <div className="md:aspect-[16/9] bg-gray-800 md:flex items-center justify-center relative">
                        {/* <figure className='relative w-full h-full border border-gray-600 rounded-md'>
                     <img src={'https://picsum.photos/1200/575'} className='object-cover absolute size-full rounded-md z-0' alt='publication_image' loading='lazy' />
                  </figure> */}                         

                        <iframe 
                            key={`youtube-${isMuted}`} // Force re-render when mute state changes
                            src={getYouTubeUrl()} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className='object-cover md:absolute size-full rounded-md z-0 aspect-[16/9] '
                        ></iframe>

                        {/* <video
                            ref={videoRef}
                            key={videoi} // Force re-render when videoi changes
                            className='object-cover md:absolute size-full rounded-md z-0'
                            poster={data[videoi].landscape_image}
                            preload="metadata"
                            loop
                            muted
                            autoPlay
                        >
                            {data[videoi].video &&
                                <source src={data[videoi].video} type="video/mp4" />
                            }
                            {/* <source src="/videos/movie-trailer.webm" type="video/webm" /> */}
                            {/* Your browser does not support the video tag. }
                        </video> */}

                        <div className="upmoviebnritem  bg-black/50 h-full md:absolute size-full rounded-md z-10">
                            <div className="upmoviebnritembox md:absolute bottom-0 left-0 w-full flex flex-wrap items-end justify-between z-10 text-white py-2 px-5">
                                <div className="bnrinfo w-full lg:w-auto">
                                    
                                    <h2 className='mb-4'><Link href={data[videoi].link} className='text-white hover:text-gold focus:text-gold'>{data[videoi].title}</Link></h2>
                                    <div className="flex flex-wrap mb-2">
                                        {data[videoi]?.rating &&
                                            <div className="rounded border border-gray-100 px-2 mr-4 mb-1">{data[videoi].rating}</div>
                                        }
                                        {data[videoi]?.runtime &&
                                            <time className='mr-2 mb-1'>{data[videoi].runtime}</time>
                                        }
                                        {data[videoi]?.genre &&
                                            <div className="bnrgenre">
                                                {data[videoi]?.genre}
                                            </div>
                                        }
                                    </div>
                                    <div className="mvbnrratings flex flex-wrap ">
                                        {data[videoi]?.rotten_critics_score &&
                                            <div className='flex flex-wrap items-center mr-6 mb-4'>
                                                <img src={tometo.src} alt="ratings" className='mr-2' />{data[videoi]?.rotten_critics_score}
                                            </div>
                                        }
                                        {data[videoi]?.imdbrating &&
                                            <div className="flex flex-wrap items-center mb-4">
                                                <img src={imdb.src} alt="ratings" className='mr-2 w-11' />{data[videoi]?.imdbrating}
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="bnrthumb flex flex-wrap gap-2 w-full lg:w-auto pr-9 lg:pr-0 mb-2">
                                    {data?.map((video, index: number) => (
                                        <figure key={index} className={'relative w-16 md:w-24 pb-8 md:pb-12  rounded-md cursor-pointer' +
                                            (videoi === index ? ' border-2 border-yellow-300' : ' border border-gray-600')}
                                            onClick={() => setVideoi(index)}>
                                            <img src={video.landscape_image ? video.landscape_image : video.poster_img} className='object-cover absolute size-full rounded-md z-0' alt={video.title} loading='lazy' />
                                        </figure>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* Custom Mute/Unmute Button */}
                        <button
                            onClick={toggleMute}
                            className="absolute bottom-20 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-20"
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                        >
                            {isMuted ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default MovieBanner