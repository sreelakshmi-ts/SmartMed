import React from 'react'
import style from './RSidebar.module.css'
import { Link } from 'react-router'

// MUI ICONS
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupsIcon from '@mui/icons-material/Groups';
import MedicationIcon from '@mui/icons-material/Medication';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const RSidebar = () => {

  return (
    <div className={style.sidecontainer}>

      {/* HEADER */}
      <div className={style.header}>
        <h2 className={style.brand}>
          Smart<span>Med</span>
        </h2>
        <p className={style.role}>Representative Panel</p>
      </div>

      {/* MENU */}
      <nav className={style.sidemenu}>

        <Link className={style.item} to="/reps">
          <DashboardIcon className={style.icon}/>
          Dashboard
        </Link>

        <Link className={style.item} to="/reps/customerorders">
          <ShoppingCartIcon className={style.icon}/>
          Orders
        </Link>

        <Link className={style.item} to="/rep/inventory">
          <Inventory2Icon className={style.icon}/>
          Inventory
        </Link>


        <Link className={style.item} to="/reps/allmedicinesList">
          <MedicationIcon className={style.icon}/>
          Medicine List
        </Link>

        <Link className={style.item} to="/reps/repmyprofile">
          <AccountCircleIcon className={style.icon}/>
          Profile
        </Link>

      </nav>

    </div>
  )
}

export default RSidebar