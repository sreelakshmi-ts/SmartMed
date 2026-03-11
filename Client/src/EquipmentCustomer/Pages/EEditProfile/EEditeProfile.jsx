import React from 'react'
import style from './EEditeProfile.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const EEditeProfile = () => {
    const ecid=sessionStorage.getItem('ecid');
    const [ownername,setOwnerName]=useState('');
    const[email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[address,setAddress]=useState('');
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/EquipmentCustomer/${ecid}`).then(res => {
            const ec = res.data.data;
            setOwnerName(ec.ownerName);
            setEmail(ec.customerEmail);
            setPhone(ec.customerContact);
            setAddress(ec.customerAddress);
           
        });
    }, [ecid]);

    const handleSave=(e) =>{
        e.preventDefault(); 
        const data={
            ownerName:ownername,
            customerEmail:email,
            customerContact:phone,
            customerAddress:address,
        }
        axios.put(`http://localhost:5000/EquipmentCustomer/${ecid}`,data)
            .then(() => alert('Profile updated'))
            .catch(() => alert('Update failed'));
        
            navigate('/equipmentCustomer/eMyprofile')
        
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

export default EEditeProfile