import Link from 'next/link';

const DistributorSearch = ({ text, requestfrom, backlink }) => {
  return (
    <div className="distsrch">
      {requestfrom === 'distributordetail' ? (
        <div className="backarow">
          <Link href={backlink.replace(process.env.NEXT_PUBLIC_MENU_URL1, '')}>
            <i className="fas fa-long-arrow-left"></i> Back
          </Link>
        </div>
      ) : null}

      <div className="distsrchbox df fww">
        <div className="findinput df fww">
          <input type="hidden" id="page_link_search" name="page_link_search" vaule="/by-distributors/" />
          <input type="input" id="f_film_search" name="" placeholder="Search Your Favourite Distributor " tabIndex="0" />
        </div>
        <button type="submit">
          <i className="far fa-search"></i>
        </button>
      </div>
      <div className="distsrchbox_listing" style={{ display: 'none' }}></div>
      <p className="greytxt text-center">{text}</p>
    </div>
  );
};

export default DistributorSearch;
