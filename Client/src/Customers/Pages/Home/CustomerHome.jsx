import React from 'react'
import CustNavbar from '../../Components/CNavbar/CustNavbar'
import CustomerRouter from '../../../Routers/CustomerRouter'

const CustomerHome = () => {
  return (
    <div>
        <div><CustNavbar/></div>
        <div><CustomerRouter/></div>
    </div>
  )
}

export default CustomerHome