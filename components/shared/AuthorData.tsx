import Link from "next/link";
import Image from "next/image";

interface AuthorDataProps {
    data: {
        name: string;
        profile_picture?: string;
        author: string;
    };
    published_date?: string;
}

const AuthorData = ({ data, published_date }: AuthorDataProps) => {
    return (
        <>
            {data?.author && (
                <div className="aurtherintro">
                    <div className="container">
                        <div className="aurtherintro_box">
                            <div className="bg-white rounded-lg flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <Link href={'/author/' + data?.author}>
                                        <Image
                                            src={data.profile_picture || ''}
                                            alt={data.name || ''}
                                            width={20}
                                            height={20}
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                            title={data.name}
                                        />
                                    </Link>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2">
                                        <Link href={'/author/' + data.author}><span className="text-lg sm:text-xl font-bold text-gray-900 hover:text-amber-500 transition-colors">{data.name}</span></Link>
                                        <div className="text-base sm:text-lg text-gray-700">{published_date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default AuthorData;