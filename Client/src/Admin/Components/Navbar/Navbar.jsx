import React from 'react'
import style from './Navbar.module.css'

const Navbar = () => {
  return (
    <div>
         <nav className={style.adminnavbar}>
  <div className={style.navleft}>
    <h4 className={style.pagetitle}>Admin Dashboard</h4>
  </div>

  <div className={style.navright}>
    <div className={style.admininfo}>
      <span className={style.adminname}>Admin</span>
      <div className={style.avatar}>A</div>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar