import React from 'react'
import style from './Home.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import AdminRouter from '../../../Routers/AdminRouter'

const Homepages = () => {
  return (
    <div className={style.homemain}>
       <div className={style.sidebar}><Sidebar/></div>
        <div>
             <div  className={style.navbar}> <Navbar/> </div>
            <div ><AdminRouter/></div>
        </div>
    </div>
  )
}

export default Homepages