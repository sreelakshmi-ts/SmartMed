import React from 'react'
import style from './DHomepage.module.css'
import Dsidebar from '../../Components/DSidebar/Dsidebar'
import DNavbar from '../../Components/DNavbar/DNavbar'
import DeliveryRouter from '../../../Routers/DeliveryRouter'

const DHomepage = () => {
  return (
    <div className={style.dhomediv}>
      <div className={style.dsidbar}><Dsidebar/></div>
      <div className={style.dhomeitem}>
        <div className={style.dnavbar}><DNavbar/></div>
        <div className={style.droute}><DeliveryRouter/></div>
      </div>
      
      
    </div>
  )
}

export default DHomepage