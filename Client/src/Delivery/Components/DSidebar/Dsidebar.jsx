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
          <LocalShippingOutlined /> Assigned Medicine Orders
        </Link>
        <Link to="/deliveryteam/assignedequipmentorders" className={style.link}>
          <LocalShippingOutlined /> Assigned Equipment Orders
        </Link>


        <Link to="/deliveryteam/completedMedicineDelivery" className={style.link}>
          <AssignmentTurnedInOutlined /> Completed Medicine Deliveries
        </Link>
        <Link to="/deliveryteam/completedEquipmentDelivery" className={style.link}>
          <AssignmentTurnedInOutlined /> Completed Equipment Deliveries
        </Link>

        <Link to="/deliveryteam/dmyprofile" className={style.link}>
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