import React, { useState } from 'react'
import style from './INavbar.module.css'
import { Link } from 'react-router';

const INavbar = () => {
    
  const [open, setOpen] = useState(false);
  return (
    <div>
 <nav className={style.invnavbar}>
      <div className={style.left}>
        <h2 className={style.title}>Inventory Dashboard</h2>
      </div>

      <div className={style.right}>
        <span className={style.welcome}>Welcome, Inventory Manager</span>

        <div
          className={style.profile}
          onClick={() => setOpen(!open)}
        >
          <img
            src="/profile.png"
            alt="profile"
            className={style.avatar}
          />
          <span className={style.name}>Manager</span>

          {/* Dropdown */}
          {open && (
            <div className={style.dropdown}>
              <Link to='/inventory/imyprofile' className={style.button}>My Profile</Link>
              <Link className={style.button}>Edit Profile</Link>
              <Link className={style.logout}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default INavbar