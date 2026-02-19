import React from 'react'
// import Dashboard from '../Dashboard/Dashboard'
import GuestNavbar from '../../Components/Navbar/GuestNavbar'
import GuestRouter from '../../../Routers/GuestRouter'


const GuestHomepage = () => {
  return (
    <div>
      <div >
        <div><GuestNavbar/></div>
      
        <div><GuestRouter/></div>
      </div>
    </div>
  )
}

export default GuestHomepage