import Link from 'next/link';

const DistributorList = ({ data }) => {
  return (
    <div className="disctclnd_listbox grid gap16">
      {data.map((item, index) => {
        return (
          <div className="disctclnd_listitem" key={index}>
            <Link href={item.link.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
              <figure className="pvrlogo">
                <img src={item.img} alt="" className="" />
              </figure>
              <h6>{item.name}</h6>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DistributorList;
