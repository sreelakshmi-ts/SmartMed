import React from 'react'
import { Route, Routes } from 'react-router'
import EquiDashboard from '../EquipmentCustomer/Pages/Dashboard/EquiDashboard'
import ViewEquipments from '../EquipmentCustomer/Pages/ViewEqipments/ViewEquipments'
import EquipmentDetailView from '../EquipmentCustomer/Pages/EquipementDetailView/EquipmentDetailView'
import MyCart from '../EquipmentCustomer/Pages/EquiAddToCart/MyCart'
import EquipmentBooking from '../EquipmentCustomer/Pages/EquipmentBookingConfirm/EquipmentBooking'
import EquipmentPayment from '../EquipmentCustomer/Pages/EquipmentPayment/EquipmentPayment'
import EquipmentMyOrder from '../EquipmentCustomer/Pages/EquipmentMyOrder/EquipmentMyOrder'
import EComplaint from '../EquipmentCustomer/Pages/EComplaint/EComplaint'
import EMyProfile from '../EquipmentCustomer/Pages/EMyProfile/EMyProfile'
import EEditeProfile from '../EquipmentCustomer/Pages/EEditProfile/EEditeProfile'
import EChangePassword from '../EquipmentCustomer/Pages/EChangePassword/EChangePassword'


const EquipmentCustomerRoute = () => {
  return (
    <div>
        <Routes>
            <Route  path='/' element={<EquiDashboard/>} />
            <Route path='/eMyprofile' element={<EMyProfile/>}/>
            <Route path='/eEditeprofile' element={<EEditeProfile/>}/>
            <Route path='/eChangePswd'  element={<EChangePassword/>}/>
            <Route  path='/viewEquipments' element={<ViewEquipments/>} />
            <Route  path='/equipmentDetailView/:id' element={<EquipmentDetailView/>} />
            <Route  path='/myCart' element={<MyCart/>} />
            <Route  path='/equibookingconfirm/:id' element={<EquipmentBooking/>} />
            <Route  path='/equipayment/:id' element={<EquipmentPayment/>} />
            <Route  path='/myorders' element={<EquipmentMyOrder/>} />
            <Route  path='/ecomplaints' element={<EComplaint/>} />
        </Routes>
    </div>
  )
}

export default EquipmentCustomerRoute