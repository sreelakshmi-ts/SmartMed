import React from 'react'
import { Link } from 'react-router';
import sty from './EquicustNavbar.module.css'

const EquicustNavbar = () => {
  return (
     <div>
      <nav className={sty.custnavbar}>
  <div className={sty.logo}>
    <span className={sty.brand}>Smart</span>Med
    <small className={sty.tagline}>Pharmacy & Stockist Portal</small>
  </div>

  <ul className={sty.navlinks}>
    <Link className={sty.li} to='#'>Home</Link>
    <Link className={sty.li} to='/equipmentCustomer/viewEquipments'>Products</Link>
    <Link className={sty.li} to='#'>Suppliers</Link>
    <Link className={sty.li} to='#'>Orders</Link>
    <Link className={sty.li} to='/equipmentCustomer/ecomplaints'>Support</Link>
  </ul>

  {/* Profile Section */}
  <div className={sty.profileWrapper}>
    <div className={sty.profileBtn}>
      <div className={sty.avatar}>S</div>
      <span className={sty.username}>My Account</span>
    </div>

    <div className={sty.profileMenu}>
      <Link to='/equipmentCustomer/eMyprofile'>My Profile</Link>
      <Link to='/equipmentCustomer/eChangePswd'>Change Passsword</Link>
      <Link to='/equipmentCustomer/myCart'>My Cart</Link>
      <Link to='/equipmentCustomer/myorders'>My Orders</Link>
      <hr />
      <Link to="/guest/login" className={sty.logout}>Logout</Link>
    </div>
  </div>

</nav>
    </div>
  )
}

export default EquicustNavbar