import React, { useState } from 'react'
import style from './INavbar.module.css'
import { Link } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button } from '@mui/material';

const INavbar = () => {
    
  const [open, setOpen] = useState(false);
  const[inmanager,setInmanager]=useState([]);

    const navigate = useNavigate();
       useEffect(() => {
          const mid = sessionStorage.getItem('mid');
          if (!mid) return;
          axios.get(`http://localhost:5000/InvetoryManager/${mid}`)
          
               .then(res => setInmanager(res.data.data)
             
              )
               .catch(console.error);
      }, []);

        const logout = () =>{
    sessionStorage.removeItem('mid')
    navigate('/guest/login')
  }
  return (
    <div>
 <nav className={style.invnavbar}>
      <div className={style.left}>
        <h2 className={style.title}>Inventory Dashboard</h2>
      </div>

      <div className={style.right}>
        <span className={style.welcome}>Welcome, {inmanager.inManagerName} </span>

        <div
          className={style.profile}
          onClick={() => setOpen(!open)}
        >
          <img
            src={`http://localhost:5000${inmanager.inManagerPhoto}`}
            alt="profile"
            className={style.avatar}
          />
          <span className={style.name}>Manager</span>

          {/* Dropdown */}
          {open && (
            <div className={style.dropdown}>
              <Link to='/inventory/imyprofile' className={style.button}>My Profile</Link>
              <Link className={style.button}>Edit Profile</Link>
              {/* <Link className={style.logout}>Logout</Link> */}
              <Button className={style.logout} onClick={logout} >Log Out</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
    </div>
  )
}

export default INavbar