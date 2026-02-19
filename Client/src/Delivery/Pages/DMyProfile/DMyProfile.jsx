import React from 'react'
import style from './DMyProfile.module.css'
import { Link } from 'react-router'
import { EditOutlined } from '@mui/icons-material'

const DMyProfile = () => {
  return (
    <div className={style.profilePage}>
  <div className={style.profileCard}>

    {/* Header */}
    <div className={style.header}>
      <div>
        <h2>My Profile</h2>
        <p className={style.subtitle}>
          View your personal and delivery details
        </p>
      </div>

      {/* Edit Icon */}
      <Link className={style.editIconBtn}>
        <EditOutlined />
        <span>Edit</span>
      </Link>
    </div>

    {/* Profile Info */}
    <div className={style.profileGrid}>
      <div className={style.field}>
        <label>Full Name</label>
        <span>Delivery Team Member</span>
      </div>

      <div className={style.field}>
        <label>Email</label>
        <span>delivery@smartmed.com</span>
      </div>

      <div className={style.field}>
        <label>Phone Number</label>
        <span>+91 XXXXX XXXXX</span>
      </div>

      <div className={style.field}>
        <label>Vehicle Type</label>
        <span>Two-Wheeler</span>
      </div>

      <div className={style.field}>
        <label>Assigned Area</label>
        <span>Central Zone</span>
      </div>

      <div className={style.field}>
        <label>Status</label>
        <span className={style.active}>Active</span>
      </div>
    </div>

  </div>
</div>
  )
}

export default DMyProfile