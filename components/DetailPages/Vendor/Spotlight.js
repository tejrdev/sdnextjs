import Link from 'next/link';
import Image from 'next/image';

const Spotlight = ({ data }) => {
  return (
    <>
      {data && (
        <section className='productservice dlsecspace toplinesec'>
          <div className='container'>
            <div className='top_txt df fww just-between'>
              <h2>
                Spotlight <i className='fal fa-angle-right'></i>
              </h2>
            </div>
            <div className='proservices_Box flex flex-wrap gap-4'>
              {data?.map((item, index) => {
                return (
                  <div className='proservices_items border border-gray-300 rounded-lg relative max-w-96 min-w-64' key={index}>
                    <Link href={item.link} title={item.title}>
                      <figure className='pvr pb-[68%]'>
                        <Image src={item.img_url} width='390' height='550' alt='' className='objctimg_box' />
                      </figure>

                      <h4 className='p-4 text-black mb-0'>{item.title}</h4>
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

export default Spotlight;
