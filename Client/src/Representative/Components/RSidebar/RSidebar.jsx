import React, { use } from 'react'
import style from './RSidebar.module.css'
import { Link } from 'react-router'
import { useState } from 'react'


const RSidebar = () => {

  return (
    <div className={style.sidecontainer}>
      <h3 className={style.brand}>SmartMed</h3>
      <p className={style.role}>Representative</p>

      <nav className={style.sidemenu}>
        <Link className={style.item} to="/rep/dashboard">
          Dashboard
        </Link>

        <Link className={style.item} to="/reps/customerorders">
          Orders
        </Link>

        <Link className={style.item} to="/rep/inventory">
          Inventory
        </Link>

        <Link className={style.item} to="/rep/customers">
          Customers
        </Link>

        <Link className={style.item} to="/reps/allmedicinesList">
          Medicine List
        </Link>

        <Link className={style.item} to="/reps/repmyprofile">
          Profile
        </Link>
        
      </nav>
    </div>
  )
}

export default RSidebar