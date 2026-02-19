import React from 'react'
import INavbar from '../../Components/INavbar/INavbar'
import ISidebar from '../../Components/ISidebar/Isidebar'
import InventoryRouter from '../../../Routers/InventoryRouter'
import style from './IMHomepage.module.css'

const IMHomepage = () => {
  return (
    <div className={style.ihomemain}>

        <div className={style.ISidebar}><ISidebar/></div>
        <div className={style.homeitem}>
            <div className={style.inavbar}><INavbar/></div>
            <div className={style.inroter}><InventoryRouter/></div>
        </div>

    </div>
  )
}

export default IMHomepage