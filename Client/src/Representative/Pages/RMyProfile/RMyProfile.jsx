import React from 'react'
import style from './RMyprofile.module.css'
import { EditOutlined } from '@mui/icons-material'

const RMyProfile = () => {
  return (
    <div className={style.profilePage}>
      <div className={style.profileCard}>
        {/* Header */}
        <div className={style.header}>
          <img
            src="/profile.png"
            alt="Representative"
            className={style.avatar}
          />

          <div className={style.headerInfo}>
            <h2>Medical Representative</h2>
            <p className={style.role}>SmartMed Representative</p>
          </div>

          <button className={style.editBtn}>
            <EditOutlined  fontSize="small" />
            Edit Profile
          </button>
        </div>

        {/* Details */}
        <div className={style.details}>
          <div>
            <span>Full Name</span>
            <p>Anjali Menon</p>
          </div>

          <div>
            <span>Email</span>
            <p>rep@smartmed.com</p>
          </div>

          <div>
            <span>Phone</span>
            <p>9876543210</p>
          </div>

          <div>
            <span>Assigned Area</span>
            <p>Ernakulam District</p>
          </div>

          <div>
            <span>Employee ID</span>
            <p>REP-3051</p>
          </div>

          <div>
            <span>Account Status</span>
            <p className={style.active}>Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RMyProfile