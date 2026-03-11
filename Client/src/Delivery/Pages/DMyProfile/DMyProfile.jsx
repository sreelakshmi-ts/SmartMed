import React from 'react'
import style from './DMyProfile.module.css'
import { Link } from 'react-router'
import { EditOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const DMyProfile = () => {
  const[profile,setProfile]=useState([]);
    useEffect(() => {
    const deliveryId = sessionStorage.getItem('did');
    if (!deliveryId) return;
    axios.get(`http://localhost:5000/Delivery/${deliveryId}`)
    .then(res => setProfile(res.data.data))
    .catch(console.error);
}, []);
if (!profile) return <div>Loading...</div>;
  return (
    <div className={style.profilePage}>
  <div className={style.profileCard}>

    {/* Header */}
    <div className={style.header}>
      <div>
        <h2>My Profile</h2>
        <p className={style.subtitle}>
          View your personal details
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
        <span>{profile.deliverName}</span>
      </div>

      <div className={style.field}>
        <label>Email</label>
        <span>{profile.deliverEmail}</span>
      </div>

      <div className={style.field}>
        <label>Phone Number</label>
        <span>{profile.deliverContact}</span>
      </div>


      <div className={style.field}>
        <label>Location</label>
        <span>{profile.placeName ||"Unknown"},{profile.districtName || "Unknown"}</span>
      </div>

      {/* <div className={style.field}>
        <label>Status</label>
        <span className={style.active}>Active</span>
      </div> */}
    </div>

  </div>
</div>
  )
}

export default DMyProfile