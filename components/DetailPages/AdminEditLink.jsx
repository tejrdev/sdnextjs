import { useEffect, useState } from 'react';

const AdminEditLink = ({ data }) => {
  const admin_emails = process.env.NEXT_PUBLIC_ADMIN_EMAILS;
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
        <div className='admin_edit_link printdochide'>
          <a href={data.edit_link} target='_blank' rel='noreferrer' className='btn'>
            Edit Information
          </a>
        </div>
      )}
    </>
  );
};

export default AdminEditLink;
