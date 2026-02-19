import { AccountCircleOutlined, LogoutOutlined, NotificationsNoneOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router'
import style from './DNavbar.module.css'

const DNavbar = () => {
  const [open, setOpen] = useState(false);
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
            <AccountCircleOutlined className={style.avatar} />
            <span>Delivery Team</span>
          </div>

          {open && (
            <div className={style.dropdown}>
              <Link to="/deliveryteam/dmyprofile">
                <PersonOutlineOutlined /> My Profile
              </Link>
              <Link to="/logout" className={style.logout}>
                <LogoutOutlined /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default DNavbar