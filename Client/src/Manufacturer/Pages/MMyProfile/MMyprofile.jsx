import { EditDocument } from '@mui/icons-material'
import React from 'react'
import style from './MMyprofile.module.css'
import { Link } from 'react-router'

const MMyprofile = () => {
  return (
    <div className={style.profileContainer}>
      <div className={style.profileCard}>
        
        {/* Header */}
        <div className={style.header}>
          <div className={style.avatar}>
            M
          </div>
          <div className={style.headerText}>
            <h2>MedLife Pharma</h2>
            <span>Manufacturer</span>
          </div>

          <Link className={style.editBtn}>
           <EditOutlined /> Edit Profile
          </Link>
        </div>

        {/* Profile details */}
        <div className={style.details}>
          <div className={style.row}>
            <label>Company Name</label>
            <p>MedLife Pharma Pvt Ltd</p>
          </div>

          <div className={style.row}>
            <label>License Number</label>
            <p>LIC-987654321</p>
          </div>

          <div className={style.row}>
            <label>Email</label>
            <p>contact@medlifepharma.com</p>
          </div>

          <div className={style.row}>
            <label>Phone</label>
            <p>+91 98765 43210</p>
          </div>

          <div className={style.row}>
            <label>Address</label>
            <p>
              Industrial Estate, Phase-II <br />
              Kochi, Kerala – 682030
            </p>
          </div>

          <div className={style.row}>
            <label>Status</label>
            <span className={style.active}>Active</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MMyprofile