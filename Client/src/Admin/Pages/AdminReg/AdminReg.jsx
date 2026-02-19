import React, { useState } from 'react'
import styles from './Admin.module.css'
import axios from 'axios';

const AdminReg = () => {
    const[aName,setAname]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const handelSubmit =(e) =>{
        e.preventDefault(); 
                const data={
           adminName: aName,
            adminEmail:email,
            adminPassword:password,

        }
        axios.post('http://localhost:5000/Admin',data).then((res) => {
            setAname("");
            setEmail("");
            setPassword("");
            alert(res.data.message)
            console.log(res.data.message);
        });
        

    }
    
  return (
    <div className={styles.page}>
      <form className={styles.form} >
        <h1>Admin Registration</h1>
        <p className={styles.subtitle}>Create admin account</p>

        <div className={styles.field}>
          <label>Admin Name</label>
          <input
            type="text"
            name="adminName"
            placeholder="Enter admin name"
            value={aName}
            onChange={(e)=>setAname(e.target.value)}
            required
           
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="adminEmail"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
         
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            name="adminPassword"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
           
          />
        </div>

        <input type="submit" value="Register Admin" className={styles.button} onClick={handelSubmit} />
      </form>
    </div>
  )
}

export default AdminReg