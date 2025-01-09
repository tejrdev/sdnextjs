import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
var    CryptoJS = require("crypto-js");
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
const useLoginCheck = () => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        var LOGGED_EMAIL   = localStorage.getItem('email');
        var enc_login      =localStorage.getItem('enc_email');
        var ENC_EMAILCHECK ='';
        if(enc_login !=='' && enc_login !== null)
        {
          var bytes = CryptoJS.AES.decrypt(enc_login, ENCT_KEY);
          var ENC_EMAILCHECK = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
    }

    useEffect(() => {
        if (LOGGED_EMAIL !== ENC_EMAILCHECK) {
//
            router.push('/');
        }
    }, [])
}
export default useLoginCheck;