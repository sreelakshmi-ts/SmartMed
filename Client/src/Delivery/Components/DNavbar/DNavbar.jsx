import { AccountCircleOutlined, LogoutOutlined, NotificationsNoneOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router'
import style from './DNavbar.module.css'
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


const DNavbar = () => {
  const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
      const [avatar, setAvatar] = useState('');
   const navigate = useNavigate();
    
      useEffect(() => {
        const name = sessionStorage.getItem('deliverName');
        if (name) {
          setUsername(name);
          setAvatar(name.charAt(0).toUpperCase()); // first letter
        }
      }, []);

    const logout = () =>{
    sessionStorage.removeItem('did');
    navigate('/guest/login')
  }
  
  return (
     <nav className={style.navbar}>
      {/* Left */}
      <div className={style.left}>
        <h3>Delivery Dashboard</h3>
      </div>

      {/* Right */}
      <div className={style.right}>
        <NotificationsNoneOutlined className={style.icon} />

        <div className={style.profileWrapper}>
          <div
            className={style.profile}
            onClick={() => setOpen(!open)}
          >
            <div className={style.avatar}>{avatar}</div>
            <span>{username}</span>
          </div>

          {open && (
            <div className={style.dropdown}>
              <Link to="/deliveryteam/dmyprofile">
                <PersonOutlineOutlined /> My Profile
              </Link>

              <Button  className={style.logout} onClick={logout}><LogoutOutlined />LogOut</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default DNavbar