import {useState , useEffect } from "react";


import Link from 'next/link';
const Unlockinside = () => {
   const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
   setLink(localStorage.getItem('type_link'));
   setEmail(localStorage.getItem('email'));
 }, []);
  return (
   <div className='instrial'>
   <h6>Instantly unlock insider information on upcoming movie releases...</h6>
   {link !== 'pro' && (
     <Link href='/pro/signup/' className='btn uppercase'>
       start your free trial
     </Link>
   )}
 </div>
  )
}

export default Unlockinside