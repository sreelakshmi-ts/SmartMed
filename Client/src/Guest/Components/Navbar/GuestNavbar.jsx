import React from 'react'
import sty from './Nav.module.css'
import { Link } from 'react-router'

const GuestNavbar = () => {
  return (
    <div>
      <nav className={sty.guestnavbar}>
  <div className={sty.logo}>
   <span className={sty.brand}>Smart</span>Med
  </div>

  <ul className={sty.navlinks}>
    <li>Home</li>
    <li>About</li>
    <li>Services</li>
    <li>Contact</li>
  </ul>

 <div className={sty.authbuttons}>
  <Link className={sty.loginbtn} to="/guest/login">Login</Link>

  <div className={sty.signupWrapper}>
    <span className={sty.signupbtn}>Sign Up ▾</span>

    <div className={sty.signupMenu}>
      <Link to="/guest/regs">Medicine Customer</Link>
      <Link to="/guest/EquipmentShopreg">Equipment Customer</Link>
      <Link to="/guest/manufacturer-reg">Manufacturer</Link>
    </div>
  </div>
</div>

</nav>

    </div>
  )
}

export default GuestNavbar