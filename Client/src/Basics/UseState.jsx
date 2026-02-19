import React, { useState } from 'react'

const UseState = () => {
    // const[colour,setColour]=useState('red')
    // const change = () => {
    //     setColour('yellow')
    // }
    const[name,setName]=useState('')
  return (
    <div>
<input type="text" onChange={(e)=>{setName(e.target.value)}} />
{/* <button onClick={()=>{setColour('greenx')}}>Change colour</button> */}
<div>{name}</div>
    </div>
  )
}

export default UseState