import React from 'react'
import { Route,  Routes } from 'react-router'
import Dashboard from '../Guest/Pages/Dashboard/Dashboard'
import Login from '../Guest/Pages/Login/Login'
import Registration from '../Guest/Pages/Registration/Registration'
import EquipmentShop from '../Guest/Pages/EquipmentShopReg/EquipmentShop'
import About from '../Guest/Pages/AboutPage/About'
import Services from '../Guest/Pages/ServicesPage/Service'

const GuestRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='login' element={<Login/>} />
            <Route path='regs' element={<Registration/>} />
            <Route path='about' element={<About/>}/>
            <Route path='services' element={<Services/>}/>
            <Route path='EquipmentShopreg' element={<EquipmentShop/>}/>
        </Routes>
    </div>
  )
}

export default GuestRouter