import { useEffect, useState } from 'react';

const AdminEditLink = ({ data }) => {
  const admin_emails = ['contactus@screendollars.com', 'thaddeus@screendollars.com', 'tami@screendollars.com', 'nick@screendollars.com', 'mithun.r@mavlers.com', 'mithun.r@uplers.in', 'varun.s@mavlers.com', 'varun.s@uplers.in', 'pepono1069@dixiser.com'];
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const login_email = localStorage.getItem('email');
    if (admin_emails.indexOf(login_email) > -1) {
      setIsAdminUser(true);
    }
  }, []);
  return (
    <>
      {data.edit_link && isAdminUser && (
        <div className='admin_edit_link'>
          <a href={data.edit_link} target='_blank' rel='noreferrer' className='btn'>
            Edit Information 
          </a>
        </div>
      )}
    </>
  );
};

export default AdminEditLink;
