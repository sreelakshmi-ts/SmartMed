import React from 'react'
import { useState } from 'react'
import style from './UsestateWork.module.css'

const UseStateWork = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
  return (
    <div className={style.mainuse}>
        <div className={style.useinput}>
            <form>
            <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="txtname" id="name" onChange={(n)=>{setName(n.target.value)}}/>
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="txtemail" id="mail" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="txtpass" id="pwd" onChange={(p)=>{setPassword(p.target.value)}} />
            </div>
            </form>

        </div>
        <div className={style.display}>
            <div>
            Name:{name}
            </div>
            <div>
            Email:{email}
            </div>
            <div>
            Password:{password}
            </div>
        </div>
    </div>
  )
}

export default UseStateWork