import React from 'react'
import style from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <div>
<div className={style.dashcontainer}>
  <div className={style.dash1}>
    <h1>Admin Dashboard</h1>
    <p className={style.subtitle}>
      Manage SmartMed system settings, categories, districts, and medicines
    </p>
  </div>
</div>

    </div>
  )
}

export default Dashboard