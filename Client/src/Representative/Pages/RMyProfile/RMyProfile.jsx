import React, { useState } from 'react'
import style from './RMyprofile.module.css'
import { EditOutlined } from '@mui/icons-material'
import { useEffect } from 'react';
import axios from 'axios';

const RMyProfile = () => {
  const[profile,setProfile]=useState([]);

    useEffect(() => {
    const repId = sessionStorage.getItem('rid');
    if (!repId) return;
    axios.get(`http://localhost:5000/Representative/${repId}`)
    .then(res => setProfile(res.data.data))
    .catch(console.error);
}, []);
if (!profile) return <div>Loading...</div>;
  return (
    <div className={style.profilePage}>
      <div className={style.profileCard}>
        {/* Header */}
        <div className={style.header}>
          <img
            src={`http://localhost:5000${profile.repPhoto}`}
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
            <p>{profile.repName}</p>
          </div>

          <div>
            <span>Email</span>
            <p>{profile.repEmail}</p>
          </div>

          <div>
            <span>Phone</span>
            <p>{profile.repContact}</p>
          </div>

          <div>
            <span>Location</span>
            <p>{profile.placeName ||"Unknown"},{profile.districtName || "Unknown"}</p>
          </div>

          <div>
            <span>Employee ID</span>
            <p>{profile.repEmpId}</p>
          </div>

          {/* <div>
            <span>Account Status</span>
            <p className={style.active}>Active</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default RMyProfile