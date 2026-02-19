import React from 'react'
import { useState } from 'react';
import style from './RNavbar.module.css'

const RNavbar = () => {
    const [open, setOpen] = useState(false);
  return (
    <div><nav className={style.repnavbar}>
      <div className={style.left}>
        <h2 className={style.title}>Representative Dashboard</h2>
      </div>

      <div className={style.right}>
        <span className={style.welcome}>Welcome, Representative</span>

        <div
          className={style.profile}
          onClick={() => setOpen(!open)}
        >
          <img
            src="/profile.png"
            alt="profile"
            className={style.avatar}
          />
          <span className={style.name}>Rep Name</span>

          {open && (
            <div className={style.dropdown}>
              <button>My Profile</button>
              <button>Edit Profile</button>
              <button className={style.logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav></div>
  )
}

export default RNavbar