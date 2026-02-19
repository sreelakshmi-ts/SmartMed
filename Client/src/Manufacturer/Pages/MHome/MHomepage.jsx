import React from 'react'
import style from './MHomepage.module.css'
import MSidebar from '../../Components/MSidebar/MSidebar'
import MNavbar from '../../Components/MNavbar/MNavbar'
import ManufacturerRouter from '../../../Routers/ManufacturerRouter'

const MHomepage = () => {
  return (
    <div className={style.mhomemain}>
      <div className={style.msidbardiv}><MSidebar/></div>
      <div className={style.homeitem}>
        <div className={style.mnavbardiv}><MNavbar/></div>
        <div className={style.mrouter}><ManufacturerRouter/></div>
      </div>
    </div>
  )
}

export default MHomepage