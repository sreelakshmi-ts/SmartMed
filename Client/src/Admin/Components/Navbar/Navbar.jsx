import React, { useState } from 'react'
import style from './Navbar.module.css'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

  
    useEffect(() => {
      const name = sessionStorage.getItem('adminName');
      if (name) {
        setUsername(name);
        setAvatar(name.charAt(0).toUpperCase()); // first letter
      }
    }, []);

  const logout = () => {
    sessionStorage.clear('aid');   
    navigate('/guest/login');
  };

  return (
    <nav className={style.adminnavbar}>

      {/* Left */}
      <div className={style.navleft}>
        <h4 className={style.pagetitle}>Admin Dashboard</h4>
      </div>

      {/* Right */}
      <div className={style.navright}>

        <div
          className={style.admininfo}
          onClick={() => setOpen(!open)}
        >
          <span className={style.adminname}>{username}</span>
          <div className={style.avatar}>{avatar}</div>
        </div>

        {/* Dropdown */}
        {open && (
          <div className={style.dropdown}>
            <div
              className={style.logout}
              onClick={logout}
            >
              Logout
            </div>
          </div>
        )}

      </div>

    </nav>
  )
}

export default Navbar