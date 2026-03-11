import React from 'react'
import sty from './CustNavbar.module.css'
import { Link } from 'react-router'

const CustNavbar = () => {
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
      <div className={sty.avatar}>S</div>
      <span className={sty.username}>My Account</span>
    </div>

    <div className={sty.profileMenu}>
      <Link to='/customer/cmyprofile'>My Profile</Link>
      <Link to='/customer/cmycart'>My Cart</Link>
      <Link to='/customer/myorders'>My Orders</Link>
      <hr />
      <Link to="/guest/login" className={sty.logout}>Logout</Link>
    </div>
  </div>

</nav>
    </div>
  )
}

export default CustNavbar
