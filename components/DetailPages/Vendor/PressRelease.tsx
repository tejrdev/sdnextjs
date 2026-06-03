import Link from 'next/link';
import Image from 'next/image';

interface PressReleaseItem {
    title: string;
    img_url: string;
    link?: string;
}

interface PressReleaseProps {
    data: PressReleaseItem[];
}

const PressRelease = ({ data }: PressReleaseProps) => {
    return (
        <>
            {data && (
                <section className='productservice dlsecspace toplinesec'>
                    <div className='container'>
                        <div className='top_txt df fww just-between'>
                            <h2>
                                Press Release <i className='fal fa-angle-right'></i>
                            </h2>
                        </div>
                        <div className='proservices_Box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                            {data?.map((item, index) => {
                                return (
                                    <div className='proservices_items border border-gray-300 rounded-lg relative w-full flex flex-col' key={index} style={{ height: '100%' }}>
                                        <Link href={item.link || '#'} title={item.title} className='flex flex-col h-full'>
                                            <figure className='pvr pb-[68%] w-full flex-shrink-0 relative overflow-hidden'>
                                                <Image src={item.img_url} width='390' height='550' alt={item.title || ''} className='objctimg_box absolute inset-0 w-full h-full object-cover' />
                                            </figure>

                                            <h4 className='p-4 text-black mb-0 flex-grow flex items-center min-h-[80px]'>{item.title}</h4>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default PressRelease;
