import React from 'react'
import GuestNavbar from '../../Components/Navbar/GuestNavbar'
import GuestRouter from '../../../Routers/GuestRouter'
import GFooter from '../../Components/GFooter/GFooter'
import style from './Homepage.module.css'


const GuestHomepage = () => {
  return (
    <div>
      <div >
        <div><GuestNavbar/></div>
      
         <main className={style.content}>
        <GuestRouter/>
      </main>

        <div><GFooter/></div>
      </div>
    </div>
  )
}

export default GuestHomepage