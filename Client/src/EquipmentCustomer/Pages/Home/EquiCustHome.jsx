import React from 'react'
import EquicustNavbar from '../../Components/EquiCustNavbar/EquicustNavbar'
import EquipmentCustomerRoute from '../../../Routers/EquipmentCustomerRoute'
import EFooter from '../../Components/EFooter/EFooter'
import style from './EquiCustHome.module.css'

const EquiCustHome = () => {
  return (
    <div>
        <div><EquicustNavbar/></div>
         <main className={style.content}><EquipmentCustomerRoute/></main>
        
        <div><EFooter/> </div>
    </div>
  )
}

export default EquiCustHome