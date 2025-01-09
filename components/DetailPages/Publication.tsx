import Link from 'next/link';

interface publicationtype {
  data: [
    {
      'download_button_text': string;
      'download_files': string;
      'pdf_link': string;
      'select_date': string;
    }
  ];
}

const Publication = ({ data }: publicationtype) => {
  return (
    <section className='publication toplinesec'>
      <div className='container'>
        <div className='top_txt'>
          <h2>
            Publications <i className='fal fa-angle-right'></i>
          </h2>
        </div>
        <div className='cardsbox grid gap-4'>
          {data.map((item, i) => (
            <div className='card ' key={i}>
              <Link href={item.pdf_link !== '' ? item.pdf_link : '#'} target='_blank'>
                <figure className='relative w-full border border-gray-600 rounded-md pb-[140%]'>
                  <img src={'https://picsum.photos/295/412'} className='object-cover absolute size-full rounded-md' alt='publication_image' loading='lazy' />
                </figure>
                <h4 className='text-black text-center mt-2'>
                  {item.download_button_text} {item.select_date}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publication;
