import { useRouter } from 'next/router';

const ClearFilters = ({ AllChangeEvent }) => {
  const router = useRouter();
  const handleOnAllChange = () => {
    AllChangeEvent();

    router.replace(
      {
        query: '',
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  return (
    <div className='top_txt df fww just-between'>
      <h4>Filter</h4>
      {/* <button className='allselectbtn active' id='distributor_allselect' name='distributor_allselect' value='' onClick={handleOnAllChange}>
        Clear All
      </button> */}
    </div>
  );
};

export default ClearFilters;
