import React from 'react'
import { Route, Routes } from 'react-router'
import Homepages from '../Admin/Pages/Home/Homepages'
// import UseState from '../Basics/UseState'
import BasicsRouter from './BasicsRouter'
import GuestHomepage from '../Guest/Pages/Home/GuestHomepage'
import CustomerHome from '../Customers/Pages/Home/CustomerHome'
import IMHomepage from '../InventoryManager/Pages/Home/IMHomepage'
import RHomepage from '../Representative/Pages/Home/RHomepage'
import MHomepage from '../Manufacturer/Pages/MHome/MHomepage'
import DHomepage from '../Delivery/Pages/DHome/DHomepage'
import EquiCustHome from '../EquipmentCustomer/Pages/Home/EquiCustHome'

const MainRouter = () => {
  return (
    <div>
        <Routes>
           <Route path='admin/*' element={<Homepages/>} />
           <Route path='basics/*' element={<BasicsRouter/>}/>
           <Route path='guest/*' element={<GuestHomepage/>} />
           <Route path='customer/*' element={<CustomerHome/>}/>
           <Route path='inventory/*' element={<IMHomepage/>}/>
           <Route path='reps/*' element={<RHomepage/>} />
           <Route path='manufactures/*' element={<MHomepage/>} />
           <Route path='deliveryteam/*' element={<DHomepage/>}/>
           <Route path='equipmentCustomer/*' element={<EquiCustHome/>}/>
        </Routes>
        </div>
  )
}

export default MainRouter