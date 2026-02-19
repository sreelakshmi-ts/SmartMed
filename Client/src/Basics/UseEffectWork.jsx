import React, { useEffect, useState } from 'react'

const UseEffectWork = () => {
  const [name,setName]=useState('')

    useEffect(()=>{
      setName(
     prompt("Name:"))
      

    })
  return (
    <div>
        <h1>Hello {name} </h1>
    </div>
  )
}

export default UseEffectWork