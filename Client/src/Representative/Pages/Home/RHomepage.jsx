import React from 'react'
import RNavbar from '../../Components/RNavbar/RNavbar'
import RepRouter from '../../../Routers/RepRouter'
import RSidebar from '../../Components/RSidebar/RSidebar'
import style from './RHomepage.module.css'

const RHomepage = () => {
  return (
    <div className={style.mainRhome}>
        <div className={style.rsidebar}><RSidebar/></div>
        <div className={style.Rhomeitem}>
            <div className={style.rnavbar}><RNavbar/></div>
            <div className={style.rrouter}><RepRouter/></div>
        </div>
    </div>
  )
}

export default RHomepage