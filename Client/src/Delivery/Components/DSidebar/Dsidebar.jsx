import { AssignmentTurnedInOutlined, DashboardOutlined, LocalShippingOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import style from './DSidebar.module.css'
import { Link } from 'react-router'

const Dsidebar = () => {
  return (
     <div className={style.sidebar}>
      {/* Brand */}
      <h2 className={style.logo}>Smart<span>Med</span></h2>

      {/* Menu */}
      <nav className={style.menu}>
        <Link to="/delivery" className={style.link}>
          <DashboardOutlined /> Dashboard
        </Link>

        <Link to="/deliveryteam/assigneddeliveries" className={style.link}>
          <LocalShippingOutlined /> Assigned Orders
        </Link>

        <Link to="/deliveryteam/completed" className={style.link}>
          <AssignmentTurnedInOutlined /> Completed Deliveries
        </Link>

        <Link to="/delivery/profile" className={style.link}>
          <PersonOutlineOutlined /> My Profile
        </Link>
      </nav>

      {/* Footer */}
      <div className={style.footer}>

      </div>
    </div>
  )
}

export default Dsidebar