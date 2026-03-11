import React from 'react'
// import Dashboard from '../Dashboard/Dashboard'
import GuestNavbar from '../../Components/Navbar/GuestNavbar'
import GuestRouter from '../../../Routers/GuestRouter'
import GFooter from '../../Components/GFooter/GFooter'


const GuestHomepage = () => {
  return (
    <div>
      <div >
        <div><GuestNavbar/></div>
      
        <div><GuestRouter/></div>

        <div><GFooter/></div>
      </div>
    </div>
  )
}

export default GuestHomepage