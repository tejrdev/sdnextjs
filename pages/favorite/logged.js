import React,{useEffect} from 'react';
import FavLogin from '../login/favLogin';
import { checkLocalStorageVariable } from "../../components/Login/localStorageUtil";
 var loginCheck     ='';
if (typeof window !== 'undefined') {
  const userLoggedIn   = checkLocalStorageVariable("email");
		const enc_login      = checkLocalStorageVariable('enc_email');
		if (!userLoggedIn && !enc_login ) {
            loginCheck ='FavLogin';
		}
}

const Logged = () =>{
return ( <>{ (loginCheck ==='FavLogin'  )? (
       <div className="staticfavsec"><FavLogin /></div>
        ) :('') }</>)

}
export default Logged;