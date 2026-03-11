import React from 'react'
import EquicustNavbar from '../../Components/EquiCustNavbar/EquicustNavbar'
import EquipmentCustomerRoute from '../../../Routers/EquipmentCustomerRoute'
import EFooter from '../../Components/EFooter/EFooter'

const EquiCustHome = () => {
  return (
    <div>
        <div><EquicustNavbar/></div>
        <div><EquipmentCustomerRoute/></div>
        <div><EFooter/> </div>
    </div>
  )
}

export default EquiCustHome