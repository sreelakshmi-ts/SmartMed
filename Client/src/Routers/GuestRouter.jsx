import React from 'react'
import { Route,  Routes } from 'react-router'
import Dashboard from '../Guest/Pages/Dashboard/Dashboard'
import Login from '../Guest/Pages/Login/Login'
import Registration from '../Guest/Pages/Registration/Registration'
import EquipmentShop from '../Guest/Pages/EquipmentShopReg/EquipmentShop'

const GuestRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='login' element={<Login/>} />
            <Route path='regs' element={<Registration/>} />
            <Route path='EquipmentShopreg' element={<EquipmentShop/>}/>
        </Routes>
    </div>
  )
}

export default GuestRouter