import React from 'react'
import CustNavbar from '../../Components/CNavbar/CustNavbar'
import CustomerRouter from '../../../Routers/CustomerRouter'
import CFooter from '../../Components/CFooter/CFooter'
import style from './CustHome.module.css'


const CustomerHome = () => {
  return (
    <div>
        <div><CustNavbar/></div>
        <main className={style.content}><CustomerRouter/></main>
        <div><CFooter/></div>

    </div>
  )
}

export default CustomerHome