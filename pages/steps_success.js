import {  useEffect } from 'react';
import { useRouter } from 'next/router';
const SUCCESS_MESSAGE    ="Please wait ...While we are redirecting you to profile page";


const stepsSuccess = ()=>{
    const router =useRouter();
    useEffect(()=>{setTimeout(()=>{ router.push('/profile');},2000)},[]);

   return (<>{SUCCESS_MESSAGE}</>)
}

export default stepsSuccess;
