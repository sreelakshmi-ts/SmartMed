import React from 'react'
import sty from './CustNavbar.module.css'
import { Link } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const CustNavbar = () => {
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
    sessionStorage.removeItem('cid');
    navigate('/guest/login')
  }
  return (
    <div>
      <nav className={sty.custnavbar}>
  <div className={sty.logo}>
    <span className={sty.brand}>Smart</span>Med
    <small className={sty.tagline}>Pharmacy & Stockist Portal</small>
  </div>

  <ul className={sty.navlinks}>
    <Link className={sty.li} to='#'>Home</Link>
    <Link className={sty.li} to='/customer/cproducts'>Products</Link>
    {/* <Link className={sty.li} to='/customer/cproductsView'>Products</Link> */}
    <Link className={sty.li} to='#'>Suppliers</Link>
    <Link className={sty.li} to='#'>Orders</Link>
    <Link className={sty.li} to='/customer/ccomplaints'>Support</Link>
  </ul>

  {/* Profile Section */}
  <div className={sty.profileWrapper}>
    <div className={sty.profileBtn}>
            <div className={sty.avatar}>{avatar}</div>
            <span className={sty.username}>{username}</span>
    </div>

    <div className={sty.profileMenu}>
      <Link to='/customer/cmyprofile'>My Profile</Link>
      <Link to='/customer/cchangepwsd'>Change Password</Link>
      <Link to='/customer/cmycart'>My Cart</Link>
      <Link to='/customer/myorders'>My Orders</Link>
      
      <hr />
      {/* <Link to="/guest/login" className={sty.logout}>Logout</Link> */}
      <Button  className={sty.logout} onClick={logout} >Logout</Button>
    </div>
  </div>

</nav>
    </div>
  )
}

export default CustNavbar
