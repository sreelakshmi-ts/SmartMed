import React, { useEffect, useState } from 'react'
import style from './CMyprofile.module.css'
import { EditOutlined } from '@mui/icons-material'
import axios from 'axios';

const CMyprofile = () => {
  const[profile,setProfile]=useState(null);

   useEffect(() => {
        const cid = sessionStorage.getItem('cid');
        if (!cid) return;
        axios.get(`http://localhost:5000/Customer/${cid}`)
        
             .then(res => setProfile(res.data.data)
           
            )
             .catch(console.error);
    }, []);

     if (!profile) return <div>Loading...</div>;

  return (
    <div className={style.profilePage}>
      <div className={style.profileCard}>
        <div className={style.header}>
          {/* <img
            src="/profile.png"
            alt="Customer"
            className={style.avatar}
          /> */}
          <div className={style.headerInfo}>
            <h2>{profile.customerStoreName} </h2>
            <p>Registered Customer</p>
          </div>

          <button className={style.editBtn}>
            <EditOutlined  fontSize="small" />
            Edit Profile
          </button>
        </div>

        <div className={style.details}>
          <div>
            <span>Owner Name</span>
            <p>{profile.ownerName}</p>
          </div>

          <div>
            <span>Email</span>
            <p>  {profile.customerEmail} </p>
          </div>

          <div>
            <span>Phone</span>
            <p> {profile.customerContact} </p>
          </div>

          <div>
            <span>Location</span>
            <p>{profile.placeName ||"Unknown"},{profile.districtName || "Unknown"}</p>
          </div>

          <div>
            <span>Registration Number</span>
            <p>{profile.customerStoreRegNo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CMyprofile