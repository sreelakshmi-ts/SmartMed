import React from 'react'
import { Route, Routes } from 'react-router'
import EquiDashboard from '../EquipmentCustomer/Pages/Dashboard/EquiDashboard'
import ViewEquipments from '../EquipmentCustomer/Pages/ViewEqipments/ViewEquipments'
import EquipmentDetailView from '../EquipmentCustomer/Pages/EquipementDetailView/EquipmentDetailView'

const EquipmentCustomerRoute = () => {
  return (
    <div>
        <Routes>
            <Route  path='/' element={<EquiDashboard/>} />
            <Route  path='/viewEquipments' element={<ViewEquipments/>} />
            <Route  path='/equipmentDetailView/:id' element={<EquipmentDetailView/>} />
        </Routes>
    </div>
  )
}

export default EquipmentCustomerRoute