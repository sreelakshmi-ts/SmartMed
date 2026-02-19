import { EditOutlined } from '@mui/icons-material'
import React, { useEffect } from 'react'
import style from './IMyprofile.module.css'
import { useState } from 'react';
import axios from 'axios';

const IMyprofile = () => {
   const[profile,setProfile]=useState(null);
  
     useEffect(() => {
          const mid = sessionStorage.getItem('mid');
          if (!mid) return;
          axios.get(`http://localhost:5000/InvetoryManager/${mid}`)
          
               .then(res => setProfile(res.data.data)
             
              )
               .catch(console.error);
      }, []);
  
       if (!profile) return <div>Loading...</div>;
  return (
     <div className={style.profilePage}>
      <div className={style.profileCard}>
        {/* Header */}
        <div className={style.header}>
          <img
             src={`http://localhost:5000${profile.inManagerPhoto}`}
            alt="Inventory Manager"
            className={style.avatar}
          />

          <div className={style.headerInfo}>
            <h2>Inventory Manager</h2>
            <p className={style.role}></p>
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
            <p>{profile.inManagerName}</p>
          </div>

          <div>
            <span>Email</span>
            <p>{profile.inManagerEmail} </p>
          </div>

          <div>
            <span>Phone</span>
            <p>{profile.inManagerContact} </p>
          </div>

          <div>
            <span>Assigned Warehouse</span>
            <p>{profile.ManagerWarehouseName} </p>
          </div>

          <div>
            <span>Employee ID</span>
            <p>{profile.inMangerEmpId} </p>
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

export default IMyprofile