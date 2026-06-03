import Link from "next/link";
import Image from "next/image";

interface PressReleaseItemProps {
    item: {
        title: string;
        img: string;
        links: string;
        location: string;
        date: string;
        press_links: {
            link: string;
            title: string;
        }
    }
}
const PressReleaseItem = ({ item }: PressReleaseItemProps) => {
    return (
        <div
            className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 p-6 w-full"
        >
            <article
                className="text-gray-900 group-hover:text-blue 
                                    transition-colors  flex flex-wrap gap-4 items-start"
            >
                {item.img && <div className={`pressmedia-box ${item.img ? 'mb-4 w-[150px] h-[100px]' : ''}`}>
                    <Link href={item.links}><Image src={item.img} alt={item.title} width={150} height={100} className="w-full object-cover rounded-md mb-4 cursor-pointer" loading="lazy" /></Link>
                </div>}
                <div className="pressmedia-content md:w-[calc(100%-166px)]">
                    <h2 className="font-bold text-lg leading-snug mb-3 cursor-pointer">
                        <Link href={item.links}>{item.title}</Link>
                    </h2>
                    <p className="text-base text-gray-500">
                        <span className="font-medium">{item.location}</span>
                        {item.location && item.press_links?.link && <span className="mx-2">·</span>}
                        <span><Link href={item.press_links?.link} className="cursor-pointer text-black hover:text-blue">{item.press_links?.title}</Link></span>
                    </p>
                    <p className="text-base text-gray-500">{item.date}</p>
                </div>

            </article>
        </div>
    )
}

export default PressReleaseItem;