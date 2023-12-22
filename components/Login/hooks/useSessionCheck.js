import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useSessionCheck = () => {
    const LOGGED_EMAIL = localStorage.getItem('email');
    const navigate = useNavigate();
    useEffect(() => {
        if (!LOGGED_EMAIL) {
            navigate('/');
        }
    }, [])

}

export default useSessionCheck;