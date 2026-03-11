import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import style from './CEditProfile.module.css'

const CEditProfile = () => {
    const cid=sessionStorage.getItem('cid');
    const [ownername,setOwnerName]=useState('');
    const[email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[address,setAddress]=useState('');
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/Customer/${cid}`).then(res => {
            const c = res.data.data;
            setOwnerName(c.ownerName);
            setEmail(c.customerEmail);
            setPhone(c.customerContact);
            setAddress(c.customerAddress);
           
        });
    }, [cid]);

    const handleSave=(e) =>{
        e.preventDefault(); 
        const data={
            ownerName:ownername,
            customerEmail:email,
            customerContact:phone,
            customerAddress:address,
        }
        axios.put(`http://localhost:5000/Customer/${cid}`,data)
            .then(() => alert('Profile updated'))
            .catch(() => alert('Update failed'));
        
            navigate('/customer/cmyprofile')
        
    }
  return (
        <div className={style.ProfilePage}>
    
          <div className={style.ProfileCard}>
    
            {/* HEADER */}
            <div className={style.Header}>
              <h2>Edit Profile</h2>
              <p>Update your personal information</p>
            </div>
    
    
            {/* FORM */}
            <form className={style.FormGrid}>
    
              <div className={style.FormGroup}>
                <label>Owner Name</label>
                <input type="text" placeholder="Enter name" value={ownername} onChange={e => setOwnerName(e.target.value)}/>
              </div>
    
              <div className={style.FormGroup}>
                <label>Email</label>
                <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
    
              <div className={style.FormGroup}>
                <label>Contact Number</label>
                <input type="text" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)}/>
              </div>
    
              <div className={`${style.FormGroup} ${style.FullWidth}`}>
                <label>Address</label>
                <textarea placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)}></textarea>
              </div>
            </form>
    
            {/* ACTION BUTTONS */}
            <div className={style.Actions}>
              <button className={style.CancelBtn}>Cancel</button>
              <button className={style.SaveBtn} onClick={handleSave}>Save Changes</button>
            </div>
    
          </div>
    
        </div>
  )
}

export default CEditProfile