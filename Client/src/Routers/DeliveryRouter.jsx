import React from 'react'
import { Route, Routes } from 'react-router'
import DDashboard from '../Delivery/Pages/DDashboard/DDashboard'
import DMyProfile from '../Delivery/Pages/DMyProfile/DMyProfile'
import AssignedDelivery from '../Delivery/Pages/AssignedDelivery/AssignedDelivery'
import AssignedEquipmentOrders from '../Delivery/Pages/AssignedEquipmentOrders/AssignedEquipmentOrders'
import CompletedMedicineDelivery from '../Delivery/Pages/CompletedMedicineDelivery/CompletedMedicineDelivery'
import CompletedEquipmentDelivery from '../Delivery/Pages/CompletedEquipmentDelivery/CompletedEquipmentDelivery'

const DeliveryRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<DDashboard/>} />
            <Route path='dmyprofile' element={<DMyProfile/>}/>
            <Route path='assigneddeliveries' element={<AssignedDelivery/>}/>
            <Route path='assignedequipmentorders' element={<AssignedEquipmentOrders/>}/>
            <Route path='completedMedicineDelivery' element={<CompletedMedicineDelivery/>}/>
            <Route path='completedEquipmentDelivery' element={<CompletedEquipmentDelivery/>}/>
            
        </Routes>
    </div>
  )
}

export default DeliveryRouter