import Link from "next/link";
import aurtherimg from '@/public/images/auther.jpg'
import AdminEditLink from '@/components/DetailPages/AdminEditLink';
import ReadTimeIcon from "@/components/shared/ReadTimeIcon";
import HeadComponent from "@/components/HeadComponent";

const SocialMedia_author = ({ authorData }: { authorData: any }) => {
    return (
        <>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
                {/* X (Twitter) */}
                {/* <a href={authorData?.twitter} className="hover:text-amber-500 transition text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a> */}

                {/* Facebook */}
                {/* <a href={authorData?.facebook} className="hover:text-amber-500 transition text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a> */}

                {/* Instagram */}
                {/* <a href={authorData?.instagram} className="hover:text-amber-500 transition text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a> */}
                {/* email */}
                <a href={`mailto:${authorData?.user_email}`} className="hover:text-amber-500 transition text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                    </svg>
                </a>
                {/* LinkedIn */}
                <a href={authorData?.linkedin} className="hover:text-amber-500 transition text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                </a>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }: { params: { name: string } }) {
    const { name } = params;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const raw = `{"name": "${name}", "apikey" : "${process.env.NEXT_PUBLIC_PRIVATEAPI_TOKEN}"}`;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    const author = await fetch(`${process.env.NEXT_PUBLIC_SD_API}/author/author-detail.php`, requestOptions as RequestInit);
    const authorData = await author.json();
    return {
        props: { name, authorData },
        revalidate: 60,
    };
}

export default function Author({ name, authorData }: { name: string, authorData: any }) {
    return (
        <div>
            <HeadComponent meta_title={authorData?.data?.name} meta_description={authorData?.data?.about_author} canonical_url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/author/${name}/`} />
            <AdminEditLink data={authorData?.data} />
            <div className="author_header">
                <div className="flex items-center justify-between  text-white">
                    <div className="flex items-center gap-6 w-full">
                        <div className="w-full h-[150px] sm:h-[330px] relative">
                            <img src={authorData?.data?.bg_img ? authorData?.data?.bg_img : aurtherimg.src} alt="Author Name" className="w-full h-full object-cover absolute top-0 left-0 z-0" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="arthur_mediana bg-black">
                <div className="container">
                    <div className="flex flex-wrap sm:items-center justify-between  text-white sm:px-8 py-3 lg:py-0">
                        {/* Author Profile Image */}
                        <div className="flex sm:items-center gap-6 w-full sm:w-auto">
                            <div className=" h-32 w-32 sm:h-40 sm:w-40 lg:w-[300px] lg:h-[300px] flex-shrink-0 relative mt-0 lg:-mt-[140px]">
                                <figure className="size-full">
                                    <img
                                        src={authorData.data?.img}
                                        alt={authorData.data?.name}
                                        className="w-full h-full object-cover object-center lg:absolute lg:bottom-0 lg:left-0 rounded-full"
                                    />
                                </figure>
                            </div>

                            {/* Author Info */}
                            <div className="lg:flex md:gap-5 gap-2 items-center ">
                                <div className="flex flex-col">
                                    <h1 className="text-3xl font-bold text-amber-500 mb-0">{authorData?.data?.name}</h1>
                                    <p className="text-gray-300">{authorData.data?.designation && <>{authorData.data?.designation}</>} {authorData.data?.organization && <> at {authorData.data?.organization}</>}</p>
                                </div>
                                <div className="block mb-4 md:hidden">
                                    <SocialMedia_author authorData={authorData?.data} />
                                </div>
                                {/* <div className="mb-2">
                                    <a href={`mailto:${authorData.data?.user_email}`} className="bg-white text-black px-6 py-1 rounded-full font-medium hover:bg-gray-200 transition ">
                                        Email Author
                                    </a>
                                </div> */}
                            </div>
                        </div>

                        {/* Email Button and Social Icons */}
                        <div className=" items-center gap-8 ml-1 mt-4 sm:mt-0 w-full sm:w-auto hidden md:flex">
                            <SocialMedia_author authorData={authorData?.data} />
                        </div>
                    </div>
                </div>
            </div>
            {
                authorData.data?.about_author && (
                    <div className="ar_about bg-neutral-200 py-6 md:py-10 ">
                        <div className="container">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h2>About Author</h2>
                                    <p>{authorData.data?.about_author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                authorData.data?.blogs?.length > 0 && (
                    <div className="ar_articles py-6 md:py-10">
                        <div className="container">
                            <div className="top_txt">
                                <h2>Articles by Author</h2>
                            </div>
                            <div className="ar_articlesitems flex flex-wrap justify-between gap-4">
                                {authorData.data?.blogs?.map((article: any, index: number) => (

                                    <div key={index} className="ar_articlesitem bg-white rounded-xl border border-gray-200 flex flex-wrap relative w-full lg:w-[calc(50%-0.5rem)] pl-1 pt-1">
                                        <figure className="pvr w-full sm:w-1/2">
                                            <img src={article.img_url} alt={article.title} className="object-cover object-top md:object-center md:absolute left-0 w-full h-full max-h-[400px] lg:w-[275px] lg:h-[200px]" width={275} height={200} />
                                        </figure>
                                        <div className="cardtext w-full sm:w-1/2 px-3 py-3 sm:min-h-52">
                                            <div className="flex items-center gap-8">
                                                <p className="graytxt">{article.date} </p>
                                                {article.read_time && <p className="text-sm flex items-center">
                                                    <ReadTimeIcon width={16} height={16} /> &nbsp;
                                                    {article.read_time}
                                                </p>}
                                            </div>
                                            <h3 className="text-lg font-bold mb-2">{article.title}</h3>

                                            <Link href={article.link}>
                                                <button className="mt-3 w-full rounded-full border border-black px-6 py-1 text-base font-semibold text-black hover:bg-black hover:text-white transition-colors">
                                                    Read Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}