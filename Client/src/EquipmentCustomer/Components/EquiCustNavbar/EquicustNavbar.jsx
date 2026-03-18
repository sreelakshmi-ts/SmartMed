import React from 'react'
import { Link } from 'react-router';
import sty from './EquicustNavbar.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

const EquicustNavbar = () => {
   const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = sessionStorage.getItem('customerStoreName');
    if (name) {
      setUsername(name);
      setAvatar(name.charAt(0).toUpperCase()); // first letter
    }
  }, []);
      const logout = () =>{
    sessionStorage.removeItem('ecid');
    navigate('/guest/login')
  }
  return (
     <div>
      <nav className={sty.custnavbar}>
  <div className={sty.logo}>
    <span className={sty.brand}>Smart</span>Med
    <small className={sty.tagline}>Medical Equipment Portal</small>
  </div>

  <ul className={sty.navlinks}>
    <Link className={sty.li} to='/equipmentCustomer'>Home</Link>
    <Link className={sty.li} to='/equipmentCustomer/viewEquipments'>Products</Link>
    <Link className={sty.li} to='/equipmentCustomer/myorders'>Orders</Link>
    <Link className={sty.li} to='/equipmentCustomer/ecomplaints'>Support</Link>
  </ul>

  {/* Profile Section */}
  <div className={sty.profileWrapper}>
    <div className={sty.profileBtn}>
            <div className={sty.avatar}>{avatar}</div>
            <span className={sty.username}>{username}</span>
    </div>

    <div className={sty.profileMenu}>
      <Link to='/equipmentCustomer/eMyprofile'>My Profile</Link>
      <Link to='/equipmentCustomer/eChangePswd'>Change Passsword</Link>
      <Link to='/equipmentCustomer/myCart'>My Cart</Link>
      <Link to='/equipmentCustomer/myorders'>My Orders</Link>
      <hr />
       <Button  className={sty.logout} onClick={logout} >Logout</Button>
    </div>
  </div>

</nav>
    </div>
  )
}

export default EquicustNavbar