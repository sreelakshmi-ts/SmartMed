import React from 'react'
import { Route, Routes } from 'react-router'
import RMyProfile from '../Representative/Pages/RMyProfile/RMyProfile'
import CustOrders from '../Representative/Pages/CustOrders/CustOrders'

const RepRouter = () => {
  return (
    <div>
        <Routes>
          <Route path='repmyprofile' element={<RMyProfile/>}/>
          <Route path='customerorders' element={<CustOrders/>}/>
        </Routes>
    </div>
  )
}

export default RepRouter