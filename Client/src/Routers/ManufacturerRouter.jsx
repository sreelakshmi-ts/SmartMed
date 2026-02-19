import React from 'react'
import { Route, Routes } from 'react-router'
import MDashboard from '../Manufacturer/Pages/MDashboard/MDashboard'
import MMyprofile from '../Manufacturer/Pages/MMyProfile/MMyprofile'


const ManufacturerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/'  element={<MDashboard/>} />
        <Route path='mmyprofile' element={<MMyprofile/>}/>
        
        </Routes></div>
  )
}

export default ManufacturerRouter