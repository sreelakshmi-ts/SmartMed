import React from 'react'
import CustNavbar from '../../Components/CNavbar/CustNavbar'
import CustomerRouter from '../../../Routers/CustomerRouter'
import CFooter from '../../Components/CFooter/CFooter'


const CustomerHome = () => {
  return (
    <div>
        <div><CustNavbar/></div>
        <div><CustomerRouter/></div>
        <div><CFooter/></div>

    </div>
  )
}

export default CustomerHome