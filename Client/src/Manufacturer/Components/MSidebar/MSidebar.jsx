import { AccountCircleOutlined, AssignmentOutlined, DashboardOutlined, Inventory2Outlined, LocalShippingOutlined } from '@mui/icons-material'
import React from 'react'
import style from './MSidebar.module.css'
import { Link } from 'react-router'

const MSidebar = () => {
  return (
    <div><aside className={style.msidebar}>
      {/* Brand */}
      <div className={style.brand}>
        <h2>SmartMed</h2>
        <span>Manufacturer</span>
      </div>

      {/* Menu */}
      <ul className={style.menu}>
        <li>
          <Link to="/manufacturer/dashboard">
            <DashboardOutlined />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/manufacturer/products">
            <Inventory2Outlined />
            Products
          </Link>
        </li>

        <li>
          <Link to="/manufacturer/supply">
            <LocalShippingOutlined />
            Supply Requests
          </Link>
        </li>

        <li>
          <Link to="/manufacturer/orders">
            <AssignmentOutlined />
            Orders
          </Link>
        </li>

        <li>
          <Link to="/manufacturer/profile">
            <AccountCircleOutlined />
            My Profile
          </Link>
        </li>
      </ul>
    </aside></div>
  )
}

export default MSidebar