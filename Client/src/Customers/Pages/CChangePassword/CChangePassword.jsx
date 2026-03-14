import React from 'react'
import style from "./CChangePassword.module.css";
import LockResetIcon from '@mui/icons-material/LockReset';
import { useState } from 'react';
import axios from 'axios';


const CChangePassword = () => {
   const cid = sessionStorage.getItem('cid');
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confPwd, setConfPwd] = useState('');

    const handleChange = () => {
        if (newPwd !== confPwd) return alert('New passwords do not match');
        axios.put(`http://localhost:5000/MedCustomerPassword/${cid}`, { oldPassword: oldPwd, newPassword: newPwd })
            .then(res => {
                alert(res.data.message);
                setOldPwd(''); setNewPwd(''); setConfPwd('');
            })
            .catch(() => alert('Update failed'));
    };
  return (
    <div className={style.page}>

      <div className={style.card}>

        <div className={style.header}>
          <LockResetIcon className={style.icon} />
          <h2>Change Password</h2>
          <p>Update your account password securely</p>
        </div>

        <form className={style.form}>

          <div className={style.inputGroup}>
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" value={oldPwd} onChange={e => setOldPwd(e.target.value)}/>
          </div>

          <div className={style.inputGroup}>
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
          </div>

          <div className={style.inputGroup}>
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm new password" value={confPwd} onChange={e => setConfPwd(e.target.value)}/>
          </div>

          <button type="button" className={style.updateBtn} onClick={handleChange}>
            Update Password
          </button>

        </form>

      </div>

    </div>
  )
}

export default CChangePassword