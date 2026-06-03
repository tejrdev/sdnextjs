import Link from 'next/link';


const UpcomingLists = ({ mvdata }) => {
    return (
        <div className={`upmvlistitem df fww w-full items-start`} >
            <Link className='inline-block relative pb-48 max-w-[130px] w-full mb-4' href={mvdata?.link || '#'}>
                <img src={mvdata?.poster_img} alt={mvdata?.title} className='objimg rounded-xl' />
            </Link>
            <div className={`weekposterinfo sm:pl-6 sm:w-[calc(100%-130px)] w-full`}>
                <div className='top_txtbox df fww'>
                    <h4 className='mb-0'> <Link href={mvdata?.link || '#'}>{mvdata?.title}</Link> </h4>
                    {mvdata?.pattern && (<label htmlFor='' className='uppercase'> {mvdata.pattern} </label>)}
                </div>
                <Link href={mvdata?.dis_link || '#'}>
                    <p className='bluetxt'>{mvdata?.dis_title}</p>
                </Link>
                {mvdata?.genre && (
                    <ul className='ml-0 mt-3 mb-0 list-none'>
                        {mvdata?.genre.split(',').map((item, i) => (
                            <li key={i} className='text-sm inline-block align-top mr-2 mb-2'>
                                <span className='hover:no-underline px-3 rounded-3xl text-black capitalize border border-gray-500 pb-[2px] hover:bg-gray-100 hover:text-black'>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <ul className='ratinginfo_tags ml-0 mb-3'>
                    {mvdata.rating && (<li> <span>{mvdata.rating}</span> </li>)}
                    {mvdata.runtime && <li>{mvdata.runtime}</li>}
                </ul>
                <p>{mvdata?.synopsis}</p>
            </div>
        </div>
    )
}

export default UpcomingLists