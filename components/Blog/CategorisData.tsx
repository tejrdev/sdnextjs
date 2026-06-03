import Link from "next/link";
import Image from "next/image";

const CategorisData = ({ data }: { data: any }) => {
    return (
        <section className="bloginfo sm:pb-8 pb-5">
            <div className="container">
                <div className="bloginfo_box">
                    <div className="bloginfo_boxbtm grid grid-cols-[repeat(auto-fit,minmax(295px,1fr))] gap-4 mb-4">
                        {data?.map((item: any, index: number) => {
                            if (index > 1) return null;
                            return (
                                <div className="bloginfo_item" key={index}>
                                    <div className="bg-white rounded-xl h-full">
                                        <div className="relative w-full aspect-[4/3] sm:aspect-[1.3/1] rounded-t-xl overflow-hidden p-1 bg-white">
                                            <Image src={item.img} alt={item.title} width={295} height={295} className="w-full h-full object-cover rounded-md" />
                                        </div>
                                        <div className="p-2 sm:p-4">
                                            <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                                                {item.date}  {item.read_time && <p className="text-sm flex items-center gap-2 mb-0">
                                                    <svg className="w-4 h-4 " fill="currentColor" stroke="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z" /></svg>
                                                    {item.read_time} </p>
                                                }
                                            </p>
                                            <Link href={item.link}><h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 leading-tight">
                                                {item.title}
                                            </h3></Link>
                                            <Link href={item.link}><button type="button" className="roundbtn px-6 py-3 min-w-40">
                                                Read Now
                                            </button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="bloginfo_boxbtm grid grid-cols-[repeat(auto-fit,minmax(295px,1fr))] gap-4">
                        {data?.map((item: any, index: number) => {
                            if (index < 2) return null;
                            return (
                                <div className="bloginfo_item" key={index}>
                                    <div className="bg-white rounded-xl">
                                        <div className="relative w-full aspect-[4/3] sm:aspect-[1.3/1] rounded-t-xl overflow-hidden p-1 bg-white">
                                            <Image src={item.img} alt={item.title} width={295} height={295} className="w-full h-full object-cover rounded-md" />
                                        </div>
                                        <div className="p-2 sm:p-4">
                                            <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                                                {item.date}  {item.read_time && <p className="text-sm flex items-center gap-2 mb-0">
                                                    <svg className="w-4 h-4 " fill="currentColor" stroke="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96 42.98 96 96 96 96-42.98 96-96zM233.59 241.1c-59.33-36.32-155.43-46.3-203.79-49.05C13.55 191.13 0 203.51 0 219.14v222.8c0 14.33 11.59 26.28 26.49 27.05 43.66 2.29 131.99 10.68 193.04 41.43 9.37 4.72 20.48-1.71 20.48-11.87V252.56c-.01-4.67-2.32-8.95-6.42-11.46zm248.61-49.05c-48.35 2.74-144.46 12.73-203.78 49.05-4.1 2.51-6.41 6.96-6.41 11.63v245.79c0 10.19 11.14 16.63 20.54 11.9 61.04-30.72 149.32-39.11 192.97-41.4 14.9-.78 26.49-12.73 26.49-27.06V219.14c-.01-15.63-13.56-28.01-29.81-27.09z" /></svg>
                                                    {item.read_time} </p>
                                                }
                                            </p>
                                            <Link href={item.link}><h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 leading-tight">
                                                {item.title}
                                            </h3></Link>
                                            <Link href={item.link}><button type="button" className="roundbtn px-6 py-3 min-w-40">
                                                Read Now
                                            </button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default CategorisData;