import React from 'react'
import { Route, Routes } from 'react-router'
import UseState from '../Basics/UseState'
import UseStateWork from '../Basics/UseStateWork'
import UseEffect from '../Basics/UseEffect'
import UseEffectWork from '../Basics/UseEffectWork'

const BasicsRouter = () => {
    
  return (
    <div>
        <Routes>
            <Route path='usestate' element={<UseState/>} />
            <Route path='usestatework' element={<UseStateWork/>}  />
            <Route path='useeffect' element={<UseEffect/>} />
            <Route path='useeffectwork' element={<UseEffectWork/>}/>
        </Routes>
    </div>
  )
}

export default BasicsRouter