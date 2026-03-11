import React from 'react'
import { Route, Routes } from 'react-router'
import CustDashboard from '../Customers/Pages/CDashboard/CustDashboard'
import Product from '../Customers/Pages/CProducts/Product'
import CMyprofile from '../Customers/Pages/CMyprofile/CMyprofile'
import CComplaints from '../Customers/Pages/CComplaints/CComplaints'
import MedicineView from '../Customers/Pages/MedicineView/MedicineView'
import MyCart from '../Customers/Pages/MyCart/MyCart'
import BookingConfirm from '../Customers/Pages/BookingConfirm/BookingConfirm'
import Payment from '../Customers/Pages/Payment/Payment'
import MyOrder from '../Customers/Pages/MyOrder/MyOrder'
import CEditProfile from '../Customers/Pages/CEditProfile/CEditProfile'


const CustomerRouter = () => {
  return (
    <div>
        <Routes>
          <Route path='home' element={<CustDashboard/>} />
          <Route path='cproducts' element={<Product/>}  />
          <Route path='cproductsView/:id' element={<MedicineView/>}  />
          <Route path='cmyprofile' element={<CMyprofile/>}/>
          <Route path='cEditprofile' element={<CEditProfile/>}/>
          <Route path='ccomplaints' element={<CComplaints/>} />
          <Route path='cmycart' element={<MyCart/>} />
          <Route path='bookingconfirm/:id' element={<BookingConfirm/>} />
          <Route path='payment/:id' element={<Payment/>} />
          <Route path='myorders' element={<MyOrder/>} />



        </Routes>
    </div>
  )
}

export default CustomerRouter