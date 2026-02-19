import React from 'react'
import EquicustNavbar from '../../Components/EquiCustNavbar/EquicustNavbar'
import EquipmentCustomerRoute from '../../../Routers/EquipmentCustomerRoute'

const EquiCustHome = () => {
  return (
    <div>
        <div><EquicustNavbar/></div>
        <div><EquipmentCustomerRoute/></div>
    </div>
  )
}

export default EquiCustHome