import React, { useState } from 'react'
import { Link } from 'react-router'
import style from './MNavbar.module.css'
import { AccountCircleOutlined, NotificationsNoneOutlined } from '@mui/icons-material'

const MNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={style.mnav}>
  {/* Left */}
  <div className={style.left}>
    <h3>Manufacturer Dashboard</h3>
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
        <span className={style.username}>Manufacturer</span>
      </div>

      {open && (
        <div className={style.dropdown}>
          <Link to="/manufactures/mmyprofile">My Profile</Link>
          <Link to="/manufactures/edit-profile">Edit Profile</Link>
          <Link to="/logout" className={style.logout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  </div>
</nav>

  )
}

export default MNavbar