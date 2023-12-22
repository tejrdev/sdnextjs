import Featurebox from "@/components/MovieLists/Featurebox"
import FranchiseSider from "@/components/MovieLists/FranchiseSider"
import MovieAdminsec from "@/components/MovieLists/MovieAdminsec"
import { TfiReload } from "react-icons/tfi";

const Ui = () => {
  return (
    <>
    <p> ===# Top Movies admin Page  </p>
    <div className="topMovieadmin secspace">
      <div className="container">
        <h1>All Time Movies Review <span className="reloadico" onClick={() => window.location.reload()}><TfiReload /></span></h1>
        <div className="addcollactioninfo">
            <form action="" className="df fww">
              <div className='fromgroup'>
                <label htmlFor="">Collection Name</label>
                <input type='text' placeholder='Enter Name' />
              </div>
              <div className='submitbtn'>
                <input type='button' value='add collection' className=' ghostbtn goldbtn uppercase' />
              </div>
              <p className="redtxt w100" hidden>Enter Collaction name</p>
              <p className="greentxt w100" hidden>Collaction Added To Bottom</p>
          </form>
        </div>
      </div>
      <MovieAdminsec sectitle={'Featured'} cls={'featuredbg'}/>
      <MovieAdminsec sectitle={'Franchise Movies'}/>
      <MovieAdminsec sectitle={'Directors Specific'}/>
    </div>
    <p> ===# Top Movies Page  </p>
    <div className="movieList secspace">
      <div className="container"><h1>All Time Movies</h1></div>
      <Featurebox />
      <FranchiseSider sliderTitle={'Franchise Movies'}/>
      <FranchiseSider sliderTitle={'Directors Specific'}/>
    </div>
    
    </>
  )
}

export default Ui